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
    const updatedUserBody = {};
    if (body.name) updatedUserBody.name = body.name;
    if (body.status) updatedUserBody.status = body.status;
    // dangerous below
    // if (body.email) updatedUserBody.email = body.email;
    // if (body.password) updatedUserBody.password = body.password;
    // if (body.role) updatedUserBody.role = body.role;

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserBody, { new: true });
    updatedUser.password = undefined;
    delete updatedUser.password;
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
    const user = await User.findById(id);
    if (!user) return null;
    user.password = undefined;
    delete user.password;
    return user;
  }
}

module.exports = { UserController };
