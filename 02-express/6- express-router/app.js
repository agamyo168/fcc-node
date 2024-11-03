const express = require("express");
const peopleRouter = require("./routes/people");
const authRouter = require("./routes/auth");
const app = express();
// static assets middleware
app.use(express.static("./methods-public"));

// parse form data middleware
app.use(express.urlencoded({ extended: false }));
// parse json data
app.use(express.json());
app.use("/login", authRouter);
app.use("/api/people", peopleRouter);
app.listen(5000, () => {
  console.log("SERVER IS LISTENING ON PORT 5000...");
});
