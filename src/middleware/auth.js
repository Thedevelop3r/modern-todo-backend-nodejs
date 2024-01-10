// auth.js middleware

const jwt = require("jsonwebtoken");
const { UserController } = require("../controller/User.controller");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1] || req?.cookies?.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    const user = await UserController.verifyUser(userId);
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    console.log("\n-----------------------------------\n");
    console.log("** AUTH MIDDLEWARE ** -> username:", user.name, "role:", user.role, "status:", user.status);
    console.log("\n-----------------------------------\n");
    next();
  } catch (err) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = { auth };
