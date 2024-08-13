const express = require('express');
const app = express();
const ProductRoutes = require('./routes/productRouter')
const UserRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const orderRouter = require('./routes/orderRouter')
const mongoose = require('mongoose');
const cors=require('cors');
app.use(express.json())
mongoose.connect(
    "mongodb+srv://ranjithat2022ece:ranjitha123@cluster0.3aaxkdu.mongodb.net/e_commerce"
).then(()=>{
    console.log("connected to database");
})
app.use(cors());
app.use('/products',ProductRoutes )
app.use('/user',UserRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter);
app.listen(3000,()=>{
    console.log("server is running on the port 3000");
})