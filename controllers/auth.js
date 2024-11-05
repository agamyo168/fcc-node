/*Login / Register controller*/

const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  //TODO: remove this console log
  console.log({ ...req.body });
  //name, email, and password validation even though they are already validated in DB:
  // This is redundant since we already handle this on DB.
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password");
  // }

  const salt = await bcrypt.genSalt(10); //random bytes generator -> (10 rounds)?
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hash });
  //TODO: remove this console log
  console.log(user);
  //   req.user = user; we don't need this anymore I think since we can just decode tokens for username and email.
  const token = jwt.sign({ name, email, id: user.id }, process.env.JWT_SECRET);

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "User has been created successfully!", token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { login, register };
