/* eslint-disable no-param-reassign */
const express = require('express');
const debug = require('debug')('index');

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter
    .route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      // This line is specific to mongoose
      book.save();

      debug(book);
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const { query } = req;
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        if (books === undefined || books.length === 0) {
          return res.send(
            `Your search query is not found: ${JSON.stringify(query)}`
          );
        }
        return res.json(books);
      });
    });
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err.stack);
      }
      // debug(book);
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          return res.send(err.stack);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];

        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;