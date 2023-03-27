const mongoose = require("mongoose");

const connectDatabase=async()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,family:4}).then((data)=>{
        console.log(`Connected at host: ${data.connection.host}`)
    }).catch((error)=>{
        console.log(error)
    })
    
}

module.exports= connectDatabase