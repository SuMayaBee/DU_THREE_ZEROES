import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { travelPlans } from '@/lib/db/schema';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all completed (isCompleted = true) plans
      const completedPlans = await db
        .select()
        .from(travelPlans)
        .where(eq(travelPlans.isCompleted, true));

      // Always return a JSON response, even if it's an empty array
      res.status(200).json(completedPlans || []);
    } catch (error) {
      console.error('Error fetching completed plans:', error);
      res.status(500).json({ error: 'Failed to fetch completed plans' });
    }
  } else {
    res.status(405).json({ message: 'Only GET method is allowed' });
  }
}
