import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // For demo/client-side only
})

export interface AiSearchResponse {
  message: string
  matched_product_ids: number[]
}

export async function searchProducts(userQuery: string, catalog: any[]): Promise<AiSearchResponse> {
  try {
    const catalogSnippet = catalog.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price
    }))

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful and friendly Simba Supermarket assistant. 
          Analyze the user's request and recommend products from our catalog.
          
          Our Catalog: ${JSON.stringify(catalogSnippet)}
          
          Return your response strictly as a JSON object with two fields:
          1. "message": A short, friendly natural-language response in English (e.g., "I found some great breakfast items for you!").
          2. "matched_product_ids": An array of product IDs from the catalog that best match the query.
          
          If nothing matches, return an empty array for matched_product_ids and a helpful message.`
        },
        {
          role: 'user',
          content: userQuery
        }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }
    })

    const response = JSON.parse(completion.choices[0]?.message?.content || '{}')
    return {
      message: response.message || "Here are some products you might like.",
      matched_product_ids: response.matched_product_ids || []
    }
  } catch (error) {
    console.error('AI Search Error:', error)
    return {
      message: "Sorry, I'm having trouble searching right now. Here's our full catalog.",
      matched_product_ids: []
    }
  }
}
