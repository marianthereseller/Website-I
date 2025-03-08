const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

async function processOrder(cartItems, userDetails, websiteOrigin) {
    const totalAmount = calculateTotal(cartItems);

    const paymentIntent = await createStripePayment(userDetails, totalAmount, cartItems);
    if (!paymentIntent || paymentIntent.status !== "succeeded") {
        console.error("Payment failed or not confirmed.");
        return;
    }

    console.log(`✅ Payment successful for user ${userDetails.email}`);

    // Notify the correct website
    await sendConfirmation(userDetails.email, websiteOrigin);
}

// Create Stripe PaymentIntent
async function createStripePayment(userDetails, amount, cartItems) {
    try {
        const orderSummary = cartItems.map(item => `${item.quantity}x ${item.name} (${item.price}€)`).join(", ");
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "eur",
            metadata: {
                customer_name: `${userDetails.name} ${userDetails.surname}`,
                email: userDetails.email,
                order_summary: orderSummary
            }
        });

        console.log("✅ PaymentIntent created:", paymentIntent.id);
        return paymentIntent;
    } catch (error) {
        console.error("❌ Stripe PaymentIntent Error:", error);
        return null;
    }
}

// Send confirmation back to the correct website
async function sendConfirmation(userEmail, websiteOrigin) {
    try {
        console.log(`📩 Sending confirmation to ${websiteOrigin} for ${userEmail}`);

        await axios.post(`${websiteOrigin}/notify-user`, {
            userId: userEmail,
            message: "Your payment was successful!"
        });

    } catch (error) {
        console.error("❌ Error sending confirmation:", error.message);
    }
}

// Calculate total price
function calculateTotal(cartItems) {
    return cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
}

module.exports = { processOrder };
