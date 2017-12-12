var express = require("express");
var router = express.Router();

// Required to scrapp the websites
var axios = require("axios");
var cheerio = require("cheerio");

// Required to access to Mongo Db
var mongoose = require("mongoose");
var db = require("../models");
//  Start Redering the Index page

router.get("/", function(req, res) {
    res.render("index");
});

// Route to scrape from the website
router.get("/scraper", function(req, res) {
    axios.get("http://www.cryptocoinsnews.com").then(function(response) {
        var $ = cheerio.load(response.data);
        var result = [];
        $("h3.entry-title").each(function(i, element) {
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
        db.Article
            .create(result)
            .then(function(dbArticle) {
                res.redirect("/table");
            })
            .catch(function(err) {
                console.log(err)
            })
    });
});

router.get("/table", function(req, res) {
    db.Article
        .find({})
        .then(function(dbArticle) {
            res.render("table", { article: dbArticle })
        })
        .catch(function(err) {
            console.log(err);
        });

})

//This would delete or drop the collection or table of Article
router.get("/drop", function(req, res) {
    db.Article
        .remove()
        .then(function() {
            res.send("Collection Dropped");
        })
})

module.exports = router