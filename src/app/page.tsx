import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/server'
import { MapPin, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        PREMIUM NAVBAR 
        Transparent/Blur effect matching the modern aesthetic 
      */}
      <header className="absolute top-0 z-50 w-full transition-all duration-300 bg-transparent text-foreground">
        <div className="container mx-auto flex h-24 items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-serif font-bold tracking-tight">Mavren</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-primary flex items-center gap-1">
              Products <span className="text-xs opacity-50">▼</span>
            </Link>
            <Link href="/services" className="transition-colors hover:text-primary flex items-center gap-1">
              Services <span className="text-xs opacity-50">▼</span>
            </Link>
            <Link href="/collections" className="transition-colors hover:text-primary">
              Collections
            </Link>
            <Link href="/customize" className="transition-colors hover:text-primary">
              Customize
            </Link>
            <Link href="/blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
          </nav>
          
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Log In
            </Link>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 font-semibold shadow-xl shadow-primary/20 flex items-center gap-2">
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 
          HERO SECTION
          Mirroring the reference: large edge-to-edge sofa image with deep amber/brown tones 
          and overlaid typography.
        */}
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-end pb-24 md:pb-32">
          {/* Background Image Container */}
          <div className="absolute inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-6 rounded-[2rem] overflow-hidden bg-muted">
            {/* Fallback gradient if image not loaded, matching the reference's warm amber aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-oak to-brand-walnut mix-blend-multiply opacity-90" />
            
            {/* Mocking the actual image using a styled div to represent the sofa photo */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay" />
            
            {/* Gradient Overlay for text readability at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Hero Content positioned over the image */}
          <div className="container relative z-10 mx-auto px-10 md:px-16 lg:px-24">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex">
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-white/90 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm bg-white/10">
                  Specialized in Space Creation
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] tracking-tight">
                Create spaces that <br /> last a lifetime.
              </h1>
            </div>
          </div>
        </section>

        {/* Features / Testimonials */}
        <section className="py-24 bg-background">
          <div className="container items-center mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Why Choose Us?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div className="flex flex-col items-center space-y-5 group cursor-default">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif">Premium Quality</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  Finest wood selections expertly treated for lasting durability and timeless appeal in any environment.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-5 group cursor-default">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <MapPin className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif">Local Delivery</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  Fast, reliable, and white-glove delivery across all major towns directly to your living room.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-5 group cursor-default">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <ShoppingBag className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif">Affiliate Rewards</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  Earn excellent commissions by promoting our elegant furniture collections to your elite network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview - Modern grid style */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">Collections</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Shop by Category</h2>
              </div>
              <Link href="/products" className="group flex items-center text-primary font-medium hover:text-foreground transition-colors">
                View all categories 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Living Room', img: 'https://images.unsplash.com/photo-1583847268964-b28e5a709c52?auto=format&fit=crop&w=800&q=80' },
                { name: 'Bedroom', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80' },
                { name: 'Office', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
                { name: 'Outdoor', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
              ].map((cat, i) => (
                <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`} className="group relative aspect-[4/5] rounded-3xl overflow-hidden block">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-white mb-0">{cat.name}</h3>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-secondary/5" />
          <div className="container relative mx-auto px-6 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-xl mb-10 lg:mb-0">
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6">Partner with Mavren</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Join our exclusive affiliate program. Share the beauty of artisanal furniture and earn up to 15% commission on every successful referral.
              </p>
              <Link href="/affiliate">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-serif font-bold tracking-tight text-foreground">Mavren</span>
              </Link>
              <p className="text-muted-foreground max-w-sm">
                Crafting exceptional furniture pieces that transform houses into homes. Specialized in oak and dark walnut.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-foreground">Quick Links</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary transition-colors">Shop Catalog</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-foreground">Legal</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/returns" className="hover:text-primary transition-colors">Return Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center md:flex md:justify-between md:text-left text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Mavren Furniture. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4 justify-center">
              <span className="hover:text-foreground cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Pinterest</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

