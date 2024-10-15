const express = require("express");

const router = express.Router();

const { postSignup, postLogin } = require("../controllers/User.js");
router.post("/signup", postSignup).post("/login", postLogin);

module.exports = router;
