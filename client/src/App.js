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

  const showProduct = () =>{
    Axios.get('http://localhost:3001/findproduct').then((res) => {
      
      setProductList(res.data)
    })
    //console.log(process.env.REACT_APP_SHOW_PRODUCT)
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
