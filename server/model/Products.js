const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    },
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product