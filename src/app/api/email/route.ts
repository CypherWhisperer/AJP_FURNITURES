import { resend } from '@/assets/lib/resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { to, orderDetails } = await request.json()

    if (!to || !orderDetails) {
      return NextResponse.json({ error: 'Missing to address or orderDetails' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'orders@ajpfurniture.co.ke',
      to: typeof to === 'string' ? [to] : to,
      subject: `Order confirmed — #${orderDetails.id}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C4763E;">AJP Furniture</h2>
          <h3>Order Confirmation</h3>
          <p>Thank you for your purchase! We have received your order <strong>#${orderDetails.id}</strong>.</p>
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px;">
            <p style="margin: 0; font-size: 18px; font-weight: bold;">Total Paid: KES ${orderDetails.total?.toLocaleString()}</p>
            <p style="margin: 8px 0 0 0; color: #666;">Status: Processing</p>
          </div>
          <p style="margin-top: 24px;">We will notify you once your order is out for delivery.</p>
          <hr style="border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999;">AJP Furniture - Mastering Wood Colour and Design</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ sent: true, data })
  } catch (error: any) {
    console.error('Email sending error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
