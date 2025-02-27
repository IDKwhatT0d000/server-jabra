const Razorpay = require("razorpay");
require("dotenv").config();

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
    console.log(req.body);
    res.send("Payment verification endpoint");
};

module.exports = { checkout, paymentVerification };
