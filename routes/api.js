import express, { query } from "express";
import { myDB } from "../db/MyDB.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
export const router = express.Router();

router.get("/search", async (req, res) => {
  console.log(req.query);
  const offset = parseInt(req.query.page || 1, 10);
  //const MaxElements = req.query.MaxElements || 20;
  const booksres = await myDB.getSearch({ MaxElements: 20, offset });
  //console.log(booksres);
  res.send(booksres);
});

router.post("/searchByIsbn", bodyParser.json(), async (req, res) => {
  const isbn = req.body.isbn;
  const query = { ISBN: parseInt(isbn, 10) };
  console.log(query);

  const bookInfo = await myDB.getBookByISBN({ query });
  console.log("inside of the searchByIsbn");
  //console.log("the bookInfo from getBookByISBN ", bookInfo);
  if (bookInfo) {
    return res
      .status(200)
      .json({ data: bookInfo, message: "Successfully found" });
  } else {
    return res.status(401).json({ message: "Didn't find anything" });
  }
});

router.post("/users/login", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  myDB.getUser({ email: email }).then((existingUser) => {
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result) {
        return (
          res
            .status(200)
            // add email : email
            .json({ message: "Login successful", email: email })
        );
      } else {
        return res.status(401).json({ message: "Wrong email or password" });
      }
    });
  });
});

router.post("/users/register", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  myDB.getUser({ email: email }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        myDB
          .createUser({
            email: email,
            password: hashedPassword,
          })
          .then((result) => {
            if (result) {
              return res
                .status(201)
                .json({ message: "User registered successfully" });
            } else {
              return res
                .status(400)
                .json({ message: "User registration failed" });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
          });
      });
    }
  });
});

router.get("/searchByTitle", async (req, res) => {
  const title = req.query.title;
  console.log("this is a title from searchByTitle ", title);
  console.log("the is a request log\t", req);
  const maxResults = parseInt(req.query.maxResults) || 20;
  try {
    const books = await myDB.getBooksByTitle(title, maxResults);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/books", async (req, res) => {
  const { isbn } = req.query;
  myDB.getBookByISBN({ ISBN: parseInt(isbn) }).then((book) => {
    if (!book) {
      return res.status(401).json({ message: "Couldn't find this book" });
    } else {
      return res.json(book);
    }
  });
});
export default router;
