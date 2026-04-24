const express = require("express");
const orderModel = require("../models/orderModel");
const productModel=require('../models/productModel')
exports.newOrder=async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body;
    const order=await orderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user.id
    })
    res.status(200).json(
        {
            success:true,
            order
        }
    )
}

exports.getOrder=async(req,res)=>{
    const order=await orderModel.findById(req.params.id).populate('user','name email');
    if(!order)return res.status(400).json(
        {
            success:false,
            message:"No order exists"
            
        })
        res.status(200).json({
            success:true,
            order
        })
}

exports.myOrders=async(req,res)=>{
    const order=await orderModel.find({user:req.user.id});
    res.status(200).json({
            success:true,
            order
        })
}

exports.allOrders=async(req,res)=>{
    const order=await orderModel.find();
    let totalAmount=0
    order.map(order=>{totalAmount+=order.totalPrice})
    res.status(200).json({
            success:true,
            totalAmount,
            order
        })
}

exports.updateOrder=async(req,res)=>{
    const order=await orderModel.findById(req.params.id);
    if(order.orderStatus=='Delivered'){
        return res.status(400).json("order already delivered")
    }
    for (const item of order.orderItems) {
      await updateStock(item.product, item.quantity);
    }
    order.orderStatus=req.body.orderStatus;
    order.deliveredAt=Date.now();
    await order.save();
    res.status(200).json({
        success:true
    
    })
}

async function updateStock(productId,quantity){
    const product=await productModel.findById(productId);
    product.stock=product.stock-quantity;
    product.save({validateBeforeSave:false})
}

exports.deleteOrder=async(req,res)=>{
    const order=await orderModel.findById(req.params.id);
    if(!order)return res.status(400).json(
        {
            success:false,
            message:"No order exists"
            
        })
    await order.deleteOne();
    res.status(200).json({
        success:true
    
    })
}