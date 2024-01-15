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
}, { timestamps: true });

const Todo = model("Todo", todoSchema);

module.exports = { Todo };
