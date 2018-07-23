var express = require('express')
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoUtil = require('../utilities/mongoUtil'),

router.use(bodyParser.urlencoded({ extended:false}))
router.use(bodyParser.json());


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');




router.get('/me', function(req, res) {
    // Default place for token is 'x-access-token' header.
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    // If token exists, verify method is celled.
    // Method decodes the token.
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        res.status(200).send(decoded);
    });
});

/*
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
*/
module.exports = router;
module.exports.IsAuth = (req, res, next) => {
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        res.status(200);
        next();
    });
}