//const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

/*
Todo.find({
  _id: id //mongo db è pazzesco perchè è in grado di fare autonomamente la conversione in Object
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id //mongo db è pazzesco perchè è in grado di fare autonomamente la conversione in Object
}).then((todo) => {
  console.log('Todos', todo);
});
*/
// if(!ObjectID.isValid(id)){
//   console.log("Invalid id");
// }
User.findById('5caa52086e21382d233ffe5e').then((user) => {
  if(!user) {
    return console.log("L'id specificato non esiste");
  }

  console.log(JSON.stringify(user, undefined, 2 ));
}, (e) => {
  console.log(e);
});
