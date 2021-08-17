const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path')
const app = express()

dotenv.config()

const ProductsModel = require('./model/Products')
//const FindModel = require('../client/build')

app.use(cors())
app.use(express.json());

/*if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}*/

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname,'../client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
}

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


app.put('/updateproduct', async (req,res) => {
    const id = req.body.id
    const productName = req.body.productName
    const price = req.body.price
    const quatity = req.body.quatity

    try{
        await ProductsModel.findById(id, (err, updateProduct) =>{
            updateProduct.productName = productName,
            updateProduct.price = price,
            updateProduct.quantity = quatity

            updateProduct.save()
            res.send("update")
        })
    }catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id

    await ProductsModel.findByIdAndRemove(id).exec()
    res.send("Delete!!!")
})




app.listen(process.env.DB_PORT || 3001, () => 
{
    console.log("Server running on port ", process.env.DB_PORT)
})