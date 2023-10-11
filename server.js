const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const Inquiry = require("./models/inquiry");
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const dbURI = process.env.DATABASE;
const mongoose = require("mongoose");
const {MongoClient} = require("mongodb");
const twilioClient = require('twilio')(process.env.accountSid, process.env.authToken);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(process.env.DATABASE_PORT))
  .catch((error) => console.log(error));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', async (req, res) => {
  let data = req.body;
  let firstName = data["Firstname"];
  let lastName = data["Lastname"];
  let phoneNumber = data["Phone"];
  let requestedServicesData = data["ServicesRequested"];
  let comments = data["Message"];

  // Connect to the database and get the count of documents/users who have given feedback
  const client = new MongoClient(dbURI);
  const database = client.db("inquiries");
  const inquiries = database.collection("slm-info");

  const inquiry = new Inquiry({
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    services: requestedServicesData,
    message: comments
  });
  inquiry.save()
    .then(() => {

    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/send', async (req, res) => {
  let data = req.body;
  let firstName = data["Firstname"];
  let lastName = data["Lastname"];
  let phoneNumber = data["Phone"];
  let requestedServicesData = data["ServicesRequested"];
  let comments = data["Message"];

  let messageBody = `New inquiry for Signature Land Management!
  \nName: ${firstName} ${lastName}\nPhone: ${phoneNumber}\nServices Requested: ${requestedServicesData}\nMessage: ${comments}`

  // send text from twilio
  twilioClient.messages
      .create({
        body:
           messageBody,
        from: process.env.phoneSender,
        to: process.env.phoneRecipient,
      })
      .then(message => console.log("Text message sent."));
});

app.listen(PORT, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server started on port ${PORT}`);
});