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

app.get('/api/iteration/:id/iteration_data',(req,res)=>{
    db.hget(`iterations:${req.params.id}`,"data").then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    });
});

app.get('/api/iteration/:id/taskwall',(req,res)=>{
    db.hget(`iterations:${req.params.id}`,"taskList").then(val=>{
        if(val===null)return res.send("null");
        res.send(val);
    });
});

app.get('/api/task/:id',(req,res)=>{
    var task = Task.createNew();
    
    db.hmget(`tasks:${req.params.id}`,task.metadata.getDatabaseField).then(val=>{
        if(res[0]===null)return res.send("null");
        task = ObjectLoader.load(task,val);
        res.send(task);
    });
});

var _id = 0;
app.post('/api/iteration/create',async (req,res)=>{
    var t_id = _id;
    _id++;
    const result = Iteration.validate(req.body);
    if(result.error)return res.status(400).send(result.error.message);
    var id = ID.generate();
    if(!await db.exists(`projects:${req.body.projectID}`)) return res.status(400).send("项目不存在");

    
    //db.lock(req.body.projectID);
    var isLocked = 1;
        do{
            isLocked = await db.exists(`locks:${req.body.projectID}`);
            console.log(isLocked);
        }
        while(isLocked && !(await Util.sleep(10)) && !(console.log(`访问了一个被锁的值${req.body.projectID}`)));
        await db.set(`locks:${req.body.projectID}`,1);
    console.log(`${t_id}:锁住`);
    var projectIterationList = JSON.parse(await db.hget(`projects:${req.body.projectID}`,'iterationList'));
    projectIterationList.push(id);
    if(t_id===0) await new Promise(resolve => setTimeout(resolve,5000));
    await db.hset(`projects:${req.body.projectID}`,'iterationList',JSON.stringify(projectIterationList));
    
    //db.unlock(req.body.projectID);
    await db.del(`locks:${req.body.projectID}`);
    console.log(`${t_id}:解锁`);
    await db.hmset(`iterations:${id}`,Util.fieldAndValuePack(req.body));
    res.send('');
});




module.exports = app;