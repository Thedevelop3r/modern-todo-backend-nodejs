// User.controller.js

const { User } = require("../models/User.model");

class UserController {
  constructor() {}

  async index() {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
      return err;
    }
  }

  async show(id) {
    const user = await User.findById(id);
    return user;
  }

  async create(body) {
    const newUser = await User.create(body);
    return newUser;
  }

  async update(id, body) {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    return updatedUser;
  }

  async destroy(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }
}

module.exports = { UserController: UserController };
