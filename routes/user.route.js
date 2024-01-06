const router = require("express").Router();
const { asyncTryCatchWrapper } = require("../wrapper/async-trycatch");
const { UserController } = require("../controller/User.controller");

const User = new UserController();

router.post(
  "/register",
  asyncTryCatchWrapper(async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  })
);

// export
module.exports = { userRouter: router };
