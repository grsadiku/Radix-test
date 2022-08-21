var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName not provided "],
  },
  lastName: {
    type: String,
    required: [true, "lastName not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  company: {
    type: String,
     required: [true, "Please specify company"],
   },
  role: {
    type: String,
     enum: ["Admin", "PropertyManager", "PropertyOwner"],
     required: [true, "Please specify user role"],
   },
   password: {
     type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);