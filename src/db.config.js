// db.config.js - mongoose configuration

const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const mongodb_uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
console.log("\n\n\n", mongodb_uri, "\n\n\n");
class DatabaseConnection {
  static Mongoose = mongoose;
  constructor() {
    this.connection = null;
  }
  async connect() {
    this.connection = await mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return this.connection;
  }
  async disconnect() {
    await this.connection?.close();
  }
}

module.exports = { DatabaseConnection, Mongoose: DatabaseConnection.Mongoose };
