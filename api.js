const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');
const {promisify} = require("util");

const JsonGenerator = require("./json_generator/index.js");

var redis = require("redis"),
    client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("ready",function (){
    console.log("Redis connect successful");
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('APM Backend');
});

app.get('/api/user/profile/:id',function(req,res){
    getAsync("test").then(val=>{
        res.send(val);
    });
});

module.exports = app;