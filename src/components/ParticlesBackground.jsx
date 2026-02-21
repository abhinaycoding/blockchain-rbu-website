import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };
    const handleMouseOut = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Capped at 80 particles max — was /15000, now strictly limited
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 80);
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 20) + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.current.x != null) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = mouse.current.radius * mouse.current.radius;
          if (distSq < maxDistSq) {
            const distance = Math.sqrt(distSq);
            const force = (mouse.current.radius - distance) / mouse.current.radius;
            this.x -= (dx / distance) * force * this.density * 0.04;
            this.y -= (dy / distance) * force * this.density * 0.04;
          }
        }
      }

      draw() {
        // No shadowBlur — it forces a GPU compositing flush every particle
        ctx.fillStyle = 'rgba(180, 200, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Limited lookahead (max 50) prevents true O(n²) per frame
        const maxJ = Math.min(particles.length, i + 50);
        for (let j = i + 1; j < maxJ; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // 100px connection distance
            const alpha = (1 - distSq / 10000) * 0.12;
            ctx.strokeStyle = `rgba(150, 180, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse connections — throttled to every other frame
        if (frameCount % 2 === 0 && mouse.current.x != null) {
          const dxM = particles[i].x - mouse.current.x;
          const dyM = particles[i].y - mouse.current.y;
          const distSqM = dxM * dxM + dyM * dyM;
          const maxM = mouse.current.radius * mouse.current.radius;
          if (distSqM < maxM) {
            const alpha = (1 - distSqM / maxM) * 0.2;
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

export default ParticlesBackground;