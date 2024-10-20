const Async = require("../utils/Async");
const { verify } = require("jsonwebtoken");
const User = require("../models/User.js");
const Bread = require("../models/Bread.js");

module.exports.getUsers = Async(async (req, res, next) => {
  const users = await User.find().select(
    "_id username email role balance createdAt"
  );
  res.json({
    message: "",
    statusCode: 200,
    status: "success",
    users,
  });
});

module.exports.postBread = Async(async (req, res, next) => {
  const { date, qty, type, total } = req.body;

  const newBread = new Bread({ qty, date, type, total });
  await newBread.save();

  const usersList = await User.find();
  const pricePerUser = total / usersList.length;

  usersList.map(async (user) => {
    user.negativeToday = pricePerUser;
    user.balance -= pricePerUser;
    user.negativeTotal += pricePerUser;
    await user.save();
  });

  res.status(201).json({
    status: "success",
    bread: newBread,
  });
});

module.exports.getBread = Async(async (req, res, next) => {
  const breads = await Bread.find();
  res.status(201).json({
    status: "success",
    breads,
  });
});

module.exports.checkAdministration = Async((req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = verify(token, process.env.HASH);
  if (tokenPayload && tokenPayload.role === "Admin") {
    req.user = tokenPayload;
    next();
  } else
    return res.status(400).json({
      message: "شما به اینجا دسترسی ندارید!",
      status: "fail",
      statusCode: 401,
    });
});
