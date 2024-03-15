const Product=require('../models/product')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async  (req, res) => {
    const{title,desc,img,categories,size,color,price}=req.body;

       res.status(200).json({message:"Created the product"});
       const product=await Product.create({
        user_id:req.user.id,
        title,
        desc,
        img,
        categories,
        size,
        color,
        price,
       
       })
  
    console.log(`user created ${product}`)
  
    if(product){
      res.status(201).json({_id:product.id,title:product.title});
    }
  
    else{
      res.status(400);
      throw new ErrorEvent("Product data is not valid")
    }
  
     })


//   const updateUser = asyncHandler(async  (req,res)=>{
//     const contact=await User.findById(req.params.id);
//     if(!contact){
//       res.status(404);
//       throw new Error("Contact not found")
//     }
    
//     if(contact.id.toString()!==req.user.id){
//       res.status(403);
//       throw new Error("User dont have permission")
//     }
  
//     const updatedContact=await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true}
//     )
//     res.status(200).json(updatedContact);
//   })


  const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      res.status(404);
      throw new Error("Contact not found");
    }
    
    if(product.user_id.toString()!==req.user.id){
      res.status(403);
      throw new Error("User dont have permission")
    }

    await product.deleteOne();  // Use remove() method on the Mongoose document
    res.status(200).json({ message: "Product deleted successfully" });
  });
  

module.exports={
  createProduct,
//   updateUser,
//   loginUser,
     deleteProduct
}