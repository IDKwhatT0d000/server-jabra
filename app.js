const express=require('express');
const cors=require('cors');
require('dotenv').config();
const router=require('./routes/paymentRouter');

const app=express();


//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use('/',router); //use the router

module.exports = app;