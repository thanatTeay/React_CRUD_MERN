const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const app = express()

dotenv.config()

const ProductsModel = require('./model/Products')
//const FindModel = require('./model/FindData')

app.use(cors())
app.use(express.json());



/*mongoose.connect("mongodb+srv://Thanat2208:thegame901@crud.qooys.mongodb.net/Products?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
});*/
mongoose.connect(process.env.DB_CONNECT, {
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
        price: price,
        quantity: quatity
    })
    try{
        await product.save();
        res.send("Inserted data")
    }catch(err){
        console.log(err)
    }
})

app.get('/findproduct',async (req,res) => {
    await ProductsModel.find((err,data) => {
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
})


app.listen(process.env.DB_PORT, () => 
{
    console.log("Server running on port ", process.env.DB_PORT)
})