import mongoose from "mongoose";

export class CustomErrorhandler extends Error{
    constructor(errStatus,errMessage){
        super(errMessage)
        this.errStatus = errStatus;
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    console.log(err)
    if (err instanceof mongoose.Error.ValidationError){
        return res.status(401).send(err.message)
    }
    if (err instanceof CustomErrorhandler){
        return res.status(err.statusCode).send(err.errMessage)
    } 
    res.status(500).send("Server Side Error")
    next()
}