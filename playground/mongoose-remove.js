const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');

// 
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findByIdAndRemove("5cbd8d390f8fb7e82a22d845").then((doc) => {
  console.log(doc);
})
