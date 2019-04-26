const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 8,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value); //=> true
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
      type: String,
      require: true,
      minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {// this function determines what exactly send back when mongoose model is converted to a JSON value.
  var user = this;
  var userObject = user.toObject(); //prendo variabile mongoose e la converto in oggetto User regolare.

  return _.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

  //user.tokens.push({access, token});

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

//Definisco il modello:
var User = mongoose.model('User', UserSchema);

module.exports = {User};
