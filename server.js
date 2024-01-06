const express = require("express");
const { Tools } = require("./utils/tools");
const { DatabaseConnection } = require("./db.config");
const { UserController } = require("./controller/User.controller");
const { checkinLogger } = require("./middleware/checkin-logger");
const { errorHandler } = require("./middleware/error-handler");
const { asyncTryCatchWrapper } = require("./wrapper/async-trycatch");
const app = express();
const port = 3000;

// disable x-powered-by header
app.disable("x-powered-by");

// REST activity logger
app.use(checkinLogger);

app.get(
  "/",
  asyncTryCatchWrapper(async (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  })
);

app.get(
  "/user",
  asyncTryCatchWrapper(async (req, res) => {
    const startRand = Tools.random(1, 70000);
    const endRand = Tools.random(startRand, startRand + 70000);
    const email = `auto-${startRand}-@${endRand}.com`;
    const pwd = Tools.random(100000, 999999);
    const isActive = Tools.random(0, 1);
    const newuser = {
      name: "John Doe",
      email: email,
      password: pwd,
      role: "admin",
      status: isActive ? "active" : "inactive",
    };
    const user = await UserController.create(newuser);
    res.status(201).json({ user });
  })
);

// error handler
app.use(errorHandler);

const dbConnection = new DatabaseConnection();
dbConnection.connect().then(() => {
  console.log("Database connected");
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
