const mongoose = require('mongoose');

const orderModel = mongoose.Schema({
    customerName:{
        type: String,
        required: true
    },
    location:{
        type: String
    },
    mobileNumber:{
        type: String
    },
    orderDelivered:{
        type: Boolean
    }
})

module.exports = mongoose.model('Order', orderModel);