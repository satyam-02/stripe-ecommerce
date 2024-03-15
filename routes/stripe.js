const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(bodyParser.json());

const router = express.Router();

router.post("/payment",(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})

module.exports=router