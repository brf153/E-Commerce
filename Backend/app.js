const express = require("express");
const Product = require("./models/productModel.js");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

app.use(express.json({limit:"50mb"}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
app.use(fileUpload())


//Route Imports
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js")
const order = require("./routes/orderRoute.js")

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
app.use("/api/v1",user)
app.use("/api/v1",order)

//Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
