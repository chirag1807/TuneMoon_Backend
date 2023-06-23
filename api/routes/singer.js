const express = require('express');
const router = express.Router();
const Singer = require('../model/singer');

router.get('/', (req, res, next) => {
    Singer.find()
    .then(result => {
        res.status(200).json({
            singer: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.post('/', (req, res, next) => {
    const singer = new Singer({
        musicFilePath: req.body.musicFilePath,
        title: req.body.title,
        singer: req.body.singer
    })
    singer.save()
    .then(result => {
        res.status(200).json({
            newSinger: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

module.exports = router;