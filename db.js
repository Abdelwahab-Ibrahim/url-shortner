const { MongoVlint, MongoClient } = require('mongodb');

let dbconnection;

module.exports = {
    connectToDb: () => {
        MongoClient.connect(`mongodb://localhost:27017/links`)
            .then((clint) => {
                dbconnection = clint.db();
            }).catch(err => {
                console.log(err);
            })
    },
    getDb: () => { }
};