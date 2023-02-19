const mongoose = require('mongoose');

const orderItemModel = mongoose.Schema({
    orderId:{
        type: String,
        required: true
    },
    productId:{
        type: String
    },
    quantity:{
        type: Number
    }
})

module.exports = mongoose.model('OrderItem', orderItemModel);