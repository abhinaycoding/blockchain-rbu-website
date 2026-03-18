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
    <section className="py-28 bg-transparent relative z-10" id="faq">
      <div className="absolute left-[8%] top-[20%] w-[360px] h-[360px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-[8%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block font-mono text-xs tracking-[0.32em] text-orange-400 uppercase mb-4">
            /// Answers for Members
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white">
            STUDENT <span className="text-neon-cyan">FAQ</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know before joining Blockchain RBU.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`group border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl ${
                openIndex === i
                  ? 'border-orange-400/60 bg-white/10 shadow-[0_0_30px_rgba(249,115,22,0.2)]'
                  : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-start gap-4 p-6 md:p-7 text-left"
              >
                <div className="flex items-start gap-4">
                  <span className={`mt-1 text-[10px] font-mono tracking-[0.24em] ${openIndex === i ? 'text-orange-300' : 'text-gray-500'}`}>
                    0{i + 1}
                  </span>
                  <span className={`font-mono text-base md:text-lg leading-relaxed transition-colors ${openIndex === i ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {faq.q}
                  </span>
                </div>

                <span
                  className={`mt-1 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? 'border-orange-400/70 text-neon-cyan bg-white/10'
                      : 'border-white/20 text-gray-500 group-hover:border-white/40 group-hover:text-gray-300'
                  }`}
                >
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 md:px-7 pb-7 pt-0 text-gray-300 leading-relaxed border-t border-white/10 mx-6 md:mx-7 mt-2 text-sm md:text-base">
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