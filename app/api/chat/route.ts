import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { searchProducts } from '@/lib/db/products';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

const searchParams = z.object({
    query: z.string(),
});

// Main POST handler for chat
export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('models/gemini-2.5-flash-lite'),
        messages,
        system: `
      You are an AI shopping assistant. Help users find products.
      Use the searchProducts tool when necessary.
      Respond in clean markdown with product cards style formatting.`,
        toolChoice: "auto",
        tools: {
            searchProducts: tool({
                description: "Search products",
                parameters: searchParams,
                execute: async ({ query }: z.infer<typeof searchParams>) => {
                    const products = await searchProducts(query);
                    return products.map(p => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        category: p.category,
                        image: p.image,
                        rating: p.rating,
                        description: p.description,
                    }));
                }
            } as any)
        },
    });

    console.log(result);

    return result.toTextStreamResponse();
}
