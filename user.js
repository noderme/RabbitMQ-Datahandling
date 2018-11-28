const mongoose = require('mongoose');


const User = new mongoose.Schema({
    name:String,
    lastname:String,
    username:String,
    password:String
});

module.exports = mongoose.model('User', User);