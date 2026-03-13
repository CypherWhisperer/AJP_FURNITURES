import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { ProductCard } from '@/components/client'
import { Product } from '@/assets/types'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const supabase = await getSupabaseServer()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*, product_images(image_url)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Our Collection</h1>
        {/* Placeholder for Filters */}
        <div className="text-sm text-muted-foreground">{products?.length || 0} products found</div>
      </div>
      
      {(!products || products.length === 0) ? (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-border">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
