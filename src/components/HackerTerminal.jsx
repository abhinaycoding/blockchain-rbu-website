import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';

const HackerTerminal = () => {
  const [lines, setLines] = useState([
    "Initializing Blockchain Node...",
    "Loading Smart Contracts...",
    "Accessing RBU_CHAPTER Mainframe...",
    "Success. System Online.",
    "Type 'help' to see available commands."
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newLines = [...lines, `> ${input}`];

      // COMMAND LOGIC
      switch (cmd) {
        case 'help':
          newLines.push(
            "AVAILABLE COMMANDS:",
            "- about    : Mission statement",
            "- team     : List core contributors",
            "- events   : Next scheduled meetup",
            "- join     : Open recruitment form",
            "- clear    : Clear terminal"
          );
          break;
        case 'about':
          newLines.push("We are the future of Web3. Building decentralized systems for the next generation.");
          break;
        case 'team':
          newLines.push("Core Team: [REDACTED], [REDACTED], and YOU?");
          break;
        case 'events':
          newLines.push("Next Event: ETH_Workshop // Location: Lab 404 // Time: TBD");
          break;
        case 'join':
          newLines.push("Redirecting to registration protocol...");
          // You could actually trigger a scroll to the form here
          break;
        case 'satoshi':
          newLines.push('"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."');
          break;
        case 'clear':
          setLines(["Console cleared."]);
          setInput("");
          return; // Skip default setLines
        default:
          newLines.push(`Command not found: '${cmd}'. Type 'help'.`);
      }

      setLines(newLines);
      setInput("");
    }
  };

  return (
    <section className="py-20 bg-black flex items-center justify-center px-4">
      <motion.div 
        className="w-full max-w-3xl bg-[#0c0c0c] rounded-lg border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm md:text-base"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} className="text-gray-400" />
            <span className="text-gray-400 font-semibold">guest@rbu-chapter:~</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus size={14} className="text-gray-500 hover:text-white cursor-pointer" />
            <Square size={12} className="text-gray-500 hover:text-white cursor-pointer" />
            <X size={14} className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 h-[400px] overflow-y-auto custom-scrollbar text-neon-green/90 bg-black/50 backdrop-blur-md">
          {lines.map((line, i) => (
            <div key={i} className="mb-1 leading-relaxed break-words">
              {line}
            </div>
          ))}
          
          {/* Input Line */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-neon-purple font-bold">{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-white w-full caret-neon-green"
              autoFocus
              placeholder="Type command..."
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </section>
  );
};

export default HackerTerminal;