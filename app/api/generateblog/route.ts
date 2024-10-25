import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { travelPlans } from '@/lib/db/schema';
import { OpenAI} from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

interface GenerateBlogRequest extends NextApiRequest {
  body: {
    id: number;
    destination: string;
    weather_event: string;
  };
}

export default async function handler(req: GenerateBlogRequest, res: NextApiResponse) {
  const { id, destination, weather_event } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Call OpenAI API to generate the blog content
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a travel blog writer.' },
        { role: 'user', content: `Write a travel blog for a trip to ${destination}. The weather was ${weather_event}.` }
      ],
      max_tokens: 500,
    });

    const blogContent = openaiResponse.choices?.[0]?.message?.content?.trim() ?? '';

    // Update the travel plan with the generated blog content
    await db
      .update(travelPlans)
      .set({ blog: blogContent })
      .where(eq(travelPlans.id, id));

    res.status(200).json({ blog: blogContent });
  } catch (error) {
    console.error('Error generating blog:', error);
    res.status(500).json({ error: 'Error generating blog' });
  }
}
