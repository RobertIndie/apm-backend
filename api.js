const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');
const ID = require('shortid');
const db = require("./database.js");
const User = require("./user");
const Project = require("./project");
const Iteration = require("./iteration");
const Task = require("./task");
const ObjectLoader = require("./object_loader/index.js");
const Util = require('./util');

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
    });
});

app.get('/api/iteration/:id',(req,res)=>{
    var iteration = Iteration.createNew();
        
    db.hmget(`iterations:${req.params.id}`,iteration.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        iteration = ObjectLoader.load(iteration,val);
        res.send(iteration);
    });
});

app.get('/api/iteration/:id/:field',async (req,res)=>{
    const val = await db.hget(`iterations:${req.params.id}`,req.params.field);
    if(val===null)return res.send('null');
    res.send(val);
});

app.get('/api/task/:id',(req,res)=>{
    var task = Task.createNew();
    
    db.hmget(`tasks:${req.params.id}`,task.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        task = ObjectLoader.load(task,val);
        res.send(task);
    });
});

app.post('/api/iteration/create',async (req,res)=>{
    const result = Iteration.validate(req.body);
    if(result.error)return res.status(400).send(result.error.message);
    var iteration = Iteration.init(req.body);
    var id = ID.generate();
    if(!await db.exists(`projects:${iteration.projectID}`)) return res.status(400).send("项目不存在");

    var key = `projects:${iteration.projectID}`;
    await db.lock(key);
    var projectIterationList = JSON.parse(await db.hget(`projects:${iteration.projectID}`,'iterationList'));
    projectIterationList.push(id);
    await db.hset(key,'iterationList',JSON.stringify(projectIterationList));
    await db.unlock(key);

    await db.hmset(`iterations:${id}`,Util.fieldAndValuePack(iteration));
    res.send('');
});

app.post('/api/task/create',async (req,res)=>{
    const result = Task.validate(req.body);
    if(result.error)return res.status(400).send(result.error.message);
    var id = ID.generate();
    if(!await db.exists(`projects:${req.body.projectID}`)) return res.status(400).send("项目不存在");
    if(!await db.exists(`iterations:${req.body.iterationID}`)) return res.status(400).send("迭代不存在");

    var key = `iterations:${req.body.iterationID}`;
    await db.lock(key);
});


module.exports = app;