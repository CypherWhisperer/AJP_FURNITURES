import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { Product } from '@/assets/types'
import { Button } from '@/components/server'
import { notFound } from 'next/navigation'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const supabase = await getSupabaseServer()
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_images(image_url)')
    .eq('id', slug)
    .single()

  if (error || !product) {
    notFound()
  }

  const images = product.product_images || []
  const mainImage = images[0]?.image_url || '/placeholder.png'

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to catalog
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/40 rounded-2xl border border-border overflow-hidden flex items-center justify-center relative">
            {mainImage === '/placeholder.png' ? (
              <span className="text-muted-foreground italic">Product Image</span>
            ) : (
              <img src={mainImage} alt={product.name} className="object-cover w-full h-full" />
            )}
            {product.stock === 0 && (
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                Out of Stock
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img: any, i: number) => (
                <div key={i} className="w-24 h-24 flex-shrink-0 bg-muted/40 rounded-xl border border-border overflow-hidden">
                  <img src={img.image_url} alt={`${product.name} ${i}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-primary mb-6">
            KES {product.price.toLocaleString()}
          </p>

          <div className="prose prose-sm sm:prose-base dark:prose-invert text-muted-foreground mb-8 flex-1">
            <p>{product.description || 'No description provided.'}</p>
          </div>

          <div className="space-y-6 pt-6 border-t border-border mt-auto">
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-1 text-lg h-14" disabled={product.stock === 0}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-sm text-warning font-medium">
                Only {product.stock} left in stock - order soon.
              </p>
            )}
            <div className="text-sm text-muted-foreground pt-4 flex flex-col gap-2">
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Premium Quality Guarantee</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Nationwide Delivery Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
  )
}

function MapPin(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
}
