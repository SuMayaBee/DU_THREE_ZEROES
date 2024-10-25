import { db } from '@/lib/db/drizzle'; // Your DB setup path
import { travelPlans } from '@/lib/db/schema'; // Your schema path
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CreatePlanRequest extends NextApiRequest {
  body: {
    destination: string;
    date: string;
  };
}

export default async function handler(req: CreatePlanRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { destination, date } = req.body;
    console.log('destination:', destination);

    try {
      // Fetch weather data from OpenWeatherMap
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=2ceb1d1d25f71b5a01659409eacf60c7`
      );
      const weatherEvent = weatherResponse.data.weather[0].description;

      // Check if the date is in the past
      const isCompleted = new Date(date) < new Date();

      // Correctly inserting a travel plan using Drizzle ORM
      await db.insert(travelPlans).values({
        destination,
        date, // Ensure the date is a valid string
        isCompleted, // Use the correct column name from your schema
        weather_event: weatherEvent,
        blog: '', // Blog is initially empty
        user_id: 1, // Replace with the actual userId from session or auth
      });

      res.status(200).json({ message: 'Plan created successfully!' });
    } catch (error) {
      console.error('Error fetching weather or saving plan:', error);
      res.status(500).json({ error: 'Error fetching weather or saving plan' });
    }
  } else {
    res.status(405).json({ message: 'Only POST method is allowed' });
  }
}
