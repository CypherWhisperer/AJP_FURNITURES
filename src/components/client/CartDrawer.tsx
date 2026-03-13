'use client'

import { useCart } from '@/components/providers'
import { Button } from '@/components/server'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export function CartDrawer() {
  const { items, total, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Your Cart
          </h2>
          <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)} className="h-8 w-8 p-0 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline">Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-2 rounded-xl border border-transparent hover:border-border transition-colors">
                <div className="w-20 h-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/40 text-muted-foreground text-xs p-2 text-center">No Image</div>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-primary font-bold text-sm mt-1">KES {item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center border border-border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm px-2 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-xs text-destructive hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">KES {total.toLocaleString()}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
              <Button className="w-full" size="lg">Secure Checkout</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
