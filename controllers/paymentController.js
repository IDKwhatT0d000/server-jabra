const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const Payment = require("../models/paymentModel");
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount*100),
            currency: "INR",
            receipt: "order_rcptid_00",
        };

        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    
      console.log("payment verification :",expectedSignature===razorpay_signature);
  
    if (expectedSignature === razorpay_signature) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  };
  

module.exports = { checkout, paymentVerification };
