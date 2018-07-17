var http = require("http");
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
const router = express.Router();
const bodyParser = require('body-parser');
const UserEndpoint = require('./endpoints/users');


app.use('/user', UserEndpoint);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json);

// Responds to homepage get request.
app.get('/', function(req, res){
    res.send('Hello World');
});

module.exports = app;