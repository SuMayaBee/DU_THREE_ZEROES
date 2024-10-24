// components/FAQ.tsx
"use client";
import React, { useState, useRef } from 'react';

const faqs = [
  { question: 'How do I plan my trip?', answer: 'You can start by selecting a destination and building your itinerary.' },
  { question: 'Can I share my trip with others?', answer: 'Yes, you can easily share your trip plan with friends or family.' },
  { question: 'Is this app free?', answer: 'Yes, our basic features are completely free to use.' },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 font-kanit">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 bg-white shadow-md rounded-lg transition-transform transform focus:outline-none"
            >
              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              <span className="text-gray-500">{openIndex === index ? '-' : '+'}</span>
            </button>
            <div
              ref={(el) => (answerRefs.current[index] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
            >
              <div className="p-4 bg-gray-100 rounded-lg mt-2">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
