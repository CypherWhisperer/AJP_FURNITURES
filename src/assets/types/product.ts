export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  category_id: string | null
  affiliate_commission_type: 'percentage' | 'fixed' | null
  affiliate_commission_value: number | null
  created_at: string
  product_images?: ProductImage[]
}
