const Product = require("../models/productModel.js");
const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures.js");



//Create Product
exports.createProduct= catchAsyncErrors(async(req,res,next)=>{

    req.body.user = req.user.id;

    let product = await Product.create(req.body);
    return res.status(201).json({
        success:true,
        product
    })
});


//Get All Product
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
     .search()
     .filter()
     .pagination(resultPerPage);

    let products = await apiFeature.query;

    return res.status(200).json({
        success: true,
        products,
        productCount,
    })
})

//Get Product Details

exports.getProductDetails= async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found", 404));
    }
    res.status(200).json({
        success:true,
        product
    })
}

// Update Product -- Admin

exports.updateProduct = async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}

    //Delete product

    exports.deleteProduct = async(req,res,next)=>{

        const product= await Product.findById(req.params.id);

        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product not found"
            })
        }

        await product.remove();

        res.status(200).json({
            success:true,
            Message: "Product deleted"
        })
    }
