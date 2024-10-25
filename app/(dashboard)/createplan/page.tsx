"use client";

import { useState } from 'react';

export default function CreatePlan() {
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/createplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, date }),
      });

      if (res.ok) {
        alert('Plan created successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Error creating plan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Create Plan</button>
    </form>
  );
}
