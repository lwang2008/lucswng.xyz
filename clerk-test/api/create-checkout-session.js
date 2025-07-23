import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RnwrLIcPvYDbUUGHLXGPNMM', // Provided Stripe Price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://test.lucswng.xyz/success.html',
      cancel_url: 'https://test.lucswng.xyz/cancel.html',
    });
    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 