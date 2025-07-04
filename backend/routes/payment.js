const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { products, user, cargoFee } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  if (cargoFee !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Hızlı Kargo",
        },
    unit_amount: Math.round(cargoFee * 100),
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
    success_url: `${process.env.CLIENT_DOMAIN}/success`,
    cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`,

    });

    res.status(200).json({ id: session.id });
 } catch (error) {
  console.error("Stripe Checkout Error:", error); // <-- Detaylı log
  res.status(500).json({ error: error.message }); // <-- Hata mesajını döndür
}
});

module.exports = router;
