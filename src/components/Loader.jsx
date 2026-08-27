import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Loader = () => {
  const [text, setText] = useState('0x00000000000000');
  const finalString = 'BLOCKCHAIN RBU';

  useEffect(() => {
    let iteration = 0;
    const chars = '0123456789ABCDEF!@#$%^&*()';
    
    const interval = setInterval(() => {
      setText((prev) => 
        finalString
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return finalString[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= finalString.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 4; // Controls the decryption speed
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledWrapper>
      <div className="boxes">
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="text-container">
        <span className="bracket">[</span>
        <span className="text">{text}</span>
        <span className="bracket">]</span>
      </div>
      <div className="loading-status">
        SYNCHRONIZING<span className="dots"></span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text-container {
    margin-top: 80px;
    font-family: monospace;
    font-size: 18px;
    letter-spacing: 0.4em;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .text-container .bracket {
    color: #5C8DF6;
    opacity: 0.5;
    font-weight: 300;
  }

  .text-container .text {
    background: linear-gradient(90deg, #fff, #5C8DF6, #fff);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shine 3s linear infinite;
    font-weight: bold;
    text-shadow: 0 0 30px rgba(92, 141, 246, 0.5);
  }

  .loading-status {
    margin-top: 16px;
    font-family: monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    color: #5C8DF6;
    opacity: 0.6;
    text-transform: uppercase;
  }

  .dots::after {
    content: '';
    animation: loadingDots 1.5s infinite steps(4, end);
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  @keyframes loadingDots {
    0% { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
    100% { content: ''; }
  }

  .boxes {
    --size: 32px;
    --duration: 800ms;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    position: relative;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    margin-top: calc(var(--size) * 1.5 * -1);
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  }

  .boxes .box {
    width: var(--size);
    height: var(--size);
    top: 0;
    left: 0;
    position: absolute;
    transform-style: preserve-3d;
  }

  .boxes .box:nth-child(1) {
    transform: translate(100%, 0);
    -webkit-animation: box1 var(--duration) linear infinite;
    animation: box1 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(2) {
    transform: translate(0, 100%);
    -webkit-animation: box2 var(--duration) linear infinite;
    animation: box2 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(3) {
    transform: translate(100%, 100%);
    -webkit-animation: box3 var(--duration) linear infinite;
    animation: box3 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(4) {
    transform: translate(200%, 0);
    -webkit-animation: box4 var(--duration) linear infinite;
    animation: box4 var(--duration) linear infinite;
  }

  .boxes .box > div {
    --background: #5C8DF6;
    --top: auto;
    --right: auto;
    --bottom: auto;
    --left: auto;
    --translateZ: calc(var(--size) / 2);
    --rotateY: 0deg;
    --rotateX: 0deg;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--background);
    top: var(--top);
    right: var(--right);
    bottom: var(--bottom);
    left: var(--left);
    transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
  }

  .boxes .box > div:nth-child(1) {
    --top: 0;
    --left: 0;
  }

  .boxes .box > div:nth-child(2) {
    --background: #145af2;
    --right: 0;
    --rotateY: 90deg;
  }

  .boxes .box > div:nth-child(3) {
    --background: #447cf5;
    --rotateX: -90deg;
  }

  .boxes .box > div:nth-child(4) {
    --background: #DBE3F4;
    --top: 0;
    --left: 0;
    --translateZ: calc(var(--size) * 3 * -1);
  }

  @-webkit-keyframes box1 {
    0%, 50% {
      transform: translate(100%, 0);
    }

    100% {
      transform: translate(200%, 0);
    }
  }

  @keyframes box1 {
    0%, 50% {
      transform: translate(100%, 0);
    }

    100% {
      transform: translate(200%, 0);
    }
  }

  @-webkit-keyframes box2 {
    0% {
      transform: translate(0, 100%);
    }

    50% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(100%, 0);
    }
  }

  @keyframes box2 {
    0% {
      transform: translate(0, 100%);
    }

    50% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(100%, 0);
    }
  }

  @-webkit-keyframes box3 {
    0%, 50% {
      transform: translate(100%, 100%);
    }

    100% {
      transform: translate(0, 100%);
    }
  }

  @keyframes box3 {
    0%, 50% {
      transform: translate(100%, 100%);
    }

    100% {
      transform: translate(0, 100%);
    }
  }

  @-webkit-keyframes box4 {
    0% {
      transform: translate(200%, 0);
    }

    50% {
      transform: translate(200%, 100%);
    }

    100% {
      transform: translate(100%, 100%);
    }
  }

  @keyframes box4 {
    0% {
      transform: translate(200%, 0);
    }

    50% {
      transform: translate(200%, 100%);
    }

    100% {
      transform: translate(100%, 100%);
    }
  }
`;

export default Loader;
