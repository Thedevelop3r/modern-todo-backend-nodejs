const { Todo } = require("../models");

class TodoController {
  constructor() {}

  async getTodos({ limit = 10, page = 1 }, userId) {
    try {
      const todos = await Todo.find({
        ownerId: userId,
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 });
      // provide additional information
      const totalPages = Math.ceil((await Todo.countDocuments()) / limit);
      const meta = {
        totalRecords: await Todo.countDocuments(),
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
    const todo = await Todo.findOne({ _id: todoId, ownerId: userId });
    return todo;
  }

  async create({ body, userId }) {
    body.ownerId = userId;
    const newTodo = await Todo.create(body);
    return newTodo;
  }

  async createMany(todos) {
    const newTodos = await Todo.insertMany(todos);
    return newTodos;
  }

  async update({ todoId, body, userId }) {
    const parsedBody = {
      title: body.title,
      description: body.description,
    };
    const updatedTodo = await Todo.findOneAndUpdate({ _id: todoId, ownerId: userId }, parsedBody, { new: true });
    return updatedTodo;
  }

  async destroy({ todoId, userId }) {
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, ownerId: userId });
    return deletedTodo;
  }
}

module.exports = { TodoController: new TodoController() };
