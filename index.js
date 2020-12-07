require('dotenv').config();
const express = require('express');
const debug = require('debug')('index');
const mongoose = require('mongoose');
const chalk = require('chalk');

const app = express();

if (process.env.ENV === 'Test') {
  debug('This is a test');
  mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  debug('This is for real');
  mongoose.connect('mongodb://localhost/bookAPI');
}

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  debug(`server listing on ${chalk.bgBlue.bold.black(hostname)}:${chalk.green(port)}`);
});

module.exports = app;
