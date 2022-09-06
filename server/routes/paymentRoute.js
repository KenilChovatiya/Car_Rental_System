const express = require("express");
const {
  processPayment,
  sendStripeApiKey
} = require("../controller/paymentController");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");

router.post("/payment/process", authUser, processPayment);
router.get("/stripeapikey", authUser, sendStripeApiKey);

module.exports = router;