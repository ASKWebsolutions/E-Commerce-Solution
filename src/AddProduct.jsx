import React, {useState} from 'react'

const AddProduct = () => {

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [message, setMessage] = useState("");

const handleSubmit=async (e)=>{
e.preventDefault();

const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5000/products", {
    method: "POST",
    headers: {
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
    },
    body: JSON.stringify({
        name,
        price,
        description
    }),
});

const data = await res.text();
setMessage(data);

setName("");
setPrice("");
setDescription("")
}
  return (
    <div style={{padding: "40px"}}>

        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>

            <input 
            type="text"
            placeholder='Product Name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />

            <br /> <br />

             <input 
            type="number"
            placeholder='Price'
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
            />  

            <br /> <br />

        <textarea 
        placeholder='Description'
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
        />

        <br /> <br />

        <button type='submit'>Add Product</button>
        </form>

        {message && <p>{message}</p>}
      
    </div>
  )
}

export default AddProduct
