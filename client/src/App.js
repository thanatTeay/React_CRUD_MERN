import logo from './logo.svg';
import './App.css';
import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState(0)
  const [quatity, setQuatity] = useState("")


  const addProduct = () => {
    Axios.post('http://localhost:3001/create', {
      productName: productName,
      price: price,
      quatity: quatity
    }).then(() => {
      console.log("Successfully add product")
    })
  }

  const showProduct = () => {
    Axios.get('http://localhost:3001/findproduct').then((res) => {

      setProductList(res.data)
    })
    //console.log(process.env.REACT_APP_SHOW_PRODUCT)
  }

  const updateProduct = (id) => {

    Axios.put('http://localhost:3001/updateproduct', {
      id: id,
      productName: productName,
      price: price,
      quatity: quatity
    }).then(()=>{
      showProduct()
    })

  }

  const deleteProduct = (id) => {

    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      showProduct()
    })

  }




  return (
    <div className="App container">
      <h1> Product Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Name:</label>
            <input type="text" className="form-control" placeholder="Enter name"
              onChange={(event) => {
                setProductName(event.target.value)
              }} required></input>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="text" className="form-control" placeholder="Enter price"
              onChange={(event) => {
                setPrice(event.target.value)
              }} required></input>
          </div>
          <div className="mb-3">
            <label htmlFor="quatity" className="form-label">Quantity:</label>
            <input type="text" className="form-control" placeholder="Enter quatity"
              onChange={(event) => {
                setQuatity(event.target.value)
              }} required></input>
          </div>

          <button className="btn btn-success" onClick={addProduct}>Add Product</button>

        </form>
        <hr />
        <div className="products">
          <button className="btn btn-primary" onClick={showProduct}>Show list of product</button>
          {
            productList.map((val, key) => {
              return (
                <div className="product card" key={key}>
                  <div className="card-body text-left" >
                    <p className="card-text">Name: {val.productName}</p>
                    <p className="card-text">Price: {val.price}</p>
                    <p className="card-text">Quantity: {val.quantity}</p>
                  </div>
                  <hr />
                  <form action="">
                  <div className="row">
                    <div className="col-md-2">
                      <input type="text" className="form-control" placeholder="Enter name"
                        onChange={(event) => {
                          setProductName(event.target.value)
                        }} required></input>
                    </div>
                    <div className="col-md-2">
                      <input type="text" className="form-control" placeholder="Enter price"
                        onChange={(event) => {
                          setPrice(event.target.value)
                        }} required></input>
                    </div>
                    <div className="col-md-2">
                      <input type="text" className="form-control" placeholder="Enter quatity"
                        onChange={(event) => {
                          setQuatity(event.target.value)
                        }} required></input>
                    </div>
                    <div className="col-md-2 offset-md-2">
                      <button className="btn btn-warning" onClick={() => updateProduct(val._id)}> Change </button>
                    </div>
                    

                    <div className="col-md-1">
                      <button className="btn btn-danger" onClick={() => deleteProduct(val._id)}> Delete </button>
                    </div>


                  </div>
                  </form>


                </div>
              )
            })
          }




        </div>
      </div>
    </div>
  );
}

export default App;
