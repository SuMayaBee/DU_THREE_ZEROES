"use client"
import { useState, useEffect } from 'react';

interface Plan {
  id: number;
  destination: string;
  date: string;
  blog: string | null;
}

export default function CompletedPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<number | null>(null);

  // Fetch completed plans on page load
  useEffect(() => {
    fetch('/api/completedplan')
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error('Error fetching completed plans:', err));
  }, []);

  const handleGenerateBlog = async (plan: Plan) => {
    setLoading(plan.id); // Set the loading state to the current plan id
    const response = await fetch('/api/generateblog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: plan.id,
        destination: plan.destination,
        weather_event: '', // Add the weather event if needed
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Update the blog for the specific plan
      setPlans((prevPlans) =>
        prevPlans.map((p) =>
          p.id === plan.id ? { ...p, blog: data.blog } : p
        )
      );
    } else {
      console.error('Error generating blog:', data.error);
    }

    setLoading(null); // Clear the loading state
  };

  return (
    <div className="container">
      <h1>Completed Travel Plans</h1>

      {plans.length === 0 ? (
        <p>No completed plans found.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan.id} className="plan-item">
            <p>
              <strong>Destination:</strong> {plan.destination}
              <br />
              <strong>Date:</strong> {plan.date}
            </p>

            {!plan.blog ? (
              <button
                onClick={() => handleGenerateBlog(plan)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? 'Generating Blog...' : 'Generate Blog'}
              </button>
            ) : (
              <button
                onClick={() =>
                  window.alert(`Blog for ${plan.destination}: ${plan.blog}`)
                }
              >
                View Blog
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
