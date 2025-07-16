'use client';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to Next.js Commerce!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            This is a high-performance, SSR storefront powered by Shopify, Next.js, and Vercel.{' '}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className={cn(
                'text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy your own
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}
