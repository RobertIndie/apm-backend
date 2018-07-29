const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');
const db = require("./database.js");
const User = require("./user");
const Project = require("./project");
const Iteration = require("./iteration");
const ObjectLoader = require("./object_loader/index.js");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('APM Backend');
});

app.get('/api/user/:name/profile',function(req,res){
    var user = User.createNew();
        
    db.hmget(`users:${req.params.name}`,user.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        user = ObjectLoader.load(user,val);
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
        result = [];
        val.forEach(element => {
            result.push(JSON.parse(element));
        });
        res.send(result);
    });
});

app.get('/api/project/:id',(req,res)=>{
    var project = Project.createNew();
        
    db.hmget(`projects:${req.params.id}`,project.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        project = ObjectLoader.load(project,val);
        res.send(project);
    });
});

app.get('/api/project/:id/iterations',(req,res)=>{
    db.hget(`projects:${req.params.id}`,"iterationList").then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    })
});

app.get('/api/iteration/:id',(req,res)=>{
    var iteration = Iteration.createNew();
        
    db.hmget(`iterations:${req.params.id}`,iteration.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        iteration = ObjectLoader.load(iteration,val);
        res.send(iteration);
    });
});

module.exports = app;