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