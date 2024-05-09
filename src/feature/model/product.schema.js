import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:[true, "Pls enter name of the product"], 
        minLength:[3,"Name must be minimum three Character"]
    },
    quantity:
    {
        type:Number, 
        required:[true, "Pls enter quantity of product"], 
        validate:
        {
            validator:function(item){
                return item>=0 && item<=100
            },
            message:"Quantity should be between 0 to 100"
        }
    }
})


const productModel = mongoose.model("Product", productSchema)
export default productModel