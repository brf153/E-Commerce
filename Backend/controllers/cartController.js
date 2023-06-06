const Cart = require("../models/cartModels.js");
const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures.js");



// Create New Order
exports.newCartOrder = catchAsyncErrors(async(req,res,next)=>{
    
    const product  = req.body;
    
    const newProduct = await Cart.create(product); // Create a new product using Product model

  res.status(201).json({
    success: true,
    product: newProduct,
  });
})

// Get All Cart Orders 
exports.getAllCartOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Cart.find()

    // let totalAmount =0

    // orders.forEach(order=>{
    //     totalAmount += order.totalPrice
    // })

    res.status(200).json({
        success:true,
        // totalAmount,
        orders
    })
})

// Delete Cart Order 
exports.deleteCart = catchAsyncErrors(async(req,res,next)=>{
    const order = await Cart.findById(req.params.id)

    if(!order){
        return next(new ErrorHander("Order not found with this Id",404))
    }

    await order.remove()

    res.status(200).json({
        success:true,
    })
})