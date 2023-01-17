const express = require("express");
const path = require("path");
const api = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// GET Route for notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// GET route for index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
