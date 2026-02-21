import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: "I am from a non-CS branch (Mech/Civil). Can I join?", 
      a: "Absolutely! Blockchain is an interdisciplinary field. We need people who understand economics, governance, and logic just as much as coders. We have a specific 'Beginner Track' to help you get started." 
    },
    { 
      q: "Will I get Activity Points / Attendance for events?", 
      a: "Yes. For all major workshops and hackathons, we provide official participation certificates which can be used to claim college activity points. Attendance is provided for approved full-day events." 
    },
    { 
      q: "What is Blockchain?", 
      a: "A blockchain is a distributed ledger with growing lists of records (blocks) that are securely linked together via cryptographic hashes. " 
    },
    { 
      q: "Will I get Incentives?", 
      a: "Yes! Based on Your work and contribution." 
    },
    { 
      q: "When are the Meet held? I have classes.", 
      a: "We respect your academic schedule. Most sessions are held on Saturday afternoons or weekdays after 4:00 PM. We also record sessions for our members to watch later." 
    },
    { 
      q: "How can I join the Core Committee?", 
      a: "Recruitment happens at the start of every new academic year. We look for consistency over skill. If you show up to events, build projects, and help others, you will be noticed." 
    }
  ];

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-display font-bold mb-12 text-center">
          STUDENT <span className="text-neon-cyan">FAQ</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'border-neon-purple bg-white/10 shadow-[0_0_15px_rgba(176,38,255,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/5'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className={`font-mono text-lg ${openIndex === i ? 'text-white' : 'text-gray-400'}`}>
                  {faq.q}
                </span>
                {openIndex === i ? <Minus className="text-neon-cyan" /> : <Plus className="text-gray-500" />}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mx-6 mt-2">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;