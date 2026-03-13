import Link from 'next/link'
import { Button } from '@/components/server'
import { MapPin, ShoppingBag, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar placeholder */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">AJP Furniture</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground">
              Catalog
            </Link>
            <Link href="/affiliate" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Affiliates
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="sm" className="ml-auto flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart (0)
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-20 lg:py-32 border-b border-border">
          <div className="container mx-auto px-4 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Mastering Wood <br />
                <span className="text-primary">Colour and Design</span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                Discover our premium collection of handcrafted Kenyan furniture. Elevate your living space with timeless oak and dark walnut pieces designed for modern comfort.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto">Shop Collection</Button>
                </Link>
                <Link href="/affiliate">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">Become an Affiliate</Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
              <div className="relative w-full aspect-square max-w-md rounded-2xl bg-muted/30 border border-border shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Hero Image Mock */}
                <span className="text-muted-foreground italic">Hero Furniture Image (Oak Table)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Testimonials */}
        <section className="py-16 md:py-24 bg-muted/10">
          <div className="container items-center mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-12">Why Choose AJP?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-xl border border-border shadow-sm">
                <ShieldCheck className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Premium Quality</h3>
                <p className="text-muted-foreground">Finest wood selections expertly treated for lasting durability.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-xl border border-border shadow-sm">
                <MapPin className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Local Delivery</h3>
                <p className="text-muted-foreground">Fast and reliable delivery across all major towns in Kenya.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-xl border border-border shadow-sm">
                <ShoppingBag className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Affiliate Rewards</h3>
                <p className="text-muted-foreground">Earn excellent commission promoting our elegant furniture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
              <Link href="/products" className="text-primary hover:underline font-medium">
                View all categories &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {['Living Room', 'Bedroom', 'Office', 'Outdoor'].map((cat) => (
                <Link key={cat} href={`/products?category=${cat.toLowerCase()}`}>
                  <div className="group relative aspect-square rounded-2xl bg-muted/50 border border-border overflow-hidden cursor-pointer flex items-center justify-center transition-all hover:border-primary">
                    <h3 className="text-lg font-bold z-10 group-hover:text-primary transition-colors">{cat}</h3>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-50 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AJP Furniture. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
