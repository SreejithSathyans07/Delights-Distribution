const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Constants = require('../constants/application-constants')

//Get All Orders
router.get('/', async (req,res) => {
    try{
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});
    
//Get Order
router.get('/:id', getOrder, (req,res) => {
    res.send(res.order);
});

//Add Order
router.post('/', async (req,res) => {
    const order = new Order({
        customerName: req.body.customerName,
        location: req.body.location,
        mobileNumber: req.body.mobileNumber,
        orderDelivered: req.body.orderDelivered,
    });
    try{
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Update Order
router.patch('/:id',getOrder, async (req,res) => {
    if(req.body.customerName){
        res.order.customerName = req.body.customerName;
    }
    if(req.body.location){
        res.order.location = req.body.location;
    }
    if(req.body.mobileNumber){
        res.order.mobileNumber = req.body.mobileNumber;
    }
    if(req.body.orderDelivered){
        res.order.orderDelivered = req.body.orderDelivered;
    }
   
    try{
        const updatedOrder = await res.order.save();
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

//Delete Order
router.delete('/:id',getOrder, (req,res) => {
    try{
        res.order.remove();
        return res.status(200).json({message: 'deleted successfully'});
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

async function getOrder(req, res, next){
    let order;
    try{
        let order_id = (req.params?.id)?  req.params.id : req.body.orderId;
        order = await Order.findById(order_id);
        if(order === null){
            return res.status(404).json({message: 'Order not found'});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.order = order;
    next();
}

module.exports = router;