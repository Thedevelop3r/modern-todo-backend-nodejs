// User.controller.js

const { User } = require("../models");

class UserController {
  constructor() {}

  async getAllUsers({ size = 10, page = 1 }) {
    try {
      const users = await User.find()
        .limit(size)
        .skip((page - 1) * size)
        .sort({ created_at: -1 });
      // provide additional information
      const totalPages = Math.ceil((await User.countDocuments()) / size);
      const info = {
        totalRecords: await User.countDocuments(),
        page: page,
        size: size,
        totalPages: totalPages,
      };
      return { data: users, info };
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
  async login(body) {
    const { email, password } = body;
    const user = await User.findOne({ email: email });
    if (!user) return null;
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return null;
    user.password = undefined;
    delete user.password;
    return user;
  }
  static async verifyUser(id) {
    console.log("model verify user id", id);
    const user = await User.findById(id);
    console.log("model verify user", user);
    if (!user) return null;
    user.password = undefined;
    delete user.password;
    return user;
  }
}

module.exports = { UserController };
