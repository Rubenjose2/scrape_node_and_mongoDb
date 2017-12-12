var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 8000;

var app = express();





app.get("/", function(req, res) {
    axios.get("http://www.cryptocoinsnews.com").then(function(response) {
        var $ = cheerio.load(response.data);
        $("h3.entry-title").each(function(i, element) {
            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
        })
    })
})


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});