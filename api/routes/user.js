const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/getByUid', async (req, res, next) => {
    let data = await User.find(
        {
            "$or":[
                {uid:{$regex:req.query.uid}}
            ]
        }
    )
    res.status(200).send(data);
})

router.get('/', (req, res, next) => {
    User.find()
    .then(result => {
        res.status(200).json({
            userData: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.post('/', (req, res, next) => {
    const user = new User({
        uid:req.body.uid,
        userName:req.body.userName,
        favArtists:req.body.favArtists
    })
    user.save()
    .then(result => {
        res.status(200).json({
            new_user:result
        })
    })
    .catch(error => {
        res.status(500).json({
            error:error
        })
    })
})

router.post('/update', async (req, res, next) => {
    await User.deleteOne({uid: req.body.uid});
    const user = new User({
        uid:req.body.uid,
        userName:req.body.userName,
        favArtists:req.body.favArtists
    })
    await user.save()
    .then(result => {
        res.status(200).json({
            updatedUser: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})
module.exports = router;