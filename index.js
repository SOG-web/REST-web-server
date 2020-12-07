require('dotenv').config();
const express = require('express');
const debug = require('debug')('index');
const mongoose = require('mongoose');
const chalk = require('chalk');
// const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const app = express();

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

mongoose.connect('mongodb://localhost/bookAPI');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  debug(`server listing on ${chalk.bgBlue.bold.black(hostname)}:${chalk.green(port)}`);
});
