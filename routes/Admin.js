const express = require("express");

const router = express.Router();

const {
  getUsers,
  checkAdministration,
  postBread,
} = require("../controllers/Admin.js");

router.get("/users", [checkAdministration, getUsers]);
router.post("/bread", [checkAdministration, postBread]);

module.exports = router;
