// Router
const router = require("express").Router();
const { userRouter } = require("./user.route");
const { todoRouter } = require("./todo.route");

const { auth } = require("../middleware");

router.use("/user", userRouter);
router.use("/todo", auth, todoRouter);

// export
module.exports = { router: router };
