const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const User = require('./models/User');
const protect = require("./middleware/authMiddleware");
const Product = require("./models/Product");


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // important for reading POST body

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.post("/create-user", async (req, res) => {
    console.log("Received data:", req.body); // debug

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save(); // saves in MongoDB
        res.send("User Created Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user");
    }
});


app.post("/login", async(req,res)=>{
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(400).send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    return res.status(400).send("Invalid Password")
  }

  const token = jwt.sign(
    { id: user._id},
    process.env.JET_SECRET,
    {expiresIn: "1d"}
  )

res.json({
  message: "Log in Successfull",
  token: token
})
});

app.get("/profile", protect, (req,res)=>{
  res.send("Welcome to Your Profile")
});

app.post("/products",async (req, res )=>{
const {name, price, description} = req.body;
console.log(req.body);
try{
const product = new Product({
  name,
  price,
  description
})

await product.save();
res.send("Product Added Successfully");
}catch(error){
res.status(500).send("Error adding product");
}

});

app.get("/products",async (req,res)=>{
  const products= await Product.find();
res.json(products)
})

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
