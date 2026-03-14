import { Button, Separator } from '@/components/server'
import { QuantitySelector } from '@/components/client'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

export const metadata = {
  title: 'Your Cart - Mavren',
  description: 'Review items in your cart.',
}

// Mock cart items mapping to the Arno/Mavren visual style
const mockCartItems = [
  {
    id: '1',
    name: 'Arno Fabric Dining Chair',
    image: '/placeholder.png', // Replace naturally when DB hooked up
    price: 1420.24,
    quantity: 1,
    finish: 'Oak Natural',
  },
  {
    id: '2',
    name: 'Mesa Round Dining Table',
    image: '/placeholder.png',
    price: 3200.00,
    quantity: 1,
    finish: 'Walnut Dark',
  }
]

export default function CartPage() {
  const subtotal = mockCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 150.00 // Mock flat rate
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Sleek Header */}
      <header className="w-full border-b border-border bg-white">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">Mavren</Link>
          <div className="flex gap-4">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link href="/cart" className="text-sm font-medium text-primary transition-colors">Cart ({mockCartItems.length})</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 lg:py-24 max-w-6xl">
        <h1 className="text-3xl lg:text-4xl font-serif tracking-wide text-foreground mb-12">
          Review Your Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="flex-1 space-y-8">
            {mockCartItems.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center bg-[#F7F7F7] rounded-3xl">
                <p className="text-muted-foreground mb-6 font-medium">Your cart is currently empty.</p>
                <Link href="/products">
                  <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              mockCartItems.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <Separator className="my-8 bg-border/40" />}
                  <div className="flex gap-6 lg:gap-10">
                    {/* Item Image */}
                    <div className="w-32 h-32 lg:w-48 lg:h-48 bg-[#F7F7F7] rounded-2xl flex items-center justify-center p-4 flex-shrink-0">
                      {item.image === '/placeholder.png' ? (
                        <div className="w-full h-full bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                           <span className="text-xs text-muted-foreground font-medium">Image</span>
                        </div>
                      ) : (
                         <Image src={item.image} alt={item.name} width={200} height={200} className="object-contain w-full h-full mix-blend-multiply" />
                      )}
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col py-2">
                       <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg lg:text-xl font-serif font-medium text-foreground pr-4">
                           {item.name}
                         </h3>
                         <button className="text-muted-foreground hover:text-destructive transition-colors p-2 -mr-2 -mt-2">
                           <Trash2 className="w-5 h-5" />
                           <span className="sr-only">Remove item</span>
                         </button>
                       </div>
                       
                       <p className="text-sm text-muted-foreground mb-auto">
                         Finish: {item.finish}
                       </p>

                       <div className="flex items-end justify-between mt-6">
                         <QuantitySelector value={item.quantity} onChange={() => {}} className="h-10 px-2 max-w-[120px]" />
                         <span className="text-lg font-semibold tabular-nums">
                           ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                         </span>
                       </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {mockCartItems.length > 0 && (
            <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="bg-[#F7F7F7] rounded-3xl p-8 sticky top-8 border border-border/40 space-y-6">
                <h2 className="text-xl font-serif font-medium">Order Summary</h2>
                
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="tabular-nums">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping (Flat Rate)</span>
                    <span className="tabular-nums">${shipping.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-muted-foreground italic text-xs">Calculated at checkout</span>
                  </div>
                </div>

                <Separator className="my-6 bg-border/60" />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <Button size="lg" className="w-full h-14 rounded-full uppercase tracking-widest text-xs font-bold shadow-xl shadow-primary/20 mt-4">
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-center text-muted-foreground pt-4 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Secure SSL Checkout
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
