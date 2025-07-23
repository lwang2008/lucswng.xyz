import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RnwkJIcPvYDbUUGRCKiaJbZmLFQ9qt91QIFISRYneSEJIs50YwnPuiiQJb2WZ3qxtdOdPujUaw8EAwLnZiTVmpX00fQSbmIKp');

document.getElementById('payBtn').addEventListener('click', async () => {
  const response = await fetch('/api/create-checkout-session', { method: 'POST' });
  const session = await response.json();
  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: session.id });
}); 