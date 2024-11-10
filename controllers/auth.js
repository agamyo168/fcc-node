/*Login / Register controller*/

const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  return res.status(StatusCodes.CREATED).json({
    msg: "User has been created successfully!",
    user: { name: user.name },
    token: user.token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");
  const user = await User.findOne({ where: { email: email } }); //.findOne({email}) this would work too but will throw annoying yellow warning
  if (!user) throw new UnauthenticatedError("Invalid Credentials");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Password");
  const token = user.token;
  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
