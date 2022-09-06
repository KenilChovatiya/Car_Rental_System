const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const processPayment = async (req, res, next) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce",
            },
        });
        res
            .status(200)
            .json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

const sendStripeApiKey = async (req, res, next) => {
    try {
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

module.exports = {processPayment, sendStripeApiKey}