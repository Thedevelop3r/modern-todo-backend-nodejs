const { Todo, Trash } = require("../models");

class TrashController {
  constructor() {}

  async getTodos({ limit = 10, page = 1 }, userId) {
    try {
      const todos = await Trash.find({
        ownerId: userId,
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 });
      // TODO: 1 Apply sorting and filters
      // provide additional information
      const totalPages = Math.ceil((await Trash.countDocuments()) / limit);
      const meta = {
        totalRecords: await Trash.countDocuments(),
        page: page,
        limit: limit,
        totalPages: totalPages,
      };
      return { data: todos, meta };
    } catch (err) {
      return err;
    }
  }

  async getTodoById({ todoId, userId }) {
    const todo = await Trash.findOne({ _id: todoId, ownerId: userId });
    return todo;
  }

  async create({ body, userId }) {
    body.ownerId = userId;
    const newTodo = await Trash.create(body);
    return newTodo;
  }

  async createMany(todos) {
    const newTodos = await Trash.insertMany(todos);
    return newTodos;
  }

  async update({ todoId, body, userId }) {
    const parsedBody = {};
    if (body.title) parsedBody.title = body.title;
    if (body.description) parsedBody.description = body.description;
    if (body.status) parsedBody.status = body.status;
    const updatedTodo = await Trash.findOneAndUpdate({ _id: todoId, ownerId: userId }, parsedBody, { new: true });
   
    return updatedTodo;
  }
  async recover({ todoId, userId }) {
    const deletedTodo = await Trash.findOneAndDelete({ _id: todoId, ownerId: userId });
    const recoveredTodo  = await Todo.create({ ...deletedTodo._doc, todoId: todoId });
    return recoveredTodo;
  }

  async destroy({ todoId, userId }) {
    const deletedTodo = await Trash.findOneAndDelete({ _id: todoId, ownerId: userId });
    return deletedTodo;
  }
}

module.exports = { TrashController: new TrashController() };
