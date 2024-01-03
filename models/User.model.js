// User.model.js

const { DatabaseConnection, Mongoose } = require("../db.config");
const { Schema, model } = Mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  status: String,
  created_at: Date,
  updated_at: Date,
});

const User = model("User", userSchema);

module.exports = { User };
