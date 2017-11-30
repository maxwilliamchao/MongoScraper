var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var request = require('request');
var request = require('cheerio');

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;
var db = require("./models");
// Instantiate our Express App
var app = express();

// Require our routes
// var routes = require("./routes");

// Designate our public folder as a static directory
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper";
mongoose.connect("mongodb://localhost/MongoScraper", {
  useMongoClient = true
});

// Have every request go through our route middleware
// app.use(routes);
app.get("/", function(req, res) {
  res.render('index')
});

app.get("/nytScrape", function(req, res) {
  var nytScrape = function() {
    request('http://www.nytimes.com', function(error, response, html){
      var $ = cheerio.load(html);

      var results = [];

      $("h2.story-heading").each(function(i, element) {

        var link = $(element).children().attr("href");
        var title = $(element).children().text();

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          link: link
        });
      });
      console.log(results);
    });
  };
});
// app.get("/articles", function(req, res) {
//   res.render('#')
// )};

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});