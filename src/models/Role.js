var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * Role Schema
 */
var roleSchema = new Schema({
  title: {
    type: String,
    required: [true, "title not provided "],
  },
  privileges: {
    type: [String],
    required: [true, "privileges not provided "],
  },
});

module.exports = mongoose.model("Role", roleSchema);