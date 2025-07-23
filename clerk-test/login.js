import { Clerk } from '@clerk/clerk-js';

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('redirect_url') || '/payment.html';
}

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

clerk.load().then(() => {
  if (clerk.user) {
    window.location.href = getRedirectUrl();
    return;
  }

  clerk.mountSignIn(document.getElementById('sign-in'));

  clerk.addListener('user', (user) => {
    if (user) {
      window.location.href = getRedirectUrl();
    }
  });
});

window.addEventListener('DOMContentLoaded', async () => {
  await clerk.load();
  if (clerk.user) {
    window.location.href = getRedirectUrl();
  }
}); 