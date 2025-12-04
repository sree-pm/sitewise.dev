"use client";

import { useEffect } from 'react';

declare global {
  interface Window { turnstile?: any }
}

export function Turnstile({ siteKey }: { siteKey: string }) {
  useEffect(() => {
    // Inject Turnstile script once
    if (!document.querySelector('script[data-turnstile]')) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-turnstile', 'true');
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="cf-turnstile" data-sitekey={siteKey} />
  );
}
