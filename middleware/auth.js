const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //401 IS NOT AUTHENTICATED ERROR.
    throw new UnauthenticatedError("No token with the request");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authorized");
  }
};

module.exports = auth;
