const mongoose = require('mongoose')
const {Schema} = mongoose
const User = require('./User')
const Product = require('./Product')

const wishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true }
)

module.exports = mongoose.model('Wish', wishSchema)