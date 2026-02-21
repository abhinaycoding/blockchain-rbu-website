import React, { useEffect, useRef } from 'react';

// --- SHADER CODE ---
const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// A complex noise-based fluid shader
const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // PRNG (Pseudo-Random Number Generator)
  float random(in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise based on PRNG
  float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      // Smooth Interpolation

      // Cubic Hermine Curve.  Same as SmoothStep()
      vec2 u = f*f*(3.0-2.0*f);
      // u = smoothstep(0.,1.,f);

      // Mix 4 coorners percentages
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(in vec2 st) {
      // Initial values
      float value = 0.0;
      float amplitude = .5;
      float frequency = 0.;
      // Loop of octaves
      for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= .5;
      }
      return value;
  }

  void main() {
    // Normalize coordinates based on resolution
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y; // Fix aspect ratio

    // Normalize mouse
    vec2 mouse = u_mouse / u_resolution;
    mouse.x *= u_resolution.x / u_resolution.y;
    mouse.y = 1.0 - mouse.y; // WebGL Y is flipped from screen Y

    // 1. Create a flowing domain space by warping the coordinates
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00 * u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7, 9.2) + 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3, 2.8) + 0.126*u_time);

    // 2. MOUSE INTERACTION
    // Push the liquid away from the mouse cursor
    float distToMouse = distance(st, mouse);
    float mouseEffect = smoothstep(0.4, 0.0, distToMouse); 
    // Add the mouse displacement to the warping
    r += mouseEffect * normalize(st - mouse) * 0.2; 

    // The final noise value (the liquid)
    float f = fbm(st + r);

    // 3. COLOR PALETTE ("Deep Cyan & Orange")
    // Base colors matching the UI screenshot: Dark Teal/Green background, Cyan & Orange accents.
    vec3 colDark = vec3(0.01, 0.05, 0.08);     // Very dark cyan/navy base
    vec3 colTeal = vec3(0.0, 0.4, 0.5);        // Deep Teal/Green mid-tones
    vec3 colCyan = vec3(0.0, 0.95, 1.0);       // Neon Cyan (#00f3ff) for highlights
    vec3 colOrange = vec3(0.98, 0.45, 0.09);   // Neon Orange (#f97316) from the button/Bitcoin

    // Mix the colors based on the fluid domain values (q and r)
    // Dark base with teal waves
    vec3 color = mix(colDark, colTeal, clamp((f*f)*3.0, 0.0, 1.0));
    // Add glowing cyan edges
    color = mix(color, colCyan, clamp(length(q)*0.8, 0.0, 1.0)*f);
    // Add thin orange/gold streaks where r.x is high
    color = mix(color, colOrange, clamp((length(r.x)-0.5)*1.5, 0.0, 1.0)*f*1.5);

    // Subtle boost in areas with high flow for ambient glow
    color += vec3(0.0, 0.2, 0.3) * (f * f * 2.0); 
    
    // Smooth Cyan Mouse Glow
    color += vec3(0.0, 0.8, 0.9) * mouseEffect * 0.8;

    // Output final color
    gl_FragColor = vec4(color, 1.0); 
  }
`;

const WebGLBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // --- SETUP PREPARATION ---
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // --- GEOMETRY (A Full-Screen Quad) ---
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Two triangles covering the entire screen (-1 to +1 coordinate space)
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // --- UNIFORMS ---
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    // --- EVENT LISTENERS ---
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Support touch devices 
    const handleTouchMove = (e) => {
        if(e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const resize = () => {
      // Use devicePixelRatio to ensure retina crispness, but scale it down slightly
      // for performance since this is a complex shader.
      const dpr = Math.min(window.devicePixelRatio, 2) || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let startTime = performance.now();

    const render = () => {
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) / 1000.0; // Time in seconds

      gl.uniform1f(timeLocation, elapsedTime);
      gl.uniform2f(mouseLocation, mouseX * (Math.min(window.devicePixelRatio, 2) || 1), mouseY * (Math.min(window.devicePixelRatio, 2) || 1));

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-2] object-cover bg-black"
    />
  );
};

export default WebGLBackground;
