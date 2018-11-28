const express = require('express');
const mongoose = require('mongoose');
const app = express();

const sender = require('./producer')
const receiver = require('./receiver')
const UserModel = require('./user')

app.listen(3000, function(){
    console.log('Express 3000')
});

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');

app.set('view engine', 'pug')

app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user', (req,res)=>{
    
    sender.send(req.body)
})

mongoose.connect('mongodb://localhost:27017/rabbit' , {useNewUrlParser:true});

var db = mongoose.connection;

db.on('error', (err)=>{
    console.log(' Error connecting to database')
})

db.once('open', ()=>{
    console.log('Connected to database')
})

app.get('/listUsers', async  (req,res)=>{
    const users = await UserModel.find().exec();
    res.status(200).send(users)
})

app.get('/sender', (req,res) => res.render('index'))

module.exports = app;