const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())


const userRouters = require('./routes/users')
const wishlistRouters = require('./routes/wishlist')
const productsRouters = require('./routes/products')

mongoose.connect('mongodb://localhost:27017/wishlist', ()=>{
    console.log("db connected")
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/user', userRouters)
app.use('/product', productsRouters)
app.use('/wish', wishlistRouters)




app.listen(3003)