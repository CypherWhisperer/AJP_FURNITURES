'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/assets/lib/supabase/client'
import { Button, Input, Separator } from '@/components/server'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/products')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col lg:flex-row">
      {/* Left side: Premium Image Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F7F7F7] relative items-center justify-center p-12 overflow-hidden">
        <div className="relative z-10 text-center max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight select-none">Crafted for the modern home.</h2>
          <p className="text-muted-foreground text-lg mb-8 select-none">Sign in to access exclusive artisan collections and track your orders.</p>
        </div>
        
        {/* Abstract decorative elements simulating the rich, dark/amber vibe */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-[#E5A843]/10 mix-blend-multiply pointer-events-none" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-[#3A2E2A]/5 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 xl:px-32">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <Link href="/" className="inline-block mb-10 text-3xl font-serif font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">Mavren</Link>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-[#F7F7F7] border-transparent hover:border-border focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base px-4"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Link href="#" className="text-sm font-medium text-primary hover:text-foreground transition-colors underline-offset-4">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-[#F7F7F7] border-transparent hover:border-border focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base px-4"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            
            <Button type="submit" size="lg" disabled={loading} className="w-full h-14 uppercase tracking-wider text-sm font-bold shadow-xl shadow-primary/20 mt-8 transition-transform hover:-translate-y-0.5">
               {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Separator className="flex-1 bg-border/60" />
            <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">Or</span>
            <Separator className="flex-1 bg-border/60" />
          </div>

          <div className="mt-8">
            <Button variant="outline" size="lg" type="button" className="w-full h-14 bg-transparent border-border/80 hover:bg-[#F7F7F7] font-medium text-foreground transition-all">
              {/* Google G icon */}
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Continue with Google
            </Button>
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
