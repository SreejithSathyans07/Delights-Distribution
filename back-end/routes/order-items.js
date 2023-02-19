const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderItemModel');
const Product = require('../models/productModel');
const Constants = require('../constants/application-constants');

//Get All Order Items
router.get('/', async (req,res) => {
    try{
        const allOrderItems = await OrderItem.find();
        res.status(200).json(allOrderItems);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});

//Get Order Item
router.get('/:id', getOrderItem, (req,res) => {
    res.send(res.orderItem);
});

//Add Order Item
router.post('/', async (req,res) => {
    const orderItem = new OrderItem({
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    try{
        const newOrderItem = await orderItem.save();
        let product = await Product.findById(req.body.productId);
        console.log('Product initial quantity: ' + product.quantity);
        product.stockInHand -= orderItem.quantity;
        await product.save();
        console.log('Product initial quantity: ' + product.quantity);

        res.status(201).json(newOrderItem);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Delete Order Item
router.delete('/:id',getOrderItem, async(req,res) => {
    try{
        let quantity = res.orderItem.quantity;
        let product = await Product.findById(res.orderItem.productId);
        if(product){
            product.stockInHand += quantity;
            await product.save();
        }
        res.orderItem.remove();
        return res.status(200).json({message: 'deleted successfully'});
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

async function getOrderItem(req, res, next){
    let orderItem;
    try{
        let order_Item_id = req.params.id;
        orderItem = await OrderItem.findById(order_Item_id);
        if(orderItem === null){
            return res.status(404).json({message: 'Order item not found'});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.orderItem = orderItem;
    next();
}

module.exports = router;