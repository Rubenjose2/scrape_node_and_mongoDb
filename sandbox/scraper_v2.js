var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var db = require("../models");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from reddit's webdev board:" +
    "\n***********************************\n");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("http://www.cryptocoinsnews.com", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var result = {};
    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("h3.entry-title").each(function(i, element) {
        result.title = $(this)
            .children("a")
            .text();
        result.link = $(this)
            .children("a")
            .attr("href");
        db.Article
            .create(result)
            .then(function(dbArticle) {
                // If we were able to successfully scrape and save an Article, send a message to the client
                console.log("Done");
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                console.log(err)
            });
    });

    // Log the results once you've looped through each of the elements found with cheerio

});