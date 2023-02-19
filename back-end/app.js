const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');

dotenv.config()
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING);
const db=mongoose.connection;

db.on('error', (error)=>{
    console.log(error)
});
db.once('open', ()=>{
    console.log('Database connection established');
})

app.use(express.json())

const productRoute = require('./routes/product')
app.use('/product', productRoute)

const orderRoute = require('./routes/order')
app.use('/order', orderRoute)

const orderItemRoute = require('./routes/order-items')
app.use('/order-item', orderItemRoute)

app.listen(3000, ()=>{
    console.log('server is running');
})