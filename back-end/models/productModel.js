const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    netWeight:{
        type: Number,
        required: true
    },
    maximumRetailPrice:{
        type: Number,
        required: true
    },
    purchasePrice:{
        type: Number,
        required: true
    },
    sellingPrice:{
        type: Number,
        required: true
    },
    profit:{
        type: Number,
        required: true,
        default: 0
    },
    stockInHand:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Product', productModel);