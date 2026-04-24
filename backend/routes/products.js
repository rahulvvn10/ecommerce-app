const express=require('express')
const productModel=require('../models/productModel')
const APIFeatures = require('../utils/apiFeatures')
const router=express.Router()
const {isAuthenticatedUser, authorizeRoles}=require('../middleware/authenticate')
const { createReviews, getReviews, deleteReview } = require('../middleware/productController')

router.get('/products',async(req,res)=>{
    const resPerpage=3;
    const apiFeatures=new APIFeatures(productModel.find(),req.query).search().filter().paginate(resPerpage);
    let buildQuery=()=>{
        return new APIFeatures(productModel.find(),req.query).search().filter();
    }
  
    const filteredProductsCount=await buildQuery().query.countDocuments();
    const totalCount=await productModel.countDocuments({});
    let productsCount=totalCount;
    if(filteredProductsCount!==totalCount){
        productsCount=filteredProductsCount;
    }
    const products=await buildQuery().paginate(resPerpage).query;
    res.status(200).json({
        success:true,
        count:productsCount,
        resPerpage:resPerpage,
        products
    })
    
})
router.post('admin/products/new',isAuthenticatedUser,authorizeRoles('admin'),async(req,res)=>{
    req.body.user=req.user.id;
    const product=await productModel.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})
router.get('/products/:id',async(req,res)=>{
    const product=await productModel.findById(req.params.id).populate('reviews.user','name email');
    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
})

router.put('admin/products/:id',async(req,res)=>{
    let product=await productModel.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    product=await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        product
    })
})

router.delete('admin/products/:id',async(req,res)=>{
    const product=await productModel.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Product is deleted"
    })
})

router.put('/review',isAuthenticatedUser,createReviews);
router.get('/reviews',getReviews);
router.delete('/review',deleteReview);
module.exports=router