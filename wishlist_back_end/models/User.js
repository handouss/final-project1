const mongoose = require('mongoose')
const {Schema} = mongoose
const Wish = require('./Wish')

const userSchema = new Schema({
    name: {
        type: String, required: true, unique: true
    }, password: {
        type: String,
    },
    email:{type: String},
    img: String, token: String
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
