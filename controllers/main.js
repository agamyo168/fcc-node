const jwt = require("jsonwebtoken");

const { BadRequestError } = require("../errors");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  //--OPTIONS ON VALIDATION--
  //DB validation
  //Joi package for validation
  //check in the controller -- validate
  if (!username || !password) {
    // throw new CustomAPIError("invalid username or password", 400);
    return next(new BadRequestError("invalid username or password")); //400 STANDS FOR BAD REQUEST!
  }
  const id = new Date().getDate(); // This for demo we usually get the id from database.
  //payload is better be small for weak internet users
  //always use long, complex and unguessable secret word in the .env file
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); //sign({ payload }, secret, options)
  return res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.decoded.username}`,
    secret: `Here is your authorized, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
