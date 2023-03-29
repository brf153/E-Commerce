const express = require("express");
const Product = require("./models/productModel.js");
const app = express();

app.use(express.json())

//Route Imports
const product = require("./routes/productRoute.js");
app.post("/api/v1",async(req,res)=>{
    // console.log(req);
    const body = req.body;
    console.log(req.body);
    const data = await Product.create(
        body
    )
    return res.status(200).json({hello:"hello"})
})
app.use("/api/v1",product);

module.exports = app;
