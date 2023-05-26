const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


//Config
dotenv.config({path:"Backend/config/config.env"})

//Connecting to database(isko yhi pe add krna wrna is process.env wali cheez milegi nhi)
connectDatabase()

<<<<<<< HEAD
app.listen(process.env.PORT,()=>{
=======
const server = app.listen(process.env.PORT,()=>{
>>>>>>> dev
    console.log(`Server is working on:http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

<<<<<<< HEAD
    Server.close(()=>{
=======
    server.close(()=>{
>>>>>>> dev
        process.exit(1);
    });
});