import React,{useState, useEffect} from 'react'

const Products = () => {
const [products, setProducts] = useState([]);

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
        </div>
      ))}
    </div>
  )
}

export default Products
