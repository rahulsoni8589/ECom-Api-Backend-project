import express from "express"
import getClient from "./src/config/mogodb.js";
import productRouter from "./src/feature/route/product.route.js";
import { errorMiddleware } from "./src/errorhandler/errorhandler.js";

//setting up the applicationg using express 
const app = express();

// using express JSON and urlencoded object to parse the data coming from the client
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// product routes
app.use("/api/products", productRouter)

// Setting the Error handler for application
app.use(errorMiddleware)

// settingup server listeners
app.listen(5000,()=>{
    console.log("Applicating is running on 5000")
    getClient()
})
