const Async = require("../utils/Async");
const { verify } = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports.getUsers = Async(async (req, res, next) => {
  const users = await User.find();
  res.json({
    message: "",
    statusCode: 200,
    status: "success",
    users,
  });
});

module.exports.postBread = Async(async (req, res, next) => {
  console.log(req.body);
});

module.exports.checkAdministration = Async((req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const tokenPayload = verify(token, process.env.HASH);
  if (tokenPayload && tokenPayload.role === "Admin") {
    req.user = tokenPayload;
    next();
  } else
    return res.json({
      message: "Access denied!",
      status: "fail",
      statusCode: 401,
    });
});
