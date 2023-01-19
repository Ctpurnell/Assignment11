const router = require("express").Router();
const db = require("../db/db.json");
const fs = require('fs')
const path = require('path')
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));//response comes back in JSON
});

router.post("/notes", (req, res) => {
  // incorperate body
  const newNote = req.body;
  // specifiy an id value
  newNote.id = db.length;
  // read previous notes, and add to them
  readAndAppend(newNote, "./db/db.json");
  res.json(newNote);
});

router.delete("/notes/:id", (req, res) => {
  for (let i = 0; i < db.length; i++) {
    let note = db[i];
    if (note.id === req.params.id) {
      db.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(db)
      );
      break;
    }
  }
});

module.exports = router;
