const express=require('express');
const app=express();
const Razorpay = require('razorpay');
const cors=require('cors');
require('dotenv').config();

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


const port= process.env.PORT ||  3000;    


app.post('/order',async(req,res)=>{
    console.log(req.body);
    try{
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,      
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const options=req.body;
        const order=await razorpay.orders.create(options);
        res.json(order);
    } catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
})
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
}); 