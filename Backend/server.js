const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");
//Config
dotenv.config({path:"Backend/config/config.env"})

//Connecting to database(isko yhi pe add krna wrna is process.env wali cheez milegi nhi)
connectDatabase()


app.listen(process.env.PORT,()=>{
    console.log(`Server is working on:http://localhost:${process.env.PORT}`)
})