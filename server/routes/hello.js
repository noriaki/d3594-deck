const { send } = require('micro');

const hello = (req, res) => send(res, 200, `Hello ${req.params.who}`);

module.exports = hello;
