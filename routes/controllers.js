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
    db.Article
        .find({})
        .limit(2)
        .then(function(DbArticle) {
            res.render("index", { sort: DbArticle });
        })
        .catch(function(err) {
            console.log(err);
        })
});


//This function would clear the database
const clear_database = (function() {
    db.Article
        .remove()
        .exec()
});
////////////////////////////////////////



// Route to scrape from the website
router.get("/scraper", function(req, res) {
    clear_database();
    axios.get("http://www.ccn.com").then(function(response) {
        var $ = cheerio.load(response.data);
        var result = [];
        $("h4.entry-title").each(function(i, element) {
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
        .populate("note")
        .then(function(dbArticle) {
            res.render("table", { article: dbArticle });
        })
        .catch(function(err) {
            console.log(err);
        });

});


//This would delete or drop the collection or table of Article
router.get("/drop", function(req, res) {
    db.Article
        .remove()
        .then(function() {
            res.send("Collection Dropped");
        })
})

// THis route is to save the note associate with the Article

router.post("/articles/:id", function(req, res) {
    // Access to the Note collection

    db.Note
        .create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
            console.log("Note Added");
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        })
})

router.get("/articles/:id", function(req, res) {
    //Access to the notes on a specific article
    db.Article
        .findOne({ _id: req.params.id })
        .populate("note")
        .then(function(DbArticle) {
            res.json(DbArticle.note);
        })
        .catch(function(err) {
            res.json(err);
        })
});

module.exports = router