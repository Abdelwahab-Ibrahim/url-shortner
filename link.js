const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkschema = new Schema({
    long: {
        type: String,
        required : true
    },
    short: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true
    }
}); 


const Link = mongoose.model('link', linkschema);

module.exports = Link;