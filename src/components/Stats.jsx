import React from 'react';
import CountUp from 'react-countup'; // You might need: npm install react-countup
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: "Active Members", value: 500, suffix: "+" },
  { label: "Events Hosted", value: 25, suffix: "" },
  { label: "Lines of Code", value: 10000, suffix: "+" },
  { label: "Hackathons Won", value: 12, suffix: "" },
];

const Stats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <section className="py-20 bg-black border-y border-white/10">
      <div ref={ref} className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl md:text-6xl font-bold text-white mb-2 font-mono">
              {inView ? <CountUp end={stat.value} duration={2.5} /> : 0}
              <span className="text-orange-500">{stat.suffix}</span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;