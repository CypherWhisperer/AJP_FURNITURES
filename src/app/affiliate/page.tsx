import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Separator } from '@/components/server'
import { redirect } from 'next/navigation'
import { LinkIcon, TrendingUp, DollarSign, Wallet, LayoutDashboard, Link as LinkLucide, Users, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AffiliateDashboardPage() {
  const supabase = await getSupabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?next=/affiliate')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'affiliate') {
    // Premium join prompt
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center space-y-8">
          <Link href="/" className="inline-block text-3xl font-serif font-bold tracking-tight mb-8">Mavren</Link>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif leading-tight">Join the Mavren Partner Program</h1>
            <p className="text-lg text-muted-foreground">Earn generous commissions by recommending our artisan collections.</p>
          </div>
          
          <div className="bg-[#F7F7F7] p-8 md:p-12 rounded-3xl border border-border mt-12">
            <h2 className="text-xl font-medium mb-2">Ready to curate?</h2>
            <p className="text-sm text-muted-foreground mb-8">By joining, you agree to our Affiliate Terms and Conditions.</p>
            
            <form action={async () => {
              'use server'
              const supabaseAction = await getSupabaseServer()
              const code = `MAV-${user.id.substring(0, 8).toUpperCase()}`
              await supabaseAction.from('users').update({ role: 'affiliate', affiliate_code: code }).eq('id', user.id)
              redirect('/affiliate')
            }}>
              <Button type="submit" size="lg" className="w-full h-14 rounded-full uppercase tracking-wider text-sm font-bold shadow-xl shadow-primary/20">
                Become a Partner
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}?ref=${profile.affiliate_code}`

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-[#F7F7F7]/50 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-border bg-white">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">Mavren</Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-4 mb-4 block">Dashboard</span>
          <Link href="/affiliate" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-primary font-medium shadow-sm border border-border/50">
            <TrendingUp className="w-5 h-5" /> Refer & Earn
          </Link>
          <Link href="/affiliate/links" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors font-medium">
            <LinkLucide className="w-5 h-5" /> My Links
          </Link>
          <Link href="/affiliate/audience" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors font-medium">
            <Users className="w-5 h-5" /> Audience
          </Link>
          
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-4 mt-8 mb-4 block">Settings</span>
          <Link href="/affiliate/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors font-medium">
            <Settings className="w-5 h-5" /> Preferences
          </Link>
        </nav>

        <div className="p-4 mt-auto mb-4">
          <form action={async () => {
              'use server'
              const supabaseAction = await getSupabaseServer()
              await supabaseAction.auth.signOut()
              redirect('/')
            }}>
             <Button variant="outline" className="w-full justify-start text-muted-foreground border-transparent hover:bg-black/5 hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
             </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="lg:hidden h-16 border-b border-border flex items-center px-4 bg-white sticky top-0 z-10">
           <Link href="/" className="text-xl font-serif font-bold tracking-tight">Mavren</Link>
        </header>

        <div className="p-6 lg:p-12 max-w-5xl mx-auto w-full">
          <div className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-2">Refer and Earn</h1>
            <p className="text-muted-foreground">Invite your audience to Mavren and earn up to 5% commission on their first purchase.</p>
          </div>

          <div className="bg-[#F7F7F7] rounded-3xl p-8 lg:p-10 border border-border/50 mb-12 shadow-sm">
            <h2 className="text-xl font-medium mb-4">Your Unique Invite Link</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                value={referralLink} 
                readOnly 
                className="flex-1 h-14 bg-white text-lg font-medium tracking-wide focus:border-transparent focus:ring-0 shadow-sm" 
              />
              <Button size="lg" className="h-14 px-8 rounded-xl shadow-lg shadow-primary/10">
                Copy Link
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col justify-between h-48">
               <div className="space-y-1">
                 <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Wallet className="w-4 h-4"/> Balance</span>
                 <h3 className="text-3xl font-bold font-serif tabular-nums text-foreground">
                   ${(profile.commission_balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </h3>
               </div>
               <Button variant="outline" className="w-full rounded-xl mt-auto">Withdraw</Button>
            </div>
            
            <div className="bg-[#F7F7F7] rounded-3xl p-8 border border-border/50 flex flex-col justify-between h-48">
               <div className="space-y-1">
                 <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4"/> Total Earned</span>
                 <h3 className="text-3xl font-bold font-serif tabular-nums text-foreground">
                   ${((profile.commission_balance || 0) + (profile.withdrawn_balance || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </h3>
               </div>
            </div>

            <div className="bg-[#F7F7F7] rounded-3xl p-8 border border-border/50 flex flex-col justify-between h-48">
               <div className="space-y-1">
                 <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Conversions</span>
                 <h3 className="text-3xl font-bold font-serif tabular-nums text-foreground">
                   24
                 </h3>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
