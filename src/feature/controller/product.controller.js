import ProductRepository from "../model/product.repository.js"

export default class ProductController{
    constructor(){
        this.productRepo = new ProductRepository()
    }

    async addProduct(req,res,next){
        try{
            const item = await this.productRepo.addProduct(req.body)
            if(item){
                res.status(201).json({data:item})
            }else{
                res.status(400).send("Operation Failed")
            }        
        }catch(err){
            next(err)
        }
    }

    async getAllProduct(req,res,next){
        try{
            const items = await this.productRepo.getAllProduct();
            if(!items){
                return res.status(404).send("Item not Found")
            }
            res.status(200).json({data:items})
        }catch(err){
            next(err)
        }
    }

    async updateProduct(req,res,next){
        try{
            const id = req.params.id;
            const {number} = req.query;
            const update = await this.productRepo.updateProduct(id,number);
            console.log(update)
            res.status(201).json({
                data: {
                    product: update,
                    message: "updated successfully"
                  }
            })
        }catch(err){
            next(err)
        }
    }

    async deleteProduct(req,res,next){
        try{
            const id = req.params.id;
            const deleted = await this.productRepo.deleteProduct(id)
            res.status(200).json({data: {
                message: "product deleted"
              }})
        }catch(err){
            next(err)
        }
    }
}