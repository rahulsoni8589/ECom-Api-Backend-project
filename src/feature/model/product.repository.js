import { CustomErrorhandler } from "../../errorhandler/errorhandler.js";
import productModel from "./product.schema.js";

export default class ProductRepository{
    
    async addProduct(data){
        try{
            const{name,quantity} = data;
            if(!name){
                throw new CustomErrorhandler(400,"Name is required")
            }
            if(!quantity){
                throw new CustomErrorhandler(400, "Quantity is required")
            }
            const newItem = await new productModel({name,quantity}).save()
            console.log(newItem)
            return newItem
        }catch(err){
        console.log(err)
        if (err instanceof mongoose.Error.ValidationError){
            throw err
        }else{
            throw new CustomErrorhandler("Something went wrong", 500)
        }
    }
    }

    async getAllProduct(req,res,next){
        try{
            const items = await productModel.find();
            console.log(items)
            return items
        }catch(err){
            throw new Error(err)
        }
        
    }

    async updateProduct(id,number){ 
        try{
            const data = await productModel.findById(id)
            console.log(data)
            if(!data){
                throw new CustomErrorhandler(404, "Item not found")
            }
            data.quantity+=Number(number);
            await data.save()
            return await productModel.findById(id)
        }catch(err){
            throw new Error(err)
        }

    }

    async deleteProduct(id){
        try{
            const data = await productModel.findByIdAndDelete(id)
            console.log(data)
            if(data == null){
                throw new CustomErrorhandler(404,"Item not found")
            }
            return data
        }catch(err){
            throw new Error(err)
        }

    }
}