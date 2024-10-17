const express = require("express");

const router = express.Router();

const {
  postSignup,
  postLogin,
  postCheckAuth,
} = require("../controllers/User.js");
router
  .post("/signup", postSignup)
  .post("/login", postLogin)
  .post("/check", postCheckAuth);

module.exports = router;
