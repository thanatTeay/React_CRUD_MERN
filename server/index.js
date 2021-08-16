const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

const ProductsModel = require('./model/Products')
const FindAll = require('./model/FindData')

app.use(cors())
app.use(express.json());



/*mongoose.connect("mongodb+srv://Thanat2208:thegame901@crud.qooys.mongodb.net/Products?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
});*/
mongoose.connect("mongodb+srv://Thanat2208:thegame901@crud.qooys.mongodb.net/Products?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('error', function(err) {
    if(err) throw err;
  });



app.post('/create', async (req,res) => {
    const productName = req.body.productName
    const price = req.body.price
    const quatity = req.body.quatity

    const product = new ProductsModel({
        productName: productName,
        quantity: price,
        price: quatity
    })
    try{
        await product.save();
        res.send("Inserted data")
    }catch(err){
        console.log(err)
    }
})


app.listen(3001, () => 
{
    console.log("Server running on port 3001")
})