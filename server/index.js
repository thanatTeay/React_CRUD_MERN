const express = require('express');
const mongoose = require('mongoose');
const app = express()

const ProductsModel = require('./model/Products')

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



app.get('/', async (req,res) => {
    const product = new ProductsModel({
        productName: "umbrella",
        quantity: 10,
        price: 110
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