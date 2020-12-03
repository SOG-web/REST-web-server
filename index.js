require('dotenv').config();
const express = require('express');

const app = express();

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log(`Running on ${hostname}:${port}`);
});
