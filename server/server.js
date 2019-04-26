const _ =require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

//connessione con il db
var {mongoose} = require('./db/mongoose');
//le mie classi
var {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
 //se la variabile process.env.PORT è settata allora usiamo quella, senò usa la 3000.
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.post('/user',(req, res) => {
  var user = new User({
    email: "continentalwhite@gmail.com"
  });

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/users',(req,res) => {
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then(() => {
    user.generateAuthToken();
    //res.send(user);
  }).then((token) => {
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove('5cbd92a00f8fb7e82a22d919').then((doc)=>{
    if(!doc)
      return res.status(404).send();

    res.status(200).send(doc);
  }).catch((e) =>{
    return res.status(400).send();
  });
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e)=> {
      res.status(400).send();
    })
    });

app.get('/todos/:id',(req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if(!todo) {
      return res.status(404).send()
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })


});

app.listen((port),() =>{
  console.log(`Started on port ${port}`);
});
