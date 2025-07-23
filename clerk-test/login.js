import { Clerk } from '@clerk/clerk-js';

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
clerk.load().then(() => {
  // If already signed in, redirect immediately
  if (clerk.user) {
    window.location.href = '/payment.html';
    return;
  }

  clerk.mountSignIn(document.getElementById('sign-in'));

  // Listen for sign-in and redirect
  clerk.addListener('user', (user) => {
    if (user) {
      window.location.href = '/payment.html';
    }
  });
}); 