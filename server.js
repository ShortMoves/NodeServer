var http = require("http");
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;



// Responds to homepage get request.
app.get('/', function(req, res){
    res.send('Hello World');
})

// 127.0.0.1:8081/requestride
app.get('/requestride', function(req, res){

    // 127.0.0.1:8081/requestride?ID=2?X=3?Y=4
    var UserID = req.query.ID;  // ID == 2
    var xCoord = req.query.X;   // X == 3
    var yCoord = req.query.Y;   // Y == 4
    
    // connect to mongoDB called 'db'
    MongoClient.connect("mongodb://localhost:27017/db", function(err, client){
        if (err)console.log(err);
        
        // Log that it's connected.
        console.log("connected");
        // Get DB from client.
        var db = client.db("myDB");

        // Try to get collection called 'Providers' from the db.
        db.collection('Providers', function (err, collection){
            if (err) console.log(err);
            // Get array of all items in collection.
            collection.find().toArray(function(err, items){
                if (err) console.log(err);
                // Render items in view.
                res.send(items);
            })
        })
    })
    console.log("Got a GET request for providers");
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Example app is listening at http://%s:%s", host, port)
})                         

/*
CREATE SERVER WITH NODE NATIVE
http.createServer(function(request, response){
    // Send the HTTP header
    // HTTP STATUS: 200 : OK
    // CONTENT TYPE: text/plain
    response.writeHead(200, {'Content-Type' : 'text/plain'});

    // Send the response body as 'Hello World'
    response.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://127.0.0');
*/