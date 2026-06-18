import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(request) {
  try {
    const { message, lang } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "To chat with me, please add your GROQ_API_KEY to the .env.local file! You can get one from console.groq.com.",
        products: []
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Fetch all products to give context to the LLM
    await dbConnect();
    const allProducts = await Product.find({}).lean();
    
    // Create context string
    const productContext = allProducts.map(p => {
      if (lang === 'ja') {
        const yenPrice = Math.round(p.price * 1.8);
        return `- ${p.nameJa || p.name} (${p.stateName}産, ${p.category}, ¥${yenPrice}): ${p.descriptionJa || p.description}`;
      }
      return `- ${p.name} (from ${p.stateName}, ${p.category}, Rs ${p.price}): ${p.description}`;
    }).join('\n');

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a friendly, helpful South Indian food expert chatbot for a website called "Southern Cravings".
Your goal is to recommend products from our catalog, answer questions about South Indian snacks/sweets, and be polite.
Keep your answers short, friendly, and use emojis. Do not invent products that aren't in the catalog.

If the user asks for a product or category we do NOT have, politely and respectfully apologize, and immediately suggest 2-3 similar products from our catalog that they might like instead to encourage them to try something new.

Here is the complete catalog of products we sell:
${productContext}

IMPORTANT: The user has selected the ${lang === 'ja' ? 'Japanese' : 'English'} language. You MUST reply entirely in ${lang === 'ja' ? 'Japanese' : 'English'}.
Reply directly to the user as the chatbot. If they ask for a recommendation or specific item, mention it naturally.`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const replyText = chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";

    // Try to find if any products were mentioned so we can show cards
    const mentionedProducts = allProducts.filter(p => {
      const nameMatch = replyText.toLowerCase().includes(p.name.toLowerCase());
      const jaNameMatch = p.nameJa && replyText.includes(p.nameJa);
      return nameMatch || jaNameMatch;
    });
    // Take up to 3 products to show
    const productsToShow = mentionedProducts.slice(0, 3);

    return NextResponse.json({
      reply: replyText,
      products: productsToShow
    });
  } catch (error) {
    console.error('Chat error details:', error);
    return NextResponse.json({
      reply: `I'm having trouble connecting to my brain. Error details: ${error.message || 'Unknown error'}. Please check your GROQ_API_KEY.`,
      products: []
    }, { status: 500 });
  }
}
