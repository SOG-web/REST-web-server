require('dotenv').config();
const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const mongoose = require('mongoose');

const app = express();
const bookRouter = express.Router();

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello: 'This is my API' };
    res.json(response);
  });

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  debug(`server listing on ${chalk.bgBlue.bold.black(hostname)}:${chalk.green(port)}`);
});
