const express = require("express");

let { people } = require("../data");
const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

const router = express.Router();

// router.get("/", getPeople);
// router.post("/postman", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

router.route("/").get(getPeople);
router.route("/postman").post(createPerson);
router.route("/:id").put(updatePerson).delete(deletePerson);
module.exports = router;
