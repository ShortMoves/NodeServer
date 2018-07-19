var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    UserEndpoint = require('./endpoints/users');

    
AppConfig();

EndPointConfig();

// Configuring routing.
function EndPointConfig(){

    app.use('/user', UserEndpoint);

    // Responds to homepage get request.
    app.use('/', function(req, res){
        res.send('Hello World2');
    });
}

// App configuration.
function AppConfig(){

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: false
    }));
}

module.exports = app;
