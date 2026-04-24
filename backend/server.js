const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
dotenv.config({path:'./dotenv/config.env'});
const cookieParser=require('cookie-parser')
const products=require('./routes/products')
const auth=require('./routes/users')
const order=require('./routes/order')
const app=require('./app');
const payment=require('./routes/payment')
mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{
    console.log('connected to database');
}).catch((err)=>{  
    console.log('error connecting to database',err);
});
app.use(express.json());
app.use(cookieParser())
app.set('query parser', 'extended');
app.use('/api/v1/',products)
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);
app.listen(process.env.PORT,()=>{
    console.log('server is listening on port '+process.env.PORT);
})
