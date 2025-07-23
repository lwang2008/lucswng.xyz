import { loadStripe } from '@stripe/stripe-js';
import { Clerk } from '@clerk/clerk-js';

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

clerk.load().then(() => {
  if (!clerk.user) {
    window.location.href = 'login.html?redirect_url=/payment.html';
    return;
  }
  // Show the payment button if authenticated
  document.getElementById('payBtn').style.display = 'block';
});

const stripePromise = loadStripe('pk_test_51RnwkJIcPvYDbUUGRCKiaJbZmLFQ9qt91QIFISRYneSEJIs50YwnPuiiQJb2WZ3qxtdOdPujUaw8EAwLnZiTVmpX00fQSbmIKp');

document.getElementById('payBtn').addEventListener('click', async () => {
  const response = await fetch('/api/create-checkout-session', { method: 'POST' });
  const session = await response.json();
  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: session.id });
}); 