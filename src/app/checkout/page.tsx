'use client'

import { useState } from 'react'
import { useCart } from '@/components/providers'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/server'
import { useRouter } from 'next/navigation'
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total } = useCart()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (items.length === 0) {
      setError('Your cart is empty.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/payments/mpesa/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          amount: total,
          orderId: `ORD-${Date.now()}` // Mock order generation prefix
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate M-Pesa push.')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-muted/20 flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-md text-center space-y-6">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Initiated</h1>
          <p className="text-muted-foreground text-lg">
            Please check your phone ({phone}) and enter your M-Pesa PIN to complete the payment.
          </p>
          <div className="pt-8">
            <Button size="lg" onClick={() => router.push('/orders')}>View Orders</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Return to shop
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Col - Payment Form */}
        <div className="md:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Checkout with M-Pesa</CardTitle>
              <p className="text-muted-foreground text-sm">Fast and secure payment via Safaricom.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">M-Pesa Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="e.g. 0712345678 or 254712345678" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="^(?:254|\+254|0)?(7[0-9]{8}|1[0-9]{8})$"
                    title="Please enter a valid Safaricom number"
                    className="h-12 text-lg"
                  />
                  <p className="text-xs text-muted-foreground">We will send an STK prompt to this device.</p>
                </div>
                
                {error && <div className="text-sm bg-destructive/10 text-destructive p-3 rounded-md border border-destructive/20">{error}</div>}
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-bold" 
                  disabled={loading || items.length === 0}
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    `Pay KES ${total.toLocaleString()}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Col - Order Summary */}
        <div className="md:col-span-5">
          <Card className="sticky top-24 bg-muted/10 border-border">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center">Your cart is empty.</p>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <div className="flex gap-4 items-start">
                        <span className="text-muted-foreground font-medium">{item.quantity}x</span>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="font-bold text-foreground">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-border/50 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">KES {total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
