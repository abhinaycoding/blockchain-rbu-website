import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

// If @motionone/utils fails, just copy this helper function:
// const wrap = (min, max, v) => {
//   const rangeSize = max - min;
//   return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
// };
// This replaces the import
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="scroller font-display font-bold uppercase text-7xl md:text-9xl flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-12 text-transparent stroke-text">{children} </span>
        <span className="block mr-12 text-transparent stroke-text">{children} </span>
        <span className="block mr-12 text-transparent stroke-text">{children} </span>
        <span className="block mr-12 text-transparent stroke-text">{children} </span>
      </motion.div>
      
      {/* CSS for the Outline Text */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .stroke-text:hover {
           -webkit-text-stroke: 2px #00f3ff; /* Neon Cyan */
           opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default function VelocityScroll() {
  return (
    <section className="py-20 bg-black overflow-hidden relative z-10">
      <ParallaxText baseVelocity={-2}>
        DECENTRALIZED • WEB3 • FUTURE •
      </ParallaxText>
      <div className="h-10"></div> {/* Spacer */}
      <ParallaxText baseVelocity={2}>
        BUILD • DEPLOY • SCALE • INNOVATE •
      </ParallaxText>
    </section>
  );
}