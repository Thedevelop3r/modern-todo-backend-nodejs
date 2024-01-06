// User.model.js

const { DatabaseConnection, Mongoose } = require("../db.config");
const { Schema, model } = Mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: String,
  status: String,
  created_at: Date,
  updated_at: Date,
});

const User = model("User", userSchema);

module.exports = { User };
