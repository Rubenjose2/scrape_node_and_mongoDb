var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
// Require all Routes
var routes = require("./routes/controllers.js");



var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
app.use(logger("dev"));
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Setup and Init of Database Mongo Db

mongoose.Promise = Promise;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database    

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var MONGODB_URI = "mongodb://heroku_nfw3kxjh:sl8cn0a74go8equ50g5cglu6v4@ds131697.mlab.com:31697/heroku_nfw3kxjh";
mongoose.connect(MONGODB_URI, { useMongoClient: true });

// Starting the using of the Routing
app.use("/", routes);

// Starting the Server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});