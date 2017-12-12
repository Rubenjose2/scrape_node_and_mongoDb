var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");

axios.get("http://www.cryptocoinsnews.com").then(function(response) {
    var $ = cheerio.load(response.data);
    var result = [];
    $("h3.entry-title").each(function(i, element) {
        // Add the text and href of every link, and save them as properties of the result object
        var title = $(this)
            .children("a")
            .text();
        var link = $(this)
            .children("a")
            .attr("href");

        result.push({
            title: title,
            link: link
        })
    });
    console.log(result);

});

db.Article
    .create({ title: "example" })
    .then(function(dbArticle) {
        console.log(dbArticle);
    })