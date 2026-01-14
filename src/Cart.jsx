import React from 'react'

const Cart = () => {
const [cart, setCart] = useState([]);


useEffect(() => {
const token = localStorage.getItem("token");

fetch("http://localhost:5000/cart", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(data=> setCart(data))

}, [])



  return (
    <div style={{padding: "40px"}}>

        <h1>Your Cart</h1>

        {cart.map(item=>(
            <div key={item.product._id}>
<h3>{item.product.name}</h3>
<p>Price: ${item.product.price}</p>
<p>Quantity: {item.quantity}</p>
            </div>
        ))}
      
    </div>
  )
}

export default Cart
