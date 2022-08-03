const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      // required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { collection: "activity" }
);

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
