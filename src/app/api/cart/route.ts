import { redis } from '@/assets/lib/redis'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { userId, productId, quantity } = await request.json()
    
    if (!userId || !productId || quantity === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Capture affiliate cookie if present
    const cookieStore = await cookies()
    const affiliateRef = cookieStore.get('ajp_affiliate_ref')?.value || null

    const key = `cart:${userId}`
    
    // Upstash Redis GET returns the object if it's stored as JSON
    const cart: Record<string, any> = (await redis.get(key)) ?? {}
    
    // Mutate and set with TTL (24 hours) - Store the affiliate ref in the cart object metadata if it was recently added
    const updatedCart = { ...cart, [productId as string]: quantity, _meta: { affiliateRef } }
    
    // If quantity is 0, remove the item
    if (quantity <= 0) {
      delete updatedCart[productId as string]
    }

    await redis.setex(key, 86400, JSON.stringify(updatedCart))

    return NextResponse.json({ success: true, cart: updatedCart })
  } catch (error: any) {
    console.error('Cart API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
