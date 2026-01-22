import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Events = () => {
  // Use state to track registered event IDs
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const toggleRegister = (id) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
    } else {
      setRegisteredEvents([...registeredEvents, id]);
    }
  };

  const events = [
    {
      id: 1,
      title: "Blockchain Workshop",
      date: "Oct 15, 2025",
      loc: "Seminar Hall 2",
      desc: "An introduction to Smart Contracts and Solidity for beginners.",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Web3 Hackathon",
      date: "Nov 02, 2025",
      loc: "Innovation Lab",
      desc: "24-hour coding competition to build decentralized apps.",
      status: "Registration Open"
    },
    {
      id: 3,
      title: "Guest Lecture: DeFi",
      date: "Nov 20, 2025",
      loc: "Main Auditorium",
      desc: "Expert talk on the future of Decentralized Finance.",
      status: "Upcoming"
    }
  ];

  return (
    <section id="events" className="py-24 bg-darker">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-2">Upcoming <span className="text-neon-green">Activities</span></h2>
              <p className="text-gray-400">Join us in our journey of learning.</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((ev) => {
            const isRegistered = registeredEvents.includes(ev.id);
            
            return (
              <ScrollReveal key={ev.id}>
                <div className={`glass rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] transition-all group ${isRegistered ? 'border-neon-green/50' : ''}`}>
                  <div className="bg-white/5 p-6 border-b border-white/5">
                    <div className="flex justify-between items-start">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isRegistered ? 'bg-neon-green text-black' : 'bg-neon-green/10 text-neon-green'}`}>
                         {isRegistered ? 'Registered' : ev.status}
                       </span>
                       <Calendar className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <h3 className="text-2xl font-bold mt-4 group-hover:text-neon-cyan transition-colors">{ev.title}</h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{ev.desc}</p>
                    <div className="space-y-3 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-3"><Clock size={16} /> <span>{ev.date}</span></div>
                      <div className="flex items-center gap-3"><MapPin size={16} /> <span>{ev.loc}</span></div>
                    </div>

                    <button 
                      onClick={() => toggleRegister(ev.id)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        isRegistered 
                        ? 'bg-neon-green text-black hover:bg-neon-green/90' 
                        : 'border border-white/10 hover:bg-neon-cyan hover:text-black hover:border-neon-cyan'
                      }`}
                    >
                      {isRegistered ? <><CheckCircle size={16} /> Registered</> : 'Register Now'}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;