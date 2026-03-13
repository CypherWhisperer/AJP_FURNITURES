export const MPESA_CONFIG = {
  shortcode: process.env.MPESA_SHORTCODE || '',
  passkey: process.env.MPESA_PASSKEY || '',
  consumerKey: process.env.MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
  callbackUrl: process.env.MPESA_CALLBACK_URL || '',
  // Use sandbox for testing
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke',
}

export async function getMpesaToken(): Promise<string> {
  const credentials = Buffer.from(
    `${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`
  ).toString('base64')

  const res = await fetch(
    `${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      next: { revalidate: 3500 }, // token is valid for 1 hour, reuse for ~58 minutes
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch M-Pesa token')
  }

  const data = await res.json()
  return data.access_token
}
