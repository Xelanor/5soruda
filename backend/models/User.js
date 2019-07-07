const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }]
});
module.exports = User = mongoose.model("users", UserSchema);