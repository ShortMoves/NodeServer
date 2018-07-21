var mongoClient = require('mongodb').MongoClient;

var _client;

var exports = module.exports;


exports.connectToServer = (callback) => {
    mongoClient.connect("mongodb://localhost:27017/db", {useNewUrlParser: true}, function(err, client){
    _client = client;
    callback(err);
    });
};

exports.getClient = () => {
    return _client;
};