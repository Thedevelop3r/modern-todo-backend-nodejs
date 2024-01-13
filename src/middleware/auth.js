// auth.js middleware

const jwt = require("jsonwebtoken");
const { UserController } = require("../controller/User.controller");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const cookieHeader = req?.cookies?.token;
    let token = false;

    if (authHeader) {
      token = authHeader.replace("Bearer ", "");
    } else if (cookieHeader) {
      token = cookieHeader;
    }
    console.log("\n-----------------------------------\n");
    // req.header
    console.log("** AUTH MIDDLEWARE ** -> req.header:", req.header("Authorization"));
    // authHeader: Bearer <token>
    console.log("** AUTH MIDDLEWARE ** -> authHeader:", authHeader);
    console.log("** AUTH MIDDLEWARE ** -> cookieHeader:", cookieHeader);
    console.log("** AUTH MIDDLEWARE ** -> token:", token);
    console.log("\n-----------------------------------\n");

    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    const user = await UserController.verifyUser(userId);
    if (!user) throw new Error("No user found");
    req.user = user;
    req.token = token;
    console.log("\n-----------------------------------\n");
    console.log("** AUTH MIDDLEWARE ** -> username:", user.name, "role:", user.role, "status:", user.status);
    console.log("\n-----------------------------------\n");
    next();
  } catch (err) {
    console.log("\n-----------------------------------\n");
    console.log("** AUTH MIDDLEWARE ** -> ERROR:", err.message);
    console.log("\n-----------------------------------\n");
    res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = { auth };
