const express = require('express')
const router = express.Router()
const Wish = require('../models/Wish')
const mongoose = require('mongoose')
const auth = require("../middleware/auth");


router.get('/', (req, res) => {
    res.send('hello wishlist')
})


router.post('/ceate',auth,  async (req, res) => {
    const wish = new Wish({
        name : req.body.name,
        user : req.body.user
    })
    try {
        const wishCreated = await wish.save()
        res.send({success: true, data: wishCreated})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'fail creation'});
    }
})

router.get('/findById/:id',auth,  async (req, res) => {
    try {
        const wish = await Wish.where("id").equals(req.params.id).populate("products")
    } catch (error) {
        res.status(500).send({error: 'Wish don\'t exist'});
    }
})

router.get('/findByUserId/:userId',auth,  async (req, res) => {
    try {
        const userWishlist = await Wish.find({user: mongoose.Types.ObjectId(req.params.userId)})
        res.send({ success: true ,data: userWishlist})
    } catch (error) {
        res.status(500)
    }
})

router.patch('/', auth, async (req, res) => {
    try {
        const wishUpdated = await Wish.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
        })

        res.send({success: true, message: wishUpdated})
    } catch (error) {
        res.status(500).send({error: 'fail update wish'})
    }
})

router.delete('/:id',auth,  async (req, res) => {
    try {
        const wishDeleted = await Wish.findByIdAndRemove(req.params.id)
        res.send({success: true,message:'wish deleted'})
    } catch (error) {
        res.status(500).send({error: 'fail delete wish'})
    }
})



module.exports = router
