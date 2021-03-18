import express from "express";
import Product from "../models/productModel";
import {isAdmin, isAuth} from "../util"



const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
 const products = await Product.find({});
 res.setHeader('People', 'Fun');
 return res.status(200).send(products)
});

productRouter.get("/:id", async (req, res) => {
 const product = await Product.findOne({_id: req.params.id});
 if(product){
    res.send(product)
 }else{
     res.status(404).send({message: "Product Not Found"})
 }
});

 productRouter.post("/",isAuth, isAdmin, async (req, res) => {
     console.log(req.user)
     const product = new Product({
         name: req.body.name,
         price: req.body.price,
         image: req.body.image,       
         brand: req.body.brand,
         category: req.body.category,
         countInStock: req.body.countInStock,
         description: req.body.description,
         rating: req.body.rating,
         numReviews: req.body.numReviews,
     })

     const newProduct = await product.save();

     if (newProduct){
        return res.status(201).send({message: "New Product Created", Data: newProduct})
     }
        return res.status(500).send({message: "Error in Creating Porduct."})
       
 })

 productRouter.put("/:id", isAuth, isAdmin, async (req, res) => {
     const ProductId = req.params.id;
     //  const product = await Product.findById(productID)
     const product = await Product.findOne({_id: ProductId});
     if(product){
         product.name = req.body.name;
         product.price = req.body.price;
         product.image = req.body.image;       
         product.brand = req.body.brand;
         product.category = req.body.category;
         product.countInStock = req.body.countInStock;
         product.description = req.body.description;
         const updatedProduct = await product.save()
         if(updatedProduct){
            return res.status(200).send({message: "New Product Updated", Data: updatedProduct})
         }
         
     }
     return res.status(500).send({message: "Error in Updating Porduct."})       
 })

 productRouter.delete("/:id", isAuth, isAdmin, async(req, res) => {
     const productId = req.params.id;
     const deletedProduct = await Product.findById(productId);
     if(deletedProduct){
         await deletedProduct.remove();
         res.send({message: "Product Deleted."})
     }else{
         res.send({message: "Error in Deletion."})
     }
 })

 export default productRouter;







 

