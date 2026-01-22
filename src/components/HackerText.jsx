import React, { useState, useEffect, useRef } from 'react';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
    let iteration = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Controls speed (higher denominator = slower)
    }, 30);
  };

  // Optional: Scramble once on load
  useEffect(() => {
    scramble();
  }, []);

  return (
    <span 
      onMouseEnter={scramble} 
      className={`font-mono cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
};

export default HackerText;