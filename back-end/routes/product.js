const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const Constants = require('../constants/application-constants')

//Get All Products
router.get('/', async (req,res) => {
    try{
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});
    
//Get Product
router.get('/:id', getProduct, (req,res) => {
    res.send(res.product);
});

//Add Product
router.post('/', async (req,res) => {
    const product = new Product({
        productName: req.body.productName,
        netWeight: req.body.netWeight,
        maximumRetailPrice: req.body.maximumRetailPrice,
        purchasePrice: req.body.purchasePrice,
        sellingPrice: req.body.sellingPrice,
        profit: req.body.profit,
        stockInHand: req.body.stockInHand
    });
    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Update Product
router.patch('/:id',getProduct, async (req,res) => {
    if(req.body.productName !== null){
        res.product.productName = req.body.productName;
    }
    if(req.body.netWeight !== null){
        res.product.netWeight = req.body.netWeight;
    }
    if(req.body.maximumRetailPrice !== null){
        res.product.maximumRetailPrice = req.body.maximumRetailPrice;
    }
    if(req.body.purchasePrice !== null){
        res.product.purchasePrice = req.body.purchasePrice;
    }
    if(req.body.sellingPrice !== null){
        res.product.sellingPrice = req.body.sellingPrice;
    }
    if(req.body.profit !== null){
        res.product.profit = req.body.profit;
    }
    if(req.body.stockInHand !== null){
        res.product.stockInHand = req.body.stockInHand;
    }
    try{
        const updatedProduct = await res.product.save();
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

//Delete Product
router.delete('/:id',getProduct, (req,res) => {
    try{
        res.product.remove();
        res.status(200).json(`Product '${res.product.productName}' deleted successfully`);
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

//Update stock
router.post('/update-stock',getProduct, async (req, res) => {
    try{
        if(req.body.isAdd){
            res.product.stockInHand += req.body.stock; 
        }else{
            res.product.stockInHand -= req.body.stock;
            if(res.product.stockInHand < 0){
                return res.status(400).json({message: Constants.PRODUCT_COUNT_LESS_THAN_ZERO});
            }
        }
        console.log('saving product')
        const updatedProduct = await res.product.save();
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

async function getProduct(req, res, next){
    let product;
    try{
        let product_id = (req.params?.id)?  req.params.id : req.body.productId;
        product = await Product.findById(product_id);
        if(product === null){
            return res.status(404).json({message: 'Product not found'});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.product = product;
    next();
}

module.exports = router;