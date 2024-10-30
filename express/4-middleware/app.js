const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(5000, () => {
  console.log("SERVER IS LISTENING ON PORT 5000...");
});
