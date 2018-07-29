const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');
const db = require("./database.js");
const User = require("./user");
const JsonGenerator = require("./json_generator/index.js");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('APM Backend');
});

app.get('/api/user/:name/profile',function(req,res){
    var user = User.createNew();
        
    db.hmget(`users:${req.params.name}`,user.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        for(var i=0;i<val.length;i++){
            user[user.metadata.getDatabaseField[i]] = val[i];
        }
        user.metadata = undefined;
        res.send(user);
    });
});

app.get('/api/user/:name/contribute',function(req,res){
    db.hget(`users:${req.params.name}`,"contributeData").then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    });
});

app.get('/api/user/:name/todolist',(req,res)=>{
    db.hget(`users:${req.params.name}`,"currentTaskList").then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    });
});

app.get('/api/user/:name/doneList',(req,res)=>{
    db.hget(`users:${req.params.name}`,"doneTaskList").then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    });
});

app.get('/api/project/',(req,res)=>{
    db.smembers('projectList').then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    });
});

module.exports = app;