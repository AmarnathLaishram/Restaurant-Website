const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurantReservation', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyparser = require("body-parser");
const port = 8001;
// DEFINE MONGOOSE SCHEMA 
const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  timing: String,
});
const Reservation = mongoose.model('Reservation', reservationSchema);

// EXPRESS SPECIFICS STUFF 
app.use("/static", express.static("static"));
app.use(express.urlencoded()) 


 
// PUG SPECIFIC STUFFS 
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"))

// ENDPOINTS
app.get("/", (req, res) => {
  const params = { };
  res.status(200).render("home.pug", params);
});
app.get("/restaurants", (req, res) => {
  const params = { };
  res.status(200).render("restaurants.pug", params);
});
app.get("/menu", (req, res) => {
  const params = { };
  res.status(200).render("menu.pug", params);
});
app.get("/book", (req, res) => {
  const params = { };
  res.status(200).render("book.pug", params);
});
app.post("/book", (req, res) => {
  var myData = new Reservation(req.body);
  myData.save().then(() =>{
    res.status(400).send("Thank You your booking has been done") 
  }).catch(()=>{
    res.status(400).send("The item is not saved to database") 
  });
});    

// START THE SERVER 
app.listen(port, () => {
    console.log(`The application started successfully on ${port}`);
});