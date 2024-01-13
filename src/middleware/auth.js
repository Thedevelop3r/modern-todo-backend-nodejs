// auth.js middleware

const jwt = require("jsonwebtoken");
const { UserController } = require("../controller/User.controller");

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const cookieHeader = req?.cookies?.token;
  let token = false;

  if (authHeader) {
    token = authHeader.replace("Bearer ", "");
  } else if (cookieHeader) {
    token = cookieHeader;
  }

  console.log("\n--------------1---------------------\n");
  console.log("** AUTH MIDDLEWARE ** -> authHeader:", authHeader, "cookieHeader:", cookieHeader);
  console.log("** AUTH MIDDLEWARE ** -> token:", token);
  console.log("-----------------------------------");

  try {
    if (!token) {
      console.log("token not found!");
      throw new Error("No token provided");
    }
    console.log("token found! -> decoding...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token:", decoded);
    const userId = decoded._id;
    console.log("userId:", userId);
    console.log("verifying user...");
    const user = await UserController.verifyUser(userId);
    console.log("user:", user);
    if (!user) {
      console.log("user not found!");
      throw new Error("No user found");
    }
    req.user = user;
    req.token = token;
    console.log("\n** AUTH MIDDLEWARE ** -> username:", user.name, "role:", user.role, "status:", user.status);
    console.log("\n-----------------------------------\n");
    next();
  } catch (err) {
    console.log("---------------EE--------------------");
    console.log("** AUTH MIDDLEWARE ** -> ERROR:", err.message);
    console.log("-----------------------------------\n");
    res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = { auth };
