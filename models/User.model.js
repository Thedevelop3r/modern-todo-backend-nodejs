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
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  created_at: Date,
  updated_at: Date,
});

// set timestamp
userSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const User = model("User", userSchema);

module.exports = { User };
