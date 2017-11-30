var mongoose = require("mongoose");

var schema = mongoose.schema;

var noteschema = new Schema({
  title: String,
  body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.export = note;