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
  created_at: Date,
  updated_at: Date,
});

// set timestamp
todoSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Todo = model("Todo", todoSchema);

module.exports = { Todo };
