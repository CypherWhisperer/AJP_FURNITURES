'use client'

import { Product } from '@/assets/types'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/server'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  // const { addItem } = useCart() // we will build this later
  
  const coverImage = product.product_images?.[0]?.image_url || '/placeholder.png'

  return (
    <Card className={`group overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-primary/50 ${className || ''}`}>
      <Link href={`/products/${product.id}`} className="block relative aspect-square bg-muted/30 overflow-hidden">
        {/* We would use next/image here in real implementation with configured domains */}
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
            {coverImage === '/placeholder.png' ? (
                <span className="text-muted-foreground italic text-sm">Image: {product.name}</span>
            ) : (
                <img src={coverImage} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            )}
        </div>
      </Link>
      <CardHeader className="p-4 pb-2">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors text-lg">
            {product.name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0 mt-auto">
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-foreground">
            KES {product.price.toLocaleString()}
          </span>
          <Button size="sm" variant="secondary" className="h-8 gap-2" onClick={() => {
              // addItem(product)
              alert('Added to cart')
          }}>
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Add</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
