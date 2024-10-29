const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const { url } = req;
  res.status(200).send("Home Page");
});

app.get("/about", () => {
  console.log("user hit about page");
  res.status(200).send("About Page");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found </h1>");
});
app.listen(5000, () => {
  console.log("SERVER IS LISTENING ON PORT: 5000...");
});

// app.get
// app.post
// app.put
// app.delete
// app.all -> all methods
// app.use -> middleware
// app.listen -> listen on port
