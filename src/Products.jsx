import React,{useState, useEffect} from 'react'

const Products = () => {
const [products, setProducts] = useState([]);

const addToCart= async(productId) =>{
  const token = localstorage.getItem("token");

  await fetch("http://localhost:5000/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({productId})
  });

  alert("Added to Cart")
}

useEffect(()=>{
fetch("http://localhost:5000/products")
.then(res => res.json())
.then(data => setProducts(data))
}
)

  return (
    <div style={{padding:"40px"}}>
      
      <h1>Products</h1>

      {products.map(product =>(
        <div key={product._id} style={{border: "1px solid #ccc",margin: "10px", padding: "10px", }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>${product.price}</strong>
            <button onClick={()=> addToCart(product._id)}>
              Add to Cart
            </button>
        </div>
      ))}
    </div>
  )
}

export default Products
