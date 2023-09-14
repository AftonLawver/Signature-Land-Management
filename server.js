const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'public')));


const dbURI = process.env.DATABASE;
const mongoose = require("mongoose");
const {MongoClient} = require("mongodb");

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(process.env.DATABASE_PORT))
  .catch((error) => console.log(error));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server started on port ${PORT}`)

});