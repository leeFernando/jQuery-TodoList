var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo-api', {
  keepAlive: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");