import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  
  // Track mouse position
  const mouse = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse event listeners
    const handleMouseMove = (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };
    
    const handleMouseOut = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Particle Config
    const particles = [];
    // Adjust density based on screen size to prevent lag on mobile, but keep it dense enough for effect
    const particleCount = (canvas.width * canvas.height) / 15000; 
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8; // Speed X
        this.vy = (Math.random() - 0.5) * 0.8; // Speed Y
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // --- INTERACTIVITY LOGIC ---
        if (mouse.current.x != null && mouse.current.y != null) {
          let dx = mouse.current.x - this.x;
          let dy = mouse.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          // Max distance, past that the force is 0
          let maxDistance = mouse.current.radius;
          let force = (maxDistance - distance) / maxDistance;
          
          if (force < 0) force = 0;
          
          let directionX = (forceDirectionX * force * this.density) * 0.05;
          let directionY = (forceDirectionY * force * this.density) * 0.05;

          if (distance < mouse.current.radius) {
            // Push particles slightly away or pull them in slightly (Adjust signs for effect)
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.6)'; // Neon Cyan core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Slight glow effect for nodes
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
      }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // Reset shadow for lines
      
      particles.forEach((p, index) => {
        p.update();
        p.draw();

        // Connect particles if close (The "Blockchain" network effect)
        for (let j = index; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            // Network lines color (Neon Purple) fading with distance
            ctx.strokeStyle = `rgba(176, 38, 255, ${0.15 - distance/800})`; 
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Connect particles to mouse cursor dynamically
        if (mouse.current.x != null && mouse.current.y != null) {
          const dxMouse = p.x - mouse.current.x;
          const dyMouse = p.y - mouse.current.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distanceMouse < mouse.current.radius) {
            ctx.beginPath();
            // Cyan lines reaching out to the cursor
            ctx.strokeStyle = `rgba(0, 243, 255, ${0.3 - distanceMouse/(mouse.current.radius * 3.3)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      });

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
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-0"
    />
  );
};

export default ParticlesBackground;