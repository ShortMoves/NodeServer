var mongoClient = require('mongodb').MongoClient;
var _client;
var exports = module.exports;


exports.AddUser = (user, callback) => {
    var db = _client.db("AppDB")

    db.collection('User').insertOne(user, (err, res) => {
        if (err) callback(err);;
        console.log("User added");
    });
    callback();
};

exports.GetUser = (email, HashedPassword, callback) => {

    var db = _client.db("AppDB");

    db.collection('User', (err, collection)=> {
        if (err) console.log(err);
        
        collection.findOne({"email": email}, (err, item) => {
            if (err) console.log(err);
            callback(item, err);
        })

    });
};

exports.connectToServer = (callback) => {
    mongoClient.connect("mongodb://localhost:27017/db", {useNewUrlParser: true}, function(err, client){
    _client = client;
    callback(err);
    });
};

exports.getClient = () => {
    return _client;
};