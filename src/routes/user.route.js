const router = require("express").Router();
const { asyncTryCatchWrapper } = require("../wrapper/async-trycatch");
const { UserController } = require("../controller");
const { Tools } = require("../utils/tools");
const { auth } = require("../middleware");

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
    Tools.User.setCookie(res, token);
    delete user.password;
    res.status(200).json(user);
  })
);

router.get(
  "/me",
  auth,
  asyncTryCatchWrapper(async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
  })
);

// /update
router.put(
  "/update",
  auth,
  asyncTryCatchWrapper(async (req, res) => {
    const user = await User.update(req.user._id, req.body);
    res.status(200).json(user);
  })
);

router.post(
  "/logout",
  asyncTryCatchWrapper(async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "You are not authorized to perform this action!" });
    Tools.User.RemoveCookie(res);
    res.status(200).json({ message: "Logout success" });
  })
);

// only admin route
// router.get("/all", async (req, res) => {
//   const users = await User.getAllUsers(req.query);
//   res.status(200).json(users);
// });

// export
module.exports = { userRouter: router };
