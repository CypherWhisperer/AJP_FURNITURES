import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { Product } from '@/assets/types'
import { Button, Separator } from '@/components/server'
import { QuantitySelector, ColorSwatch } from '@/components/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'

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

  // Mock colors matching reference image if none stored in DB
  const finishOptions = [
    { id: '1', name: 'Oak Light', color: '#DEC8A9' },
    { id: '2', name: 'Oak Natural', color: '#C8A882' },
    { id: '3', name: 'Walnut Warm', color: '#88593F' },
    { id: '4', name: 'Walnut Dark', color: '#3A2E2A' }
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Sleek Header (mocked for consistency) */}
      <header className="w-full border-b border-border bg-white">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center">
             <Image src="/logo.jpg" alt="AJP Furnitures Logo" width={120} height={120} className="w-auto h-10 md:h-12 object-contain" priority />
          </Link>
          <div className="flex gap-4">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">Cart (0)</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 lg:py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT: Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square bg-[#F7F7F7] rounded-3xl overflow-hidden flex items-center justify-center p-12">
              {mainImage === '/placeholder.png' ? (
                <div className="w-full h-full bg-muted-foreground/10 rounded-xl flex items-center justify-center">
                  <span className="text-muted-foreground font-serif text-lg">Product Image</span>
                </div>
              ) : (
                <img src={mainImage} alt={product.name} className="object-contain w-full h-full drop-shadow-2xl mix-blend-multiply" />
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-4">
              {[mainImage, ...images.map((img: any) => img.image_url)].slice(0, 5).map((img, i) => (
                <div key={i} className={`aspect-square rounded-2xl overflow-hidden bg-[#F7F7F7] flex items-center justify-center p-2 cursor-pointer border-2 transition-colors ${i === 0 ? 'border-primary' : 'border-transparent hover:border-border'}`}>
                  {img === '/placeholder.png' ? (
                     <div className="w-full h-full bg-muted-foreground/10" />
                  ) : (
                     <img src={img} alt={`${product.name} view ${i}`} className="object-contain w-full h-full drop-shadow-md mix-blend-multiply" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col pt-4 lg:pt-10 space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif uppercase tracking-wider text-foreground mb-3 leading-snug">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1 text-[#E5A843]">
                  {/* Mock Rating Stars */}
                  {'★★★★★'.split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
                </div>
                <span className="text-sm text-muted-foreground font-medium">| 3 Customer Reviews</span>
              </div>

              <p className="text-2xl font-semibold mb-6">
                ${product.price ? product.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '1,420.24'}
              </p>

              <div className="text-muted-foreground leading-relaxed text-[15px]">
                <p>{product.description || 'Spare and sculptural, this piece is inspired by midcentury design. Its slender, tapered frame melds handcrafted American oak with a distinct, organic curve.'}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
               {/* Client Components */}
               <QuantitySelector value={1} onChange={() => {}} className="h-14 px-2 hover:border-foreground" />
               <Button size="lg" className="h-14 px-12 rounded-full w-full sm:w-auto uppercase tracking-wide text-xs font-bold shadow-xl shadow-primary/20">
                 Add To Cart
               </Button>
            </div>
            
            <div className="pt-2">
               <button className="text-sm font-semibold underline underline-offset-4 hover:text-primary transition-colors">
                 Add Wishlist
               </button>
            </div>

            <Separator className="my-2 bg-border/50" />

            <div className="space-y-4 text-sm">
               <div className="flex gap-2">
                 <span className="text-muted-foreground w-20 font-medium">Categories:</span>
                 <span className="text-foreground underline decoration-1 underline-offset-2">Chairs, Furniture</span>
               </div>
               <div className="flex gap-2">
                 <span className="text-muted-foreground w-20 font-medium">SKU:</span>
                 <span className="text-foreground">D12548</span>
               </div>
            </div>

            <div className="space-y-4 pt-4">
              <span className="text-sm font-semibold italic">Finish Options</span>
              {/* Client Component */}
              <ColorSwatch 
                 options={finishOptions} 
                 selectedId="2"
                 className="gap-4"
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
