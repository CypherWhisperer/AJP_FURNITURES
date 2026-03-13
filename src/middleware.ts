import { updateSession } from '@/assets/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Check for affiliate referral link parameter
  const refCode = request.nextUrl.searchParams.get('ref')
  
  // 2. Perform the standard Supabase session update
  const response = await updateSession(request)

  // 3. If there is a referral code, attach it as a cookie lasting for 30 days
  if (refCode) {
    response.cookies.set('ajp_affiliate_ref', refCode, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
