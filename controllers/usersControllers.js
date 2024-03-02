const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc register user
//@route POST api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User Already Exist");
    }
    // Hash User Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).send({ _id: newUser._id, email: newUser.email });
    } else {
      res.status(400);
      throw new Error("User Data Is Invalid");
    }
  } else {
    res.status(400);
    throw new Error("Please Enter Valid Inputs");
  }
});

//@desc log in user
//@route POST api/users/login
//@access public
const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (user) {
      //Compare user password with hashedPassowrd;
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).send({ accessToken });
      } else {
        res.status(400);
        throw new Error("Incorrect Password");
      }
    } else {
      res.status(401);
      throw new Error("User Is Unauthorized");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email Or Password");
  }
});

//@desc get user info
//@route GET api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = {
  logInUser,
  registerUser,
  currentUser,
};
