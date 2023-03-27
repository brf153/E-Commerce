const mongoose = require("mongoose");

const DB_URL= "mongodb+srv://Bhandari:bhandari@ecommerce.vy2iqso.mongodb.net/Ecommerce?retryWrites=true&w=majority"

const connectDatabase=async()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,family:4}).then((data)=>{
        console.log(`Connected at host: ${data.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
    
}

module.exports= connectDatabase