const express=require('express');
const app=express();
const dotenv=require("dotenv").config();
const connectdb=require('./config/db')
const cors=require('cors')
const stripe=require('./routes/stripe')
const port=process.env.PORT || 5001;
connectdb();

app.use(express.json());
 app.use(cors());
 app.use('/api/users',require("./routes/user"));
 app.use('/api/auth',require("./routes/auth"));
 app.use('/api/products',require("./routes/product"));
 
 app.use('/api/orders',require("./routes/user"));
 app.use('/api/checkout',require("./routes/stripe"));
 

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})