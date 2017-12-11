var express = require("express");
var router = express.Router();

//  Start Redering the Index page

router.get("/", function(req, res) {
    res.render("index");
})


module.exports = router;