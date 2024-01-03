const express = require("express");
const { Tools } = require("./utils/tools");
const { DatabaseConnection } = require("./db.config");
const { UserController } = require("./controller/User.controller");
const app = express();
const port = 3000;

// disable x-powered-by header
app.disable("x-powered-by");

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.get("/user", async (req, res) => {
  const newuser = {
    name: "John Doe",
    email: "a@a.com",
    password: "123456",
    role: "admin",
    status: "active",
  };
  const user = await UserController.create(newuser);
  res.status(201).json({ user });
});

const dbConnection = new DatabaseConnection();
dbConnection.connect().then(() => {
  console.log("Database connected");
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
