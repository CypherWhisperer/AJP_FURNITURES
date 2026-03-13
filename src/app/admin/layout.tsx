import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/admin')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar Placeholder */}
      <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AJP Admin</span>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2 text-sm font-medium">
          <a href="/admin" className="flex items-center px-3 py-2 text-primary rounded-md bg-muted/50">Dashboard</a>
          <a href="/admin/products" className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-md">Products</a>
          <a href="/admin/orders" className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-md">Orders</a>
          <a href="/admin/affiliates" className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-md">Affiliates</a>
        </nav>
      </aside>
      
      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-card">
          <h2 className="text-lg font-semibold">Admin Configuration</h2>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium">{user.email}</span>
          </div>
        </header>
        <main className="flex-1 p-8 bg-muted/10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
