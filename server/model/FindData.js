const mongoose = require('mongoose')

const FindSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price:{
        type: String,
        
    },
    quantity:{
        type: String,
        required: true,
    },
})

const FindProduct = mongoose.model("Product", FindSchema)

module.exports = FindProduct