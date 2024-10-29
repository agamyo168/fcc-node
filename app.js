const express = require("express");
const path = require("path");

const app = express();
// setup static and middleware
app.use(express.static("./public"));
// app.get("/", (req, res) => {
//   res.sendFile("./index.html");
//   1- add index html to public
//   2- server-side rendering (template engine)
// });
app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});
app.listen(5000, () => {
  console.log("SERVER IS LISTENING ON PORT 5000...");
});
