const express = require('express');
const router = express.Router();
const { checkout,paymentVerification } = require('../controllers/paymentController');

// Define the route correctly
router.post("/checkout", checkout);
router.post("/payment-verification", paymentVerification);

module.exports = router;