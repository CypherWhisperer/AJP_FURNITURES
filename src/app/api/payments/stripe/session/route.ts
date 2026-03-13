import { stripe } from '@/assets/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { items, orderId, successUrl, cancelUrl } = await request.json()

    // Transform cart items to Stripe line items
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'kes',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price * 100, // Stripe expects amounts in cents/smallest currency unit
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,
      metadata: {
        orderId: orderId,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe Session Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
