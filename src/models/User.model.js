// User.model.js

const bcrypt = require("bcrypt");
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
  next();
});
// comparePassword
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// hash password
userSchema.pre("save", async function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

const User = model("User", userSchema);

module.exports = { User };
