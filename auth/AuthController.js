var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:false}))
router.use(bodyParser.json());

var User = require('../user')

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


router.post('/register', function(req, res) {
  
    // Encrypt password.
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    // create user object with posted variables and hashed password
    User.create({
        
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    // Function is called after user creation failed/worked.
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // Create a token if no error.
      // jwt.sign() takes payload and secret key as parameters to encrypt.
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      // Return positive auth and token.
      res.status(200).send({ auth: true, token: token });
    }); 
  });

router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    // If token exists, verify method is celled.
    // Method decodes the token.
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        res.status(200).send(decoded);
    });
});

router.post('/login', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.FindOne({ email: req.body.email}, (err, user) =>{
        if (err) return res.status(500).send({auth: false, message: 'Incorrect Login Details'});

        var passwordIsValid = bcrypt.compareSync(req.bodfy.password, user.password);
        
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({auth: true, token: token})
    })
});

module.exports = router;