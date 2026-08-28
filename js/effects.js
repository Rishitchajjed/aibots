/**
 * AI Bots - Universal Visual Effects Engine (Zero External Dependencies)
 * Supports: Confetti, Snowflakes, Golden Sparkles, Fireworks, Matrix Rain, Floating Hearts, Party Balloons, Halloween Embers.
 */

(function() {
  let activeAnimationId = null;
  let effectsCanvas = null;
  let ctx = null;
  let particles = [];

  function getOrCreateCanvas() {
    if (!effectsCanvas) {
      effectsCanvas = document.createElement('canvas');
      effectsCanvas.id = 'aibotsEffectsCanvas';
      effectsCanvas.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        pointer-events: none; z-index: 99998;
      `;
      document.body.appendChild(effectsCanvas);
      ctx = effectsCanvas.getContext('2d');
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }
    return effectsCanvas;
  }

  function resizeCanvas() {
    if (effectsCanvas) {
      effectsCanvas.width = window.innerWidth;
      effectsCanvas.height = window.innerHeight;
    }
  }

  window.stopAllEffects = function() {
    if (activeAnimationId) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    particles = [];
    if (ctx && effectsCanvas) {
      ctx.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);
    }
  };

  // ==========================================
  // 1. CONFETTI CELEBRATION
  // ==========================================
  function launchConfetti(isBurstOnly = false) {
    getOrCreateCanvas();
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];
    const count = isBurstOnly ? 150 : 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        type: 'confetti',
        x: Math.random() * effectsCanvas.width,
        y: isBurstOnly ? effectsCanvas.height + 20 : -20,
        vx: (Math.random() - 0.5) * (isBurstOnly ? 12 : 4),
        vy: isBurstOnly ? -(Math.random() * 14 + 10) : (Math.random() * 3 + 2),
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.25,
        opacity: 1
      });
    }

    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 2. FALLING SNOWFLAKES
  // ==========================================
  function launchSnow() {
    getOrCreateCanvas();
    for (let i = 0; i < 65; i++) {
      particles.push({
        type: 'snow',
        x: Math.random() * effectsCanvas.width,
        y: Math.random() * effectsCanvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * 1.5 + 0.8,
        radius: Math.random() * 3.5 + 1.5,
        sway: Math.random() * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 3. GOLDEN FESTIVE SPARKLES & STARS
  // ==========================================
  function launchSparkles() {
    getOrCreateCanvas();
    const goldColors = ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#ffffff'];
    for (let i = 0; i < 50; i++) {
      particles.push({
        type: 'sparkle',
        x: Math.random() * effectsCanvas.width,
        y: Math.random() * effectsCanvas.height,
        size: Math.random() * 4 + 2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        pulse: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        vy: -(Math.random() * 0.8 + 0.3),
        opacity: 1
      });
    }
    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 4. GRAND FIREWORKS SHOW
  // ==========================================
  function launchFireworks() {
    getOrCreateCanvas();
    function createFireworkRocket() {
      const targetX = Math.random() * (effectsCanvas.width * 0.8) + effectsCanvas.width * 0.1;
      const targetY = Math.random() * (effectsCanvas.height * 0.4) + effectsCanvas.height * 0.1;
      const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#06b6d4'];
      const fireworkColor = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        type: 'rocket',
        x: targetX,
        y: effectsCanvas.height,
        targetY: targetY,
        vy: -(Math.random() * 4 + 9),
        color: fireworkColor
      });
    }

    createFireworkRocket();
    createFireworkRocket();
    const interval = setInterval(createFireworkRocket, 1200);

    setTimeout(() => clearInterval(interval), 10000);
    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 5. CYBERPUNK MATRIX DIGITAL RAIN
  // ==========================================
  function launchMatrix() {
    getOrCreateCanvas();
    const characters = '0123456789ABCDEFアイウエオカキクケコサシスセソ';
    const columns = Math.floor(effectsCanvas.width / 20);
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    particles.push({
      type: 'matrix',
      drops: drops,
      chars: characters,
      cols: columns
    });

    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 6. FLOATING HEARTS & LOVE AURA
  // ==========================================
  function launchHearts() {
    getOrCreateCanvas();
    const heartColors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af'];
    for (let i = 0; i < 35; i++) {
      particles.push({
        type: 'heart',
        x: Math.random() * effectsCanvas.width,
        y: effectsCanvas.height + Math.random() * 200,
        size: Math.random() * 12 + 10,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        vy: -(Math.random() * 1.6 + 0.8),
        sway: Math.random() * 2,
        swaySpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 7. CELEBRATION PARTY BALLOONS
  // ==========================================
  function launchBalloons() {
    getOrCreateCanvas();
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 22; i++) {
      particles.push({
        type: 'balloon',
        x: Math.random() * effectsCanvas.width,
        y: effectsCanvas.height + Math.random() * 400,
        radius: Math.random() * 16 + 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: -(Math.random() * 1.8 + 1.2),
        sway: Math.random() * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        opacity: 0.92
      });
    }
    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // 8. HALLOWEEN GLOWING EMBERS
  // ==========================================
  function launchHalloween() {
    getOrCreateCanvas();
    const emberColors = ['#ff7700', '#ffaa00', '#ff3300', '#9933ff'];
    for (let i = 0; i < 45; i++) {
      particles.push({
        type: 'ember',
        x: Math.random() * effectsCanvas.width,
        y: effectsCanvas.height + Math.random() * 100,
        radius: Math.random() * 4 + 2,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
        vy: -(Math.random() * 1.5 + 0.8),
        vx: (Math.random() - 0.5) * 1.2,
        pulse: Math.random() * Math.PI,
        opacity: 1
      });
    }
    if (!activeAnimationId) runAnimationLoop();
  }

  // ==========================================
  // MAIN ANIMATION RENDER LOOP
  // ==========================================
  function runAnimationLoop() {
    if (!ctx || !effectsCanvas) return;
    ctx.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Confetti
      if (p.type === 'confetti') {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        if (p.y > effectsCanvas.height + 40) {
          particles.splice(i, 1);
        }
      }

      // Snow
      else if (p.type === 'snow') {
        p.y += p.vy;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${p.opacity})`;
        ctx.fill();

        if (p.y > effectsCanvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * effectsCanvas.width;
        }
      }

      // Sparkle
      else if (p.type === 'sparkle') {
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        const currentSize = Math.max(1, p.size * Math.abs(Math.sin(p.pulse)));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.y < -20) {
          p.y = effectsCanvas.height + 10;
          p.x = Math.random() * effectsCanvas.width;
        }
      }

      // Rocket & Burst (Fireworks)
      else if (p.type === 'rocket') {
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.y <= p.targetY) {
          // Burst
          const burstColor = p.color;
          const burstX = p.x;
          const burstY = p.y;
          particles.splice(i, 1);

          for (let j = 0; j < 55; j++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            particles.push({
              type: 'spark',
              x: burstX,
              y: burstY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: burstColor,
              radius: Math.random() * 3 + 1.5,
              alpha: 1
            });
          }
        }
      }

      // Firework Spark
      else if (p.type === 'spark') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.alpha -= 0.018;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Matrix
      else if (p.type === 'matrix') {
        ctx.fillStyle = 'rgba(0, 255, 128, 0.75)';
        ctx.font = '14px monospace';

        for (let k = 0; k < p.drops.length; k++) {
          const text = p.chars.charAt(Math.floor(Math.random() * p.chars.length));
          ctx.fillText(text, k * 20, p.drops[k] * 20);

          if (p.drops[k] * 20 > effectsCanvas.height && Math.random() > 0.975) {
            p.drops[k] = 0;
          }
          p.drops[k]++;
        }
      }

      // Hearts
      else if (p.type === 'heart') {
        p.y += p.vy;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.6;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText('❤', -p.size / 2, -p.size / 2);
        ctx.restore();

        if (p.y < -40) {
          p.y = effectsCanvas.height + 20;
          p.x = Math.random() * effectsCanvas.width;
        }
      }

      // Balloons
      else if (p.type === 'balloon') {
        p.y += p.vy;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.9;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 0.8, p.radius, 0, 0, Math.PI * 2);
        ctx.fill();

        // String
        ctx.beginPath();
        ctx.moveTo(0, p.radius);
        ctx.lineTo(Math.sin(p.sway) * 8, p.radius + 28);
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.stroke();
        ctx.restore();

        if (p.y < -80) {
          p.y = effectsCanvas.height + 40;
          p.x = Math.random() * effectsCanvas.width;
        }
      }

      // Halloween Embers
      else if (p.type === 'ember') {
        p.y += p.vy;
        p.x += p.vx;
        p.pulse += 0.05;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.y < -20) {
          p.y = effectsCanvas.height + 10;
          p.x = Math.random() * effectsCanvas.width;
        }
      }
    }

    if (particles.length > 0) {
      activeAnimationId = requestAnimationFrame(runAnimationLoop);
    } else {
      activeAnimationId = null;
    }
  }

  // Master Global Effect Trigger
  window.triggerVisualEffect = function(effectName, isPreview = false) {
    if (isPreview) {
      window.stopAllEffects();
    }

    switch (effectName) {
      case 'confetti':
        launchConfetti(isPreview);
        break;
      case 'snow':
        launchSnow();
        break;
      case 'sparkles':
        launchSparkles();
        break;
      case 'fireworks':
        launchFireworks();
        break;
      case 'matrix':
        launchMatrix();
        break;
      case 'hearts':
        launchHearts();
        break;
      case 'balloons':
        launchBalloons();
        break;
      case 'halloween':
        launchHalloween();
        break;
    }
  };

  // Auto-init on page load from saved settings
  function checkSavedEffects() {
    try {
      const saved = JSON.parse(localStorage.getItem('aibots_festive_effects') || '{}');
      Object.entries(saved).forEach(([key, isEnabled]) => {
        if (isEnabled) {
          window.triggerVisualEffect(key, false);
        }
      });
    } catch(e) {}
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(checkSavedEffects);
  } else {
    setTimeout(checkSavedEffects, 500);
  }
})();
