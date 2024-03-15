import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import { useState,useEffect } from 'react';
const KEY="pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"

function Pay() {

    const [stripeToken,setStripeToken]=useState(null)

    const onToken=(token)=>{
       setStripeToken(token)
    }

    useEffect(()=>{
        const makeRequest=async()=>{
            try{
                const res=await axios.post("http://localhost:5000/api/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:2000
                }
                );

                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        stripeToken&&makeRequest()
    },[stripeToken])
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Set height to fill the viewport
    }}
  >


  <StripeCheckout
   name="SG shop"
   image="https://avatars.githubusercontent.com/u/1486366?v=4"
   billingAddress
   shippingAddress
   description='Your total is $20'
   amount={2000}
   token={onToken}
   stripeKey={KEY}
   >
  <button className="pay-now-button">
      Pay Now
    </button>
  </StripeCheckout>
   
  </div>
  );
}

export default Pay;