const router = require("express").Router();
const { asyncTryCatchWrapper } = require("../wrapper/async-trycatch");
const { TrashController } = require("../controller");
// const { Tools } = require("../utils/tools");

router.get(
  "/",
  asyncTryCatchWrapper(async (req, res) => {
    const { page, limit } = req.query;
    const userId = req.user._id;
    const { data, meta } = await TrashController.getTodos({ page, limit, limit: limit }, userId);
    res.status(200).json({ data, meta });
  })
);

router.get(
  "/:id",
  asyncTryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const todo = await TrashController.getTodoById({ todoId: id, userId });
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(todo);
  })
);

router.put(
  "/:id",
  asyncTryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const userId = req.user._id;
    const updatedTodo = await TrashController.recover({ todoId: id, userId });
    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(updatedTodo);
  })
);

router.delete(
  "/:id",
  asyncTryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const deletedTodo = await TrashController.destroy({ todoId: id, userId });
    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(deletedTodo);
  })
);

module.exports = { trashRouter: router };
