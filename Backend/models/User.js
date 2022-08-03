const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    caregiverName: {
      type: String,
      required: true,
    },
    caregiverInterest: {
      type: String,
      required: true,
    },
    elderlyLang: {
      type: String,
      required: true,
    },
    elderlyInterest: {
      type: String,
    },
    elderlyAge: {
      type: String,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
