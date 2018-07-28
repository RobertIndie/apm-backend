const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const joi = require('joi');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send('APM Backend');
});

module.exports = app;