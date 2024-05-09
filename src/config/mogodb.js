import mongoose from "mongoose";

const getClient = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/productEcom")
        console.log("Mongodb Connected")
    }catch(err){
        console.log("Mongo Connection Failed")
    }
}

export default getClient;