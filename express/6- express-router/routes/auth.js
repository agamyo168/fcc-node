const express = require("express");

const router = express.Router();
router.post("/", (req, res) => {
  //we must include express.urlencoded to get the form body
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide a credentials.");
});

modules.exports = router;
