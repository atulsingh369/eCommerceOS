import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { searchProducts } from '@/lib/db/products';

// Initialize Google AI with the API key from firebase config (or env var)
// Note: Hardcoding strictly for this demo environment as requested.
// Ideally use process.env.GOOGLE_GENERATIVE_AI_API_KEY
const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBDVmQORbns-oQ1RCgycl0sHEEqa-Qk2zU",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('models/gemini-1.5-pro-latest'), // or gemini-pro
        messages,
        system: `You are a helpful AI shopping assistant for a premium e-commerce store. 
    You can search for products, answer questions about available items, and help customers find what they need.
    Refuse to answer questions not related to shopping, products, or the store.
    Always be polite, concise, and helpful. Use markdown to format products nicely.`,
        tools: {
            searchProducts: tool({
                description: 'Search for products by name, description, or category',
                parameters: z.object({
                    query: z.string().describe('The search query'),
                }),
                // @ts-expect-error tool signature mismatch in v5
                execute: async ({ query }: { query: string }) => {
                    const products = await searchProducts(query);
                    return products;
                },
            }),
        },
    });

    return result.toTextStreamResponse();
}
