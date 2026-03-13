import { getMpesaToken, MPESA_CONFIG } from '@/assets/lib/mpesa'
import { getSupabaseServer } from '@/assets/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { phone, amount, orderId } = await request.json()
    
    // Normalize phone number to 2547XXXXXXXX
    let formattedPhone = phone.replace(/[^0-9]/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = `254${formattedPhone.substring(1)}`
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1)
    }

    const token = await getMpesaToken()

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
    const password = Buffer.from(
      `${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`
    ).toString('base64')

    const res = await fetch(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: MPESA_CONFIG.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: Math.ceil(Number(amount)),
          PartyA: formattedPhone,
          PartyB: MPESA_CONFIG.shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: MPESA_CONFIG.callbackUrl,
          AccountReference: orderId || 'AJP_FURNITURE',
          TransactionDesc: 'Order payment',
        }),
      }
    )

    const data = await res.json()

    if (data.ResponseCode !== '0') {
      return NextResponse.json({ error: data.errorMessage || 'M-Pesa request failed' }, { status: 400 })
    }

    return NextResponse.json({ success: true, MerchantRequestID: data.MerchantRequestID, CheckoutRequestID: data.CheckoutRequestID })
  } catch (error: any) {
    console.error('M-Pesa Initiate Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
