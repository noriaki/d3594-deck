const { send, json } = require('micro');

const setApiHeaders = require('./helpers/setApiHeaders');
const Todo = require('../models/todo');

const list = async (req, res) => {
  setApiHeaders(res);
  const conditions = req.params;
  const todos = await Todo.find(conditions);
  return todos;
};

const create = async (req, res) => {
  setApiHeaders(res);
  const data = await json(req);
  const todo = await Todo.create(data);
  // eslint-disable-next-line no-underscore-dangle
  res.setHeader('Location', `/todos/${todo._id}`);
  return send(res, 201, todo);
};

const show = async (req, res) => {
  setApiHeaders(res);
  const todo = await Todo.findById(req.params.id);
  if (todo === null) {
    return send(res, 404, {
      error: { code: 404, message: 'Todo not found' },
    });
  }
  return todo;
};

const update = async (req, res) => {
  setApiHeaders(res);
  const data = await json(req);
  const todo = await Todo.findByIdAndUpdate(req.params.id, data);
  if (todo === null) {
    return send(res, 404, {
      error: { code: 404, message: 'Todo not found' },
    });
  }
  return send(res, 204, null);
};

const destroy = async (req, res) => {
  setApiHeaders(res);
  const todo = await Todo.findByIdAndRemove(req.params.id);
  if (todo === null) {
    return send(res, 404, {
      error: { code: 404, message: 'Todo not found' },
    });
  }
  return send(res, 204, null);
};

module.exports = {
  list,
  create,
  show,
  update,
  destroy,
};
