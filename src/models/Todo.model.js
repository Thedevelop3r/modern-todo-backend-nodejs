const { Mongoose } = require("../db.config");
const { Schema, model } = Mongoose;

const todoSchema = new Schema({
  title: {
    required: true,
    type: String,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1500,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "progress", "completed"],
    default: "pending",
  },
  createdAt: Date,
  updatedAt: Date,
});

// set timestamp
todoSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) this.createdAt = currentDate;
  next();
});

const Todo = model("Todo", todoSchema);

module.exports = { Todo };
