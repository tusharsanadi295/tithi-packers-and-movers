import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-sky-600 transition-colors"
      >
        <span className="text-lg font-bold text-slate-800">{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "How early should I book Tithi Packers & Movers?",
      answer: "We recommend booking at least 3-5 days in advance for local moves and 7-10 days for inter-city shifting. This helps us ensure the best vehicle and team availability for your specific date."
    },
    {
      question: "Do you provide insurance for my household items?",
      answer: "Yes, we offer transit insurance options to protect your goods against unforeseen accidents or natural calamities during the moving process. Our team will explain the coverage details during the survey."
    },
    {
      question: "What items are not allowed to be loaded on the truck?",
      answer: "For safety reasons, we do not transport flammable items (petrol, diesel, gas cylinders), explosives, jewelry, cash, or perishable food items. We suggest you carry personal documents and valuables yourself."
    },
    {
      question: "How do you calculate the moving cost?",
      answer: "Our pricing depends on several factors: the volume of goods, the distance between locations, the floor number at both ends (lift availability), and the type of packing materials required (Standard vs. Premium)."
    },
    {
      question: "Will you dismantle and reassemble my furniture?",
      answer: "Absolutely! Our trained team handles the dismantling of beds, wardrobes, and dining tables at the source and reassembles them at your new home as part of our standard service."
    },
    {
      question: "Is there an extra charge for weekend moves?",
      answer: "While we operate 365 days a year, weekends and month-ends are highly busy. We recommend booking early to avoid peak-day surcharges that may apply during these periods."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-sky-600 font-black uppercase tracking-widest text-sm mb-3">Support Center</h2>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-500">Everything you need to know about shifting with Tithi Packers & Movers.</p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-sky-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-6 opacity-90">Our moving experts are available 24/7 to help you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+918160081145" className="bg-white text-sky-600 px-8 py-3 rounded-xl font-black hover:bg-slate-100 transition-all no-underline">
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;