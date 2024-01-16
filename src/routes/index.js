// Router
const router = require("express").Router();
const { userRouter } = require("./user.route");
const { todoRouter } = require("./todo.route");
const { trashRouter } = require("./trash.route");

const { auth } = require("../middleware");

router.use("/user", userRouter);
router.use("/todo", auth, todoRouter);
router.use("/trash", auth, trashRouter);

// export
module.exports = { router: router };
