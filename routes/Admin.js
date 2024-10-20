const express = require("express");

const router = express.Router();

const {
  getUsers,
  checkAdministration,
  postBread,
  getBread,
} = require("../controllers/Admin.js");

router.get("/users", [checkAdministration, getUsers]);
router
  .post("/bread", [checkAdministration, postBread])
  .get("/bread", [checkAdministration, getBread]);

module.exports = router;
