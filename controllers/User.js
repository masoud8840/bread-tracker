const createError = require("../utils/createError.js");
const Async = require("../utils/Async.js");
const User = require("../models/User.js");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

module.exports.postSignup = Async(async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const pw = req.body.password;

  if (!username || !email || !pw) {
    return res.json({
      message: "اطلاعات نامعتبر!",
      status: "fail",
      statusCode: 400,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      message: "پست الکترونیکی قبلا استفاده شده!",
      status: "fail",
      statusCode: 400,
    });
  }

  const password = await hash(pw, 10);

  const newUser = new User({
    email,
    password,
    username,
    balance: 0,
    role: "User",
  });
  await newUser.save();
  res.json({
    message: "کاربر مورد نظر با موفقیت ساخته شد.",
    status: "success",
    statusCode: 201,
  });
});

module.exports.postLogin = Async(async (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const userPw = existingUser.password;
    const doesPwMatch = await compare(pw, userPw);

    if (doesPwMatch) {
      const { email, username, balance, role } = existingUser;
      const token = jwt.sign(
        {
          email,
          username,
          balance,
          role,
        },
        process.env.HASH,
        { expiresIn: "1D" }
      );

      return res.json({
        message: "با موفقیت وارد حساب کاربری خود شدید.",
        status: "success",
        statusCode: 200,
        token: `Bearer ${token}`,
        email,
        username,
        balance,
        role,
      });
    }
    return res.json({
      message: "پست الکترونیکی یا رمز عبور اشتباه است!",
      status: "fail",
      statusCode: 400,
    });
  }

  res.json({
    message: "کاربری با این پست الکترونیکی و رمز عبور یافت نشد!",
    status: "fail",
    statusCode: 400,
  });
});
