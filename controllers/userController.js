const User=require('../models/user')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async  (req, res) => {
    const{username,email,password}=req.body;
    if(!username||!email||!password){
      res.status(400);
      throw new Error("All fields are mandatory")
    } 
    const userAvailable=await User.findOne({email});
    if(userAvailable){
      res.status(400);
      throw new Error("User exists")
    }
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed password:",hashedPassword)
       res.status(200).json({message:"Register the user"});
       const user=await User.create({
        username,
        email,
        password:hashedPassword
       })
  
    console.log(`user created ${user}`)
  
    if(user){
      res.status(201).json({_id:user.id,email:user.email});
    }
  
    else{
      res.status(400);
      throw new ErrorEvent("User data is not valid")
    }
  
     })


  const loginUser=asyncHandler(async(req,res)=>{
     const {email,password}=req.body;
     if(!email||!password) {
      res.status(400);
      throw new Error('All fields are mandatory');
     }

     const user=await User.findOne({email});
     if(user&&(await bcrypt.compare(password,user.password))){
       const accessToken=jwt.sign({
         user:{
           username:user.username,
           email:user.email,
           id:user.id
         }
       },process.env.ACCESS_TOKEN_SECRET)
     
       res.status(200).json({accessToken});
     }else{
       res.status(401);
       throw new Error("email or password is not valid")
     }
  })


  const updateUser = asyncHandler(async  (req,res)=>{
    const contact=await User.findById(req.params.id);
    if(!contact){
      res.status(404);
      throw new Error("Contact not found")
    }
    
    if(contact.id.toString()!==req.user.id){
      res.status(403);
      throw new Error("User dont have permission")
    }
  
    const updatedContact=await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )
    res.status(200).json(updatedContact);
  })


  const deleteUser = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    
    if(contact.id.toString()!==req.user.id){
      res.status(403);
      throw new Error("User dont have permission")
    }
    await contact.deleteOne();  // Use remove() method on the Mongoose document
    res.status(200).json({ message: "Contact deleted successfully" });
  });
  

module.exports={
  registerUser,
  updateUser,
  loginUser,
  deleteUser
}