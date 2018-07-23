const express = require('express');
const router = express.Router();
//var mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');
var mongoUtil = require('../utilities/mongoUtil');
var IsAuth = require('../auth/AuthController').IsAuth;

mongoUtil.connectToServer((err) => {
    if (err) console.log(err);
    else console.log("Connected to server");
})

router.post('/register', function(req, res) {
  
    // Encrypt password.
    var hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    
    // create user object with posted variables and hashed password
    var User = {
      name : req.body.Name,
      email : req.body.Email,
      password : hashedPassword
    };

    mongoUtil.AddUser(User, (err) => {
        if (err) throw err;
        var token = jwt.sign({ id: User._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
            });
            // Return positive auth and token.
            res.status(200).send({ auth: true, token: token });
            console.log("User Added to DB");
    })
});

router.post('/login', function(req, res){

    var Email = req.body.Email;
    var hashedPassword = bcrypt.hashSync(req.body.Password, 8);

    mongoUtil.GetUser(req.body.Email, hashedPassword, (user, err) => {
        if (err) throw err;

        if (hashedPassword != user.password){
            console.log("NO PASSWORD MATCH")
            console.log(hashedPassword)
            console.log(user.password)
        }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
            });
            // Return positive auth and token.
            res.status(200).send({ auth: true, token: token });
    })

});

router.post('/', IsAuth, (req, res, next) => {
    
    console.log("POST ATTEMPTED")
    
    var db = client.db("myDB");
    console.log(req.body);
    var myObj = { Name: req.body.Name, Password: req.body.Password};

    db.collection('Users').insertOne(myObj, (err, res) => {
        if (err) throw err;
        console.log("User added");
        db.close();
    });
        
    res.send("Done!")
})


router.get('/', IsAuth, (req, res, next) => {
    
    console.log("USER GET")
    var client = mongoUtil.getClient();
        // Handle connection notification
        
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
    });
})

module.exports = router;