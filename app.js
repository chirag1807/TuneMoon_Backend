require('dotenv').config();
const express = require('express');
const app = express();
const userRoute = require('./api/routes/user');
const musicRoute = require('./api/routes/music');
const singerRoute = require('./api/routes/singer');
const fileUpload = require('express-fileupload');

// mongoose.connect('mongodb_link');

// mongoose.connection.on('error', err=>{
//     console.log('Connection Failed');
// });

// mongoose.connection.on('connected', connected=>{
//     console.log('Connection Succeed');
// });

app.use(fileUpload({
    useTempFiles: true
}))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))

app.use('/user', userRoute);
app.use('/music', musicRoute);
app.use('/singer', singerRoute);
app.use('/', (req, res, next) =>{
    res.status(200).json({
        msg: "Server is listening at port no. 3000"
    })
});

module.exports = app;