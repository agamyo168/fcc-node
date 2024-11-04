const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //401 IS NOT AUTHENTICATED ERROR.
    throw new CustomAPIError("No token with the request", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    throw new CustomAPIError("Not Authorized", 401);
  }
};

module.exports = auth;
