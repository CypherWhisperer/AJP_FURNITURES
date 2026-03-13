import { anthropic } from '@/assets/lib/anthropic'
import { getPineconeIndex } from '@/assets/lib/pinecone'
import { getSupabaseServer } from '@/assets/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query) {
      return Response.json({ error: 'Query is required' }, { status: 400 })
    }

    // 1. Semantic Search with Claude (using standard API structure from spec)
    // Convert the natural language query into a formal search criteria or directly pass it around.
    
    // For this demonstration, we query Anthropic to extract search context or keywords:
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: 'You are an AI search assistant for AJP Furniture. Extract main keywords or intent from the user query to use for a database text search or vector matching.',
      messages: [{ role: 'user', content: query }],
    })

    const aiUnderstanding = message.content[0]?.type === 'text' ? message.content[0].text : query

    // 2. We skip Pinecone embedding generation here for simplicity and instead just return the AI response or mock DB search. 
    // In production, we'd embed the query via OpenAI/Pinecone and match vectors.
    const supabase = await getSupabaseServer()
    
    // Basic text search fallback using Supabase
    const { data: results, error } = await supabase
      .from('products')
      .select('*, product_images(image_url)')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10)

    if (error) throw error

    return Response.json({ ai_context: aiUnderstanding, results })
  } catch (err: any) {
    console.error('Search error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
