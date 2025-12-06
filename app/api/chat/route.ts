import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText, tool } from 'ai';
import { z } from 'zod';
import { getProductById, Product, searchProducts } from '@/lib/db/products';

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
        model: google("gemini-2.5-flash"),
        messages: convertToModelMessages(messages),
        system: `
You are an AI shopping assistant.

When the user asks about a product, ALWAYS call the searchProducts tool.
FIRST, you MUST extract only the key product name or keyword from the user's message.

ALWAYS call searchProducts with a single short keyword string, never undefined.
Example tool call: { "query": "watch" }

If the user mentions extra words like "best", "price", "show me", or "can you", IGNORE them and extract only the actual product name.
Never call the tool with undefined, empty string, or full sentence text.

If there is nothing to search for, say: "Please specify a product name."
Do NOT answer with product lists yourself — only send the tool call when needed.
`,
        toolChoice: "auto",
        tools: {
            searchProducts: tool({
                description: "Search products",
                parameters: searchParams,
                execute: async ({ query }: z.infer<typeof searchParams>) => {
                    console.log("TOOL RECEIVED QUERY:", query);
                    if (!query || !query.trim()) {
                        return { products: [], message: "Please specify a product name." };
                    }
                    const products = await searchProducts(query);

                    if (!products.length) {
                        return { products: [], message: "No products found" };
                    }

                    const result = products.map((p: Product) => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        category: p.category,
                        rating: p.rating,
                        features: p.features,
                        isNew: p.isNew,
                        reviews: p.reviews,
                        description: p.description,
                        image: p.image,
                    }));

                    return {
                        products: result,
                        message: `Found ${result.length} result(s).`
                    };
                },
            } as any),

            // similarProducts: tool({
            //     description: "Find similar products based on category or price range",
            //     parameters: z.object({
            //         id: z.string(),
            //     }),
            //     execute: async ({ id }) => {
            //         const product = await getProductById(id);
            //         if (!product) return { products: [] };

            //         const all = await getAllProducts();
            //         const filtered = all.filter(
            //             (p) =>
            //                 p.id !== id &&
            //                 (p.category === product.category ||
            //                     p.name.toLowerCase().includes(product.name.split(" ")[1]?.toLowerCase()))
            //         );

            //         return { products: filtered.slice(0, 6) };
            //     },
            // })
        },
    });

    return result.toUIMessageStreamResponse();
}
