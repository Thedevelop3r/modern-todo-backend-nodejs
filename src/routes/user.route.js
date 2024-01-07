const router = require("express").Router();
const { asyncTryCatchWrapper } = require("../wrapper/async-trycatch");
const { UserController } = require("../controller");
const { Tools } = require("../utils/tools");

const User = new UserController();

router.post(
  "/register",
  asyncTryCatchWrapper(async (req, res) => {
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    delete newUser.password;
    res.status(201).json(newUser);
  })
);

router.post(
  "/login",
  asyncTryCatchWrapper(async (req, res) => {
    const user = await User.login(req.body);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const token = Tools.User.generateToken(user);
    Tools.User.SetCookie(res, token);
    delete user.password;
    console.log("password-changed");
    res.status(200).json(user);
  })
);

// only admin route
// router.get("/all", async (req, res) => {
//   const users = await User.getAllUsers(req.query);
//   res.status(200).json(users);
// });

// export
module.exports = { userRouter: router };
