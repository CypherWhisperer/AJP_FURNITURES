import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia' as any, // Suppress TS error for mismatched exact string literal
  appInfo: {
    name: 'AJP Furniture',
    version: '1.0.0',
  },
})
