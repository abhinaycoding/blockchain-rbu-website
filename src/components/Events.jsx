import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import HackerText from './HackerText';

const Events = () => {
  // Events Data Array
  // Add your specific Google Form links to the `link` property of each event

  const events = [
    {
      id: 1,
      title: "Blockchain Workshop",
      date: "Oct 15, 2025",
      loc: "Seminar Hall 2",
      desc: "An introduction to Smart Contracts and Solidity for beginners.",
      status: "Upcoming",
      link: "https://docs.google.com/forms/" // Replace with real link
    },
    {
      id: 2,
      title: "Web3 Hackathon",
      date: "Nov 02, 2025",
      loc: "Innovation Lab",
      desc: "24-hour coding competition to build decentralized apps.",
      status: "Registration Open",
      link: "https://docs.google.com/forms/" // Replace with real link
    },
    {
      id: 3,
      title: "Guest Lecture: DeFi",
      date: "Nov 20, 2025",
      loc: "Main Auditorium",
      desc: "Expert talk on the future of Decentralized Finance.",
      status: "Upcoming",
      link: "https://docs.google.com/forms/" // Replace with real link
    }
  ];

  return (
    <section id="events" className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-2">
                <HackerText text="Upcoming " className="mr-2" />
                <span className="text-neon-green"><HackerText text="Activities" delay={200} /></span>
              </h2>
              <p className="text-gray-400">Join us in our journey of learning.</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((ev) => {
            return (
              <ScrollReveal key={ev.id}>
                <div className="glass rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] transition-all group">
                  <div className="bg-white/5 p-6 border-b border-white/5">
                    <div className="flex justify-between items-start">
                       <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-neon-green/10 text-neon-green">
                         {ev.status}
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

                    <a 
                      href={ev.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden border border-orange-500/30 text-orange-400 hover:border-orange-500 hover:bg-orange-500 hover:text-black shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]"
                    >
                      {/* Shine effect that sweeps across on hover */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
                      
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Register via Google Forms</span>
                      <ExternalLink size={16} className="relative z-10 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
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