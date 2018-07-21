const express = require('express');
const router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');



router.post('/', (req, res, next) => {
    
    console.log("POST ATTEMPTED")
    MongoConnect((err, client) => {
        // Handle connection notification
        if (err)console.log(err);
        console.log("POST connected");
        
        var db = client.db("myDB");
        console.log(req.body);
        var myObj = { Name: req.body.Name, Password: req.body.Password};

        db.collection('Users').insertOne(myObj, (err, res) => {
            if (err) throw err;
            console.log("User added");
            db.close();
        });
        
    });
    res.send("Done!")
})

router.get('/', (req, res, next) => {
    
    console.log("USER GET")
    MongoConnect((err, client) => {
        // Handle connection notification
        if (err)console.log(err);
        
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
        
    });
})

function MongoConnect(callback){
    mongoClient.connect("mongodb://localhost:27017/db", {useNewUrlParser: true}, function(err, client){
        callback(err, client);
    });
}

module.exports = router;