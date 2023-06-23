const mongoose = require('mongoose');
const db1 = mongoose.createConnection(process.env.mongodb_link);
const userSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    favArtists: {
        type: [String],
        required: true
    },
});
module.exports = db1.model('User', userSchema);