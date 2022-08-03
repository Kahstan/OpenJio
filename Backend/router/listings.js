require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

const selectParams =
  "title image petName species breed sex size age medical isArchive favouritesCount ownerContactName ownerContactEmail ownerContactPhone ownerContactAddress profileContact dateCreated"; // currently set to all params

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/src/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

// CREATE EVENT
router.put("/create", upload.single("image"), auth, async (req, res) => {
  try {
    const createdListing = await Listing.create({
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      tags: req.body.tags,
      language: req.body.language,
    });

    console.log("created activity:  ", createdListing);
    res.json({ status: "ok", message: "listing created" });
  } catch (error) {
    console.log("PUT /create", error); // on server
    res.status(400).json({
      status: "error",
      message: "failed: listing could not be created",
    }); // sent to client
  }
});

// DISPLAY ALL ACTIVITIES
router.get("/displayAll", async (req, res) => {
  try {
    const allListings = await Listing.find(); // this filters what information we want to send to the front-end (sensitive) **
    res.json(allListings);
  } catch (error) {
    console.log(`GET /displayAll ${error}`);
    res
      .status(400)
      .json({ status: "error", message: "failed: cannot display listings" });
  }
});

// DISPLAY 1 LISTING via ID --> back-end
// router.post("/listing", async (req, res) => {
//   try {
//     const searchListing = await Listing.find(
//       { _id: req.body.id }.select(selectParams)
//     ); // come back to set up more search params
//     res.json(searchListing);
//   } catch (error) {
//     console.log(`POST /listing ${error}`);
//     res
//       .status(400)
//       .json({ status: "error", message: "failed: no such listing found" });
//   }
// });

/////////////////////////////////////////////////////
// SEARCH BAR : generic search filters --> front end        [[ NOT DONE ]]
/////////////////////////////////////////////////////

// UPDATE ACTIVITY
router.patch("/edit", auth, async (req, res) => {
  // update ANY listing as admin
  const anyListingData = await Listing.findOne({ _id: req.body.id });
  const newListingData = await Listing.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        name: req.body.name || anyListingData.name,
        location: req.body.location || anyListingData.location,
        date: req.body.date || anyListingData.date,
        time: req.body.time || anyListingData.time,
        tags: req.body.tags || anyListingData.tags,
        language: req.body.language || anyListingData.language,
      },
    },
    { new: true }
  );
  res.json(newListingData);

  // update own post as user
  // if (req.decoded.role === "user") {
  //   const ownListingData = await Listing.findOne({ _id: req.body.id });
  //   if (req.decoded.id === ownListingData.profileContact.id) {
  //     const newListingData = await Listing.findOneAndUpdate(
  //       { _id: req.body.id },
  //       {
  //         $set: {
  //           title: req.body.title || ownListingData.title, // req.body.newtitle
  //           image: req.body.image || ownListingData.image,
  //           petName: req.body.petName || ownListingData.petName,
  //           species: req.body.species || ownListingData.species,
  //           breed: req.body.breed || ownListingData.breed,
  //           sex: req.body.sex || ownListingData.sex,
  //           size: req.body.size || ownListingData.size,
  //           age: req.body.age || ownListingData.age,
  //           medical: req.body.medical || ownListingData.medical,
  //           isArchive: req.body.isArchive || ownListingData.isArchive,
  //           favouritesCount:
  //             req.body.favouritesCount || ownListingData.favouritesCount,
  //           ownerContactName:
  //             req.body.ownerContactName || ownListingData.ownerContactName,
  //           ownerContactEmail:
  //             req.body.ownerContactEmail || ownListingData.ownerContactEmail,
  //           ownerContactPhone:
  //             req.body.ownerContactPhone || ownListingData.ownerContactPhone,
  //           ownerContactAddress:
  //             req.body.ownerContactAddress ||
  //             ownListingData.ownerContactAddress,
  //           comments: req.body.comments || ownListingData.comments,
  //         },
  //       },
  //       { new: true }
  //     );
  //     res.json(newListingData);
  //   }
  // }
});

// // UPDATE LISTING FAVOURITE COUNT
// router.patch("/favourite", async (req, res) => {
//   // both admin and users can update listing favourite count
//   const newListingData = await Listing.findOneAndUpdate(
//     { _id: req.body.id },
//     { $inc: { favouritesCount: +1 } },
//     { new: true }
//   );
//   res.json(newListingData);
// });

// // UPDATE LISTING ARCHIVE STATE
// router.patch("/archive", async (req, res) => {
//   const newListingArchive = await Listing.findOneAndUpdate(
//     { _id: req.body.id },
//     { isArchive: req.body.isArchive },
//     { new: true }
//   );
//   res.json(newListingArchive);
// });

// DELETE LISTING
router.delete("/delete", auth, async (req, res) => {
  const deleteListing = await Listing.deleteOne({ _id: req.body.id });
  res.json(deleteListing);

  if (req.decoded.role === "user") {
    const ownListingData = await Listing.findOne({ _id: req.body.id });
    if (req.decoded.id === ownListingData.profileContact.id) {
      const deleteListing = await Listing.deleteOne({ _id: req.body.id });
      res.json(deleteListing);
    }
  }
});

// SEED DATA
router.get("/seed", async (req, res) => {
  //to make sure that the data you are seeding is the right data, you can remove the rest first
  await Listing.deleteMany();

  await Listing.create(
    {
      name: "Mahjong",
      location: "Blk 321 Bedok South Rd",
      date: "9 Aug 2022",
      time: "3pm to 5pm",
      tags: "mahjong",
      language: "Cantonese",
    },
    {
      name: "Karaoke",
      location: "Blk 123 New Upper Changi Rd",
      date: "10 Aug 2022",
      time: "2pm to 5pm",
      tags: "karaoke",
      language: "Mandarin",
    },
    {
      name: "Card games",
      location: "Blk 993 Sengkang East Rd",
      date: "11 Aug 2022",
      time: "3pm to 6pm",
      tags: "card_games",
      language: "English",
    },
    (err, data) => {
      if (err) {
        console.log("GET /seed error:" + err.message);
        res.status(400).json({ status: "error", message: "seeding error" });
      } else {
        res.json({ status: "ok", message: "seeding successful" });
      }
    }
  );
});

module.exports = router;
