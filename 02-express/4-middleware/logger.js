//Custom Middleware function
//Express passes req and res implicitly behind the scene.
const logger = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  if (true) return next(); //passing req and res to next middleware
  res.send("Testing"); // terminate the whole cycle and send your own response
};

module.exports = logger; //DEFAULT EXPORT
