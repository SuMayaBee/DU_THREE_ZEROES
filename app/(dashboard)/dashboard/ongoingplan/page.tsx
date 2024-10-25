"use client"
import { useState, useEffect } from 'react';

interface Plan {
  id: number;
  destination: string;
  date: string;
}

export default function OngoingPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetch('/api/ongoingplan')
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  const handleUpdate = async (id: number) => {
    await fetch('/api/ongoingplan', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/ongoingplan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  };

  return (
    <div>
      <h1>Ongoing Plans</h1>
      {plans.map((plan) => (
        <div key={plan.id}>
          <p>
            {plan.destination} on {plan.date}
          </p>
          <button onClick={() => handleUpdate(plan.id)}>Mark as Completed</button>
          <button onClick={() => handleDelete(plan.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
