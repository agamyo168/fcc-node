const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job route?
    // const user = User.findById(payload.id)
    // req.user = user;
    req.user = { userId: payload.id, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};
module.exports = auth;
