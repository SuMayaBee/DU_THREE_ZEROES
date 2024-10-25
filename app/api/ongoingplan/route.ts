import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle'; // Your DB setup path
import { travelPlans } from '@/lib/db/schema'; // Schema for travel plans
import type { NextApiRequest, NextApiResponse } from 'next';

// Interface for updating the plan
interface UpdatePlanRequest extends NextApiRequest {
  body: {
    id: number;
  };
}

export default async function handler(req: NextApiRequest | UpdatePlanRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all ongoing (isCompleted = false) plans
    const ongoingPlans = await db
      .select()
      .from(travelPlans)
      .where(eq(travelPlans.isCompleted, false));

    res.status(200).json(ongoingPlans);
  }

  if (req.method === 'PUT') {
    const { id } = req.body as { id: number };

    // Update plan to mark as completed
    await db
      .update(travelPlans)
      .set({ isCompleted: true })
      .where(eq(travelPlans.id, id));
      
    res.status(200).json({ message: 'Plan updated successfully' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body as { id: number };

    // Delete plan based on id
    await db.delete(travelPlans).where(eq(travelPlans.id, id));
    res.status(200).json({ message: 'Plan deleted successfully' });
  }
}
