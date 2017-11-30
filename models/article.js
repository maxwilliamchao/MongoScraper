var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleschema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  saved: {
    type: Boolean,
    required: false
  }
});

var article = mongoose.model("article", articleschema);

module.exports = article;