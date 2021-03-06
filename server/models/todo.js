var mongoose = require('mongoose');

//Definisco il modello:
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

module.exports = {Todo};
