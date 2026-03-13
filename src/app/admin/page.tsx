import { Card, CardHeader, CardTitle, CardContent } from '@/components/server'
import { DollarSign, ShoppingCart, Users, AlertCircle } from 'lucide-react'
import { getSupabaseServer } from '@/assets/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
  const supabase = await getSupabaseServer()

  // Simple aggregations
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
  const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true })
  
  // Aggregate total sales (sum of 'total' where status is not cancelled/refunded)
  const { data: salesData } = await supabase
    .from('orders')
    .select('total')
    .not('status', 'in', '("cancelled", "refunded")')
    
  const totalSales = salesData?.reduce((sum, order) => sum + Number(order.total), 0) || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground text-lg">Metrics and alerts for AJP Furniture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground text-success font-medium">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orderCount || 0}</div>
            <p className="text-xs text-muted-foreground text-success font-medium">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{userCount || 0}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Errors</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">0</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Needs actual data - keeping placeholder for structure */}
              <div className="flex items-center justify-between text-sm py-2 border-b border-border/50">
                <div>
                  <p className="font-medium">ORD-12345</p>
                  <p className="text-muted-foreground">john@example.com</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">KES 45,000</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Affiliate Payouts Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground border-2 border-dashed border-border rounded-xl">
              <p>No pending withdrawal requests.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
