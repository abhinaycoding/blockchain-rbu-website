import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>{}[]";

const HackerText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '0')); // Start with 0s or scrambles
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]; // Reveal correct letter
            }
            if (text[index] === " ") return " "; // Keep spaces
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Speed of deciphering
    }, 40);
  };

  useEffect(() => {
    if (isInView) {
      timeoutRef.current = setTimeout(scramble, delay);
    }
    
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [isInView, text, delay]);

  return (
    <span 
      ref={containerRef}
      onMouseEnter={scramble} 
      className={`font-mono inline-block ${className}`}
    >
      {displayText}
    </span>
  );
};

export default HackerText;