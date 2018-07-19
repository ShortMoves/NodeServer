var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    UserEndpoint = require('./endpoints/users');

    
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));
    
app.use('/user', UserEndpoint);



// Responds to homepage get request.
app.use('/', function(req, res){
    res.send('Hello World');
});

module.exports = app;