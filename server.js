const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/library", { useNewUrlParser: true });

app.get("/books", (req, res) => {
  // GET books collection
});

app.get("/authors", (req, res) => {
  // GET the authors collection
});

app.post("/submit", ({ body }, res) => {
  // POST create a new entry
});

app.get("/authorsWithBooks", (req, res) => {
  // GET populate the books documents for each author
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
