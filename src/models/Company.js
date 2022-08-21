var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * Role Schema
 */
var companySchema = new Schema({
  name: {
    type: String,
    required: [true, "name not provided "],
  },
  email: {
    type: String,
    required: [true, "email not provided "],
  },
  address: {
    type: String,
    required: [true, "address not provided "],
  },
  city: {
    type: String,
    required: [true, "city not provided "],
  },
  postalCode: {
    type: String,
    required: [true, "postalCode not provided "],
  },
});

module.exports = mongoose.model("Company", companySchema);