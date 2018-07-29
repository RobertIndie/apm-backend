const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');
const {promisify} = require("util");
const User = require("./user");

const JsonGenerator = require("./json_generator/index.js");

var redis = require("redis"),
    dbClient = redis.createClient();

const getAsync = promisify(dbClient.get).bind(dbClient);

dbClient.on("error", function (err) {
    console.log("[Radies Error]" + err);
});

dbClient.on("ready",function (){
    console.log("Redis connect successful!");
})

User.init(dbClient);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('APM Backend');
});

app.get('/api/user/profile/:name',function(req,res){
    getAsync("test").then(val=>{
        res.send(val);
    });
});

module.exports = app;