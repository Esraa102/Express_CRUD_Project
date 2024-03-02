const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Your Username"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: [true, "Email Address Is Already Taken"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
