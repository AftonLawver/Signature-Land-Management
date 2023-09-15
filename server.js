const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const Inquiry = require("./models/inquiry");
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

app.post('/', async (req, res) => {
  let data = req.body;
  // there is no data in the res.
  console.log(data);
  let firstName = data["Firstname"];
  let lastName = data["Lastname"];
  let phoneNumber = data["Phone"];
  let requestedServicesData = data["ServicesRequested"];
  let comments = data["Message"];

  // Connect to the database and get the count of documents/users who have given feedback
  const client = new MongoClient(dbURI);
  const database = client.db("slm-info");
  const inquiries = database.collection("inquiries");

  const inquiry = new Inquiry({
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    services: requestedServicesData,
    message: comments
  });
  inquiry.save()
    .then(() => {
      // do something after saving...
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server started on port ${PORT}`)
});