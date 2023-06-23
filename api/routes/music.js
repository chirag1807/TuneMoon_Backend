const express = require('express');
const router = express.Router();
const Music = require('../model/music');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: '877259119788592', 
    api_secret: process.env.api_secret,
});

router.get('/bySearch', async (req, res, next) => {
    let data = await Music.find(
        {
            "$or":[
                {title:{$regex:req.query.search}},
                {singers:{$regex:req.query.search}},
                {movie:{$regex:req.query.search}},
                {actors:{$regex:req.query.search}}
            ]
        }
    )
    res.status(200).send(data);
})

router.get('/suggestionSearch', async (req, res, next) => {
    let data = await Music.find(
        {
            "$or":[
                {singers:{$regex:req.query.singer1}},
                {singers:{$regex:req.query.singer2}},
                {actors:{$regex:req.query.actor1}},
                {actors:{$regex:req.query.actor2}}
            ]
        }
    )
    res.status(200).send(data);
})

router.get('/', (req, res, next) => {
    Music.find()
    .then(result => {
        res.status(200).json({
            music: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
});

router.post('/directPost', (req, res, next) => {
    const music = new Music({
        musicFilePath: req.body.url,
        title: req.body.title,
        singers: req.body.singers,
        movie: req.body.movie,
        actors: req.body.actors
    })
    music.save()
    .then(result => {
        res.status(200).json({
            new_music: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.post('/', (req, res, next) => {
    const file = req.files.audioFile;
    console.log(file.tempFilePath);
    cloudinary.uploader.upload(file.tempFilePath, {resource_type: "video"}, (err, result)=>{
        console.log(err);
        const music = new Music({
            musicFilePath: result.url,
            title: req.body.title,
            singers: req.body.singers,
            movie: req.body.movie,
            actors: req.body.actors
        })
        music.save()
        .then(result => {
            res.status(200).json({
                new_music: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
    })
})

module.exports = router;