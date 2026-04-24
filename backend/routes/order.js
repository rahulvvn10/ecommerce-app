const express=require('express')
const { newOrder, getOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../middleware/orderController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/authenticate');
const router=express.Router()

router.post('/order/new',isAuthenticatedUser,newOrder);
router.get('/order/:id',isAuthenticatedUser,getOrder);
router.get('/myorders',isAuthenticatedUser,myOrders);

router.get('/orders',isAuthenticatedUser,authorizeRoles('admin'),allOrders);
router.put('/order/:id',isAuthenticatedUser,authorizeRoles('admin'),updateOrder);
router.delete('/order/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

module.exports=router
