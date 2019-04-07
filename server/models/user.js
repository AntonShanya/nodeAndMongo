var mongoose = require('mongoose');

//Definisco il modello:
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 8,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    trim: true
  }
});

module.exports = {User};
