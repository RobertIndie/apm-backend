const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');
const db = require("./database.js");
const User = require("./user");
const JsonGenerator = require("./json_generator/index.js");

User.db = db;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('APM Backend');
});

app.get('/api/user/profile/:name',function(req,res){
    User.getUser(req.params.name,user=>res.send(user));
});

module.exports = app;