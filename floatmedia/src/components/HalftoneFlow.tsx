'use client';

import { useRef, useEffect, useCallback } from 'react';

interface MousePos {
  x: number;
  y: number;
  active: boolean;
}

interface Glow {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  angle: number;
  rotAngle: number;
  speed: number;
  rotSpeed: number;
  phase: number;
  hueShift: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
  birth: number;
}

export default function HalftoneFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePos>({ x: 0, y: 0, active: false });
  const animFrameRef = useRef<number>(0);
  const glowsRef = useRef<Glow[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastHoverRippleRef = useRef<number>(0);
  const isMobileRef = useRef(false);

  const initGlows = useCallback((w: number, h: number) => {
    const mobile = w < 640;
    isMobileRef.current = mobile;
    const count = mobile ? 4 : 6;
    const glows: Glow[] = [];
    for (let i = 0; i < count; i++) {
      glows.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radiusX: mobile ? w * 0.7 : 350 + Math.random() * 450,
        radiusY: mobile ? h * 0.4 : 180 + Math.random() * 250,
        angle: Math.random() * Math.PI * 2,
        rotAngle: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        rotSpeed: 0.01 + Math.random() * 0.018,
        phase: Math.random() * Math.PI * 2,
        hueShift: Math.random() * 40 - 20,
      });
    }
    glowsRef.current = glows;
  }, []);

  const addRipple = useCallback((x: number, y: number, maxRadius: number, strength: number, speed: number) => {
    ripplesRef.current.push({
      x, y,
      radius: 0,
      maxRadius,
      strength,
      speed,
      birth: performance.now(),
    });
  }, []);

  const getCanvasPos = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const mouse = mouseRef.current;
    const time = performance.now() * 0.001;
    const mobile = w < 640;

    if (glowsRef.current.length === 0) initGlows(w, h);

    const glows = glowsRef.current;
    for (const g of glows) {
      g.angle += g.speed;
      g.rotAngle += g.rotSpeed;
      g.hueShift = Math.sin(time * 0.3 + g.phase) * 25;

      g.x += Math.cos(g.angle) * (mobile ? 3.5 : 2.5);
      g.y += Math.sin(g.angle * 0.5 + g.phase) * (mobile ? 2.2 : 1.5);

      if (g.x < -g.radiusX * 1.5) g.x = w + g.radiusX;
      if (g.x > w + g.radiusX * 1.5) g.x = -g.radiusX;
      if (g.y < -g.radiusY * 1.5) g.y = h + g.radiusY;
      if (g.y > h + g.radiusY * 1.5) g.y = -g.radiusY;
    }

    const ripples = ripplesRef.current;
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      if (r.radius > r.maxRadius) {
        ripples.splice(i, 1);
      }
    }

    ctx.clearRect(0, 0, w, h);

    const spacing = mobile ? 8 : 10;
    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing;
        const y = row * spacing;

        let maxInfluence = 0;
        let colorR = 0, colorG = 0, colorB = 0;
        let totalWeight = 0;

        for (const g of glows) {
          const cosR = Math.cos(-g.rotAngle);
          const sinR = Math.sin(-g.rotAngle);
          const dx = x - g.x;
          const dy = y - g.y;
          const rx = dx * cosR - dy * sinR;
          const ry = dx * sinR + dy * cosR;

          const normDist = Math.sqrt((rx / g.radiusX) ** 2 + (ry / g.radiusY) ** 2);
          const influence = Math.pow(Math.max(0, 1 - normDist), 1.3);
          const breathe = 0.7 + 0.3 * Math.sin(time * 1.2 + g.phase);
          const edgeWave = 0.8 + 0.2 * Math.sin(normDist * 4 - time * 3);
          const glowStrength = influence * breathe * edgeWave;

          if (glowStrength > 0.01) {
            const localTime = time * 0.5 + g.phase;
            const gradientMix = (Math.sin(localTime + normDist * 2) + 1) * 0.5;

            const baseHue = 185 + g.hueShift;
            const lightness = 35 + gradientMix * 35;
            const saturation = 70 + gradientMix * 30;

            const hue2rgb = (p: number, q: number, t: number) => {
              if (t < 0) t += 1;
              if (t > 1) t -= 1;
              if (t < 1 / 6) return p + (q - p) * 6 * t;
              if (t < 1 / 2) return q;
              if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
              return p;
            };

            const h2 = ((baseHue % 360) + 360) % 360 / 360;
            const s2 = saturation / 100;
            const l2 = lightness / 100;
            const q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
            const p2 = 2 * l2 - q2;

            const lr = hue2rgb(p2, q2, h2 + 1 / 3) * 255;
            const lg = hue2rgb(p2, q2, h2) * 255;
            const lb = hue2rgb(p2, q2, h2 - 1 / 3) * 255;

            colorR += lr * glowStrength;
            colorG += lg * glowStrength;
            colorB += lb * glowStrength;
            totalWeight += glowStrength;
          }

          maxInfluence = Math.max(maxInfluence, glowStrength);
        }

        let rippleInfluence = 0;
        let rippleBright = 0;
        for (const r of ripples) {
          const dx = x - r.x;
          const dy = y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ringDist = Math.abs(dist - r.radius);
          const ringWidth = mobile ? 120 : 160;
          const ringFade = Math.max(0, 1 - ringDist / ringWidth);
          const ageFade = Math.max(0, 1 - r.radius / r.maxRadius);
          const wave = Math.sin(dist * 0.04 - time * 8) * 0.5 + 0.5;
          const influence = ringFade * ageFade * r.strength * wave;
          rippleInfluence = Math.max(rippleInfluence, influence);
          rippleBright += influence;
        }

        const minDot = mobile ? 0.15 : 0.1;
        let dotSize = minDot + maxInfluence * (1 - minDot);
        dotSize = Math.min(1, dotSize + rippleInfluence * 0.6);
        dotSize = Math.max(minDot, Math.min(1, dotSize));

        let distToMouse = 1;
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          distToMouse = Math.sqrt(dx * dx + dy * dy);
          const hoverRange = mobile ? 180 : 300;
          const influence = Math.max(0, 1 - distToMouse / hoverRange);
          dotSize = Math.min(1, dotSize + influence * 0.5);
        }

        const radius = dotSize * (spacing * 0.42);

        let r: number, g2: number, b: number, alpha: number;

        if (rippleBright > 0.05) {
          const rp = Math.min(1, rippleBright);
          r = 34 + rp * 80;
          g2 = 180 + rp * 75;
          b = 220 + rp * 35;
          alpha = 0.3 + rp * 0.7;
        } else if (mouse.active && distToMouse < (mobile ? 200 : 340)) {
          const proximity = 1 - distToMouse / (mobile ? 200 : 340);
          const mousePulse = 0.5 + 0.5 * Math.sin(time * 4);
          r = 34 + proximity * 100 * mousePulse;
          g2 = 211 + proximity * 44 * mousePulse;
          b = 238 + proximity * 17 * mousePulse;
          alpha = 0.4 + proximity * 0.6;
        } else if (totalWeight > 0.01) {
          r = colorR / totalWeight;
          g2 = colorG / totalWeight;
          b = colorB / totalWeight;
          alpha = 0.15 + maxInfluence * 0.85;
        } else {
          const darkPulse = 0.5 + 0.5 * Math.sin(time * 0.4 + x * 0.005 + y * 0.003);
          r = 10 + darkPulse * 8;
          g2 = 25 + darkPulse * 15;
          b = 35 + darkPulse * 20;
          alpha = 0.04 + darkPulse * 0.03;
        }

        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.4, radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g2)}, ${Math.round(b)}, ${alpha})`;
        ctx.fill();
      }
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [initGlows]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    animFrameRef.current = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      mouseRef.current = { x: pos.x, y: pos.y, active: true };

      const now = performance.now();
      if (now - lastHoverRippleRef.current > 50) {
        addRipple(pos.x, pos.y, 200, 0.3, 3);
        lastHoverRippleRef.current = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      addRipple(pos.x, pos.y, 800, 1.0, 5);
      addRipple(pos.x, pos.y, 550, 0.7, 4);
      addRipple(pos.x, pos.y, 350, 0.5, 3);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getCanvasPos(touch.clientX, touch.clientY);
      mouseRef.current = { x: pos.x, y: pos.y, active: true };
      addRipple(pos.x, pos.y, 600, 1.0, 5);
      addRipple(pos.x, pos.y, 400, 0.7, 4);
      addRipple(pos.x, pos.y, 250, 0.5, 3);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getCanvasPos(touch.clientX, touch.clientY);
      mouseRef.current = { x: pos.x, y: pos.y, active: true };

      const now = performance.now();
      if (now - lastHoverRippleRef.current > 40) {
        addRipple(pos.x, pos.y, 150, 0.35, 3);
        lastHoverRippleRef.current = now;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draw, addRipple, getCanvasPos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
      style={{ opacity: 0.95 }}
    />
  );
}
