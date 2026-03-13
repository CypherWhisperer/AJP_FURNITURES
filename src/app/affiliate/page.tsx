import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/server'
import { redirect } from 'next/navigation'
import { LinkIcon, TrendingUp, DollarSign, Wallet } from 'lucide-react'

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
    // Show become an affiliate page
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">AJP Affiliate Partner Program</h1>
        <p className="text-xl text-muted-foreground mb-12">Earn generous commissions by promoting Kenya's finest wooden furniture to your audience.</p>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Join the Program</CardTitle>
          </CardHeader>
          <CardContent>
            {/* In a real app we'd trigger an action or application form */}
            <p className="text-sm text-center mb-6 text-muted-foreground">
              By joining, you agree to our Affiliate Terms and Conditions.
            </p>
            <form action={async () => {
              'use server'
              const supabaseAction = await getSupabaseServer()
              // Auto-approve for hackathon demonstration purposes
              const code = `AJP-${user.id.substring(0, 8).toUpperCase()}`
              await supabaseAction.from('users').update({ role: 'affiliate', affiliate_code: code }).eq('id', user.id)
              redirect('/affiliate')
            }}>
              <Button type="submit" size="lg" className="w-full">Become an Affiliate Now</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}?ref=${profile.affiliate_code}`

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Affiliate Dashboard</h1>
        <Button variant="outline">Request Withdrawal</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+14% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {profile.commission_balance?.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available to Withdraw</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">KES {profile.withdrawable_balance?.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input value={referralLink} readOnly className="flex-1 bg-muted/50" />
            <Button className="shrink-0">
              <LinkIcon className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Share this link on your social media, blog, or with friends. Visitors who purchase after clicking this link will earn you a commission based on the product.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function ShoppingBagIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  )
}
