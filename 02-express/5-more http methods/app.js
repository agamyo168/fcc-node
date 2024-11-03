const express = require("express");

let { people } = require("./data");
const app = express();
// static assets middleware
app.use(express.static("./methods-public"));

// parse form data middleware
app.use(express.urlencoded({ extended: false }));
// parse json data
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
app.post("/api/people", (req, res) => {
  //We didn't have access to json content-type because we didn't include express.json()
  // -> this is a post request made by axios not form.
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  res.status(201).json({ success: true, person: name });
});
app.post("/login", (req, res) => {
  //we must include express.urlencoded to get the form body
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide a credentials.");
});
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => person.id === Number(id));
  if (!person)
    return res
      .status(404)
      .json({ success: false, msg: `no person with id:${id}` });
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) person.name = name;
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});
app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));
  if (!person)
    return res
      .status(404)
      .json({ success: false, msg: `no person with id:${id}` });
  const newPeople = people.filter((person) => {
    return person.id !== Number(id);
  });
  res.status(200).json({ success: true, data: newPeople });
});
app.listen(5000, () => {
  console.log("SERVER IS LISTENING ON PORT 5000...");
});
