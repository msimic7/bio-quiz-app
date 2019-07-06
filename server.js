const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('public'));

let PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
