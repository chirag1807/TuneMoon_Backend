const mongoose = require('mongoose');
const db1 = mongoose.createConnection(process.env.mongodb_link);
const musicSchema = mongoose.Schema({
    musicFilePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    singers: {
        type: [String],
        required: true
    },
    movie: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    }
});
module.exports = db1.model('Music', musicSchema, 'music');