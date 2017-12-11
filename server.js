var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Setup and Init of Database Mongo Db

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newscraper", {
    useMongoClient: true
});








// Starting the Server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});