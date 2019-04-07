//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to MongoDB server');



  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5c9a89ce247284602540902c')
  }, {
    $set: {
      name: "Antony"
    },
    $inc: {
      age: +1
    }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result)
    });




  //db.close();
});
