const mongoose = require('mongoose');
const db2 = mongoose.createConnection(process.env.mongodb_link);

const singerSchema = mongoose.Schema({
    musicFilePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    singer: {
        type: String,
        required: true
    }
});

module.exports = db2.model('Singer', singerSchema, this.singer);