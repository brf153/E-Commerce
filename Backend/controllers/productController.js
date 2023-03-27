const Product= require("../models/productModel.js")




//Create Product
exports.createProduct= async(req,res,next)=>{
    const product = await Product.create(req.body);

    return res.status(201).json({
        success:true,
        product
    })
}



exports.getAllProducts = (req,res)=>{

    return res.status(200).json({message:"Route is working fine"})
}