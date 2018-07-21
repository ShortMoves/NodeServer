var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    userEndpoint = require('./endpoints/users');

    
AppConfig();

EndPointConfig();

// Configuring routing.
function EndPointConfig(){

    app.use('/user', userEndpoint);

    // Responds to homepage get request.
    app.use('/', function(req, res){
        res.send('Hello World2');
    });
}

// App configuration.
function AppConfig(){

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended: true}));
}

module.exports = app;
