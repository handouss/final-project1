const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const mongoose = require('mongoose')
const auth = require("../middleware/auth");


router.get('/', (req, res) => {
    res.send('hello products')
})

router.post('/ceate', auth, async (req, res) => {

    const product = new Product({
        name : req.body.name,
        description: req.body.description,
        currency: req.body.currency,
        price: req.body.price,
        status: req.body.status,
        img: req.body.img,
        wish: req.body.wish,
        user: req.body.user,
    })
    try {
        const productCreated = await product.save()
        res.send({success:true, data:productCreated})
    } catch (error) {
        res.status(500).send({error: 'fail creation'});
    }
})

router.get('/findById/:id', auth, async (req, res) => {
    try {
        const product = await Product.where(req.params.id)
        res.send(product)
    } catch (error) {
        res.status(500).send({error: 'Product don\'t exist'});
    }
})

router.get('/findByWishId/:wishId',  auth,async (req, res) => {
    try {
        const wishProducts = await Product.find({wish: mongoose.Types.ObjectId(req.params.wishId)})
        res.send({ success: true ,data: wishProducts})
    } catch (error) {
        res.status(500)
    }
})

router.get('/findByUserId/:userId', auth, async (req, res) => {
    try {
        const wishProducts = await Product.find({user: mongoose.Types.ObjectId(req.params.userId)})
        res.send({ success: true ,data: wishProducts})
    } catch (error) {
        res.status(500)
    }
})


router.patch('/', auth, async (req, res) => {
    try {
        const productUpdated = await Product.findByIdAndUpdate(req.body.id, {
            name : req.body.name,
            description: req.body.description,
            currency: req.body.currency,
            price: req.body.price,
            status: req.body.status,
            img: req.body.img,
            wish: req.body.wish,
        })

        res.send({success: true, data: req.body})
    } catch (error) {
        res.status(500).send({error: 'fail update product'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const productDeleted = await Product.findByIdAndRemove(req.params.id)
        res.send({success: true,message:'product deleted'})
    } catch (error) {
        res.status(500).send({error: 'fail delete product'})
    }
})

module.exports = router
