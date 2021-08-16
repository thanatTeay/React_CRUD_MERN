const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product