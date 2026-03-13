import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/assets/lib/supabase/server'

export async function POST(request: Request) {
  try {
    // Safaricom ALWAYS expects a prompt 200 OK
    const payload = await request.json()
    const stkCallback = payload?.Body?.stkCallback

    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid payload' })
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, CallbackMetadata } = stkCallback

    // Even if an error happens in processing, we should ideally catch and still return 200
    // But we update DB based on success/failure
    
    // In production: store the raw payload first for auditing
    
    const supabase = await getSupabaseServer()

    if (ResultCode === 0) {
      // Payment successful
      const amountItem = CallbackMetadata?.Item.find((i: any) => i.Name === 'Amount')
      const receiptItem = CallbackMetadata?.Item.find((i: any) => i.Name === 'MpesaReceiptNumber')
      
      // Update order status in DB (Assuming we stored the CheckoutRequestID or AccountReference)
      // Here we assume a generic orders table relation
      console.log(`Payment success: ${receiptItem?.Value} for ${amountItem?.Value}`)
      
      // Example update logic
      // await supabase.from('orders').update({ status: 'paid', payment_ref: receiptItem?.Value }).eq('checkout_request_id', CheckoutRequestID)

    } else {
      // Payment Failed or Cancelled
      console.log(`Payment failed for ${CheckoutRequestID}. Code: ${ResultCode}`)
      
      // Example update logic
      // await supabase.from('orders').update({ status: 'cancelled', payment_ref: 'failed' }).eq('checkout_request_id', CheckoutRequestID)
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (error) {
    console.error('M-Pesa Callback Error:', error)
    // ALWAYS return 200 OK so Safaricom stops retrying, even on our exception
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted (with internal error)' })
  }
}
