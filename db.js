const { MongoVlint, MongoClient } = require('mongodb');

let dbconnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(`mongodb://localhost:27017/links`)
            .then((clint) => {
                dbconnection = clint.db();
                return cb;
            }).catch(err => {
                console.log(err);
                return cb(err);
            })
    },
    getDb: () => dbconnection
};