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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// db.Author.create({ name: "Ernest Hemingway" })
//   .then(dbAuthor => {
//     console.log(dbAuthor);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

app.get("/books", (req, res) => {
  db.Book.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/authors", (req, res) => {
  db.Author.find({})
    .then(dbAuthor => {
      res.json(dbAuthor);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  console.log('-------->', body);
  db.Book.create({title: body.title})
    .then(({ _id }) => {
      return db.Author.findOneAndUpdate(
          {name: body.author},
          { $push: { books: _id } },
          { upsert: true, useFindAndModify: false, new: true }
        )
    })
    .then(dbAuthor => {
      res.json(dbAuthor);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/authorsWithBooks", (req, res) => {
  db.Author.find({})
    .populate("books")
    .then(dbAuthor => {
      res.json(dbAuthor);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
