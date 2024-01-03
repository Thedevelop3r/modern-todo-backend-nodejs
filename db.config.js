// db.config.js - mongoose configuration

const mongoose = require("mongoose");

class DatabaseConnection {
  static Mongoose = mongoose;
  constructor() {
    this.connection = null;
  }
  async connect() {
    this.connection = await mongoose.connect(process.env.MONGO_URL, { dbName: "todo-v3" });
    return this.connection;
  }
  async disconnect() {
    await this.connection?.close();
  }
}

module.exports = { DatabaseConnection, Mongoose: DatabaseConnection.Mongoose };
