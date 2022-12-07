const mongoose = require('mongoose')
const {Schema} = mongoose
const Wish = require('./Wish')
const User = require('./User')

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    currency: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    status: {
        type: Boolean,
        default: false
    },
    wish: { type: Schema.Types.ObjectId, ref: 'Wish' },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
},
    { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)