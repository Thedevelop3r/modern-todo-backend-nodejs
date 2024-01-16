const { Mongoose } = require("../db.config");
const { Schema, model } = Mongoose;

const trashSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      maxlength: 100,
    },
    todoId: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
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
  },
  { timestamps: true }
);

const Trash = model("Trash", trashSchema);

module.exports = { Trash };
