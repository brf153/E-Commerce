const express = require("express");
const Product = require("./models/productModel.js");
const app = express();
const errorMiddleware = require("./middleware/error")
<<<<<<< HEAD
=======
const cookieParser = require("cookie-parser")
>>>>>>> dev

app.use(express.json())
app.use(cookieParser())

//Route Imports
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js")
const order = require("./routes/orderRoute.js")
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


//Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
