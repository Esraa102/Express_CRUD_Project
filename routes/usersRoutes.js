const express = require("express");
const router = express.Router();
const {
  logInUser,
  registerUser,
  currentUser,
} = require("../controllers/usersControllers");
const validateToken = require("../middleware/validateTokenHanlder");

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
