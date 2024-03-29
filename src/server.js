const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Tools } = require("./utils/tools");
const { DatabaseConnection } = require("./db.config");
const { checkinLogger, errorHandler, notFound } = require("./middleware");
const { asyncTryCatchWrapper } = require("./wrapper/async-trycatch");
const { router } = require("./routes");
const app = express();
const port = process.env.NODE_DOCKER_PORT || 4000;

// security
app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
// content parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// REST activity logger
app.use(checkinLogger);

app.get(
  "/",
  asyncTryCatchWrapper(async (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  })
);

// app.get(
//   "/user",
//   asyncTryCatchWrapper(async (req, res) => {
//     const startRand = Tools.random(1, 70000);
//     const endRand = Tools.random(startRand, startRand + 70000);
//     const email = `auto-${startRand}-@${endRand}.com`;
//     const pwd = Tools.random(100000, 999999);
//     const isActive = Tools.random(0, 1);
//     const newuser = {
//       name: "John Doe",
//       email: email,
//       password: pwd,
//       role: "admin",
//       status: isActive ? "active" : "inactive",
//     };
//     const user = await UserController.create(newuser);
//     res.status(201).json({ user });
//   })
// );

app.use("/api", router);

// error handler
app.use(errorHandler);
app.use(notFound);

const dbConnection = new DatabaseConnection();
Tools.Fancy.Display("Starting application");
console.log("environment:", process.env.NODE_ENV);
console.log("database:", process.env.MONGO_URL);
console.log("JWT_SECRET".toLowerCase(), process.env.JWT_SECRET);
console.log("port:", process.env.NODE_DOCKER_PORT || port);

console.log("dbConnection", dbConnection);

dbConnection.connect().then(() => {
  Tools.Fancy.Display("Database connected");
  app.listen(process.env.NODE_DOCKER_PORT || port, () => {
    Tools.Fancy.Display(`Server listening on port ${port}`);
  });
});
