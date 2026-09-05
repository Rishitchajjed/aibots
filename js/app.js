/**
 * AI Bots Creative Studio - Core Shared Script
 * Handles Themes, Audio Synthesizer, Confetti Celebrations, Command Palette, File Dropzones, and Logo Physics.
 */

// Tools Registry for Search and Navigation
const AI_BOTS_TOOLS = [
  {
    id: 'bank-statement-converter',
    title: 'Bank Statement to Tally',
    description: 'Convert PDF/CSV statements for 20+ Indian banks into formatted Excel and Tally XML vouchers with 0.00 difference.',
    icon: 'fa-file-excel',
    url: 'bank-statement-converter.html',
    category: 'finance',
    badge: 'TALLY XML',
    color: '#10b981'
  },
  {
    id: 'videoeditor',
    title: 'Video Studio Pro',
    description: 'Trim clips, crop for Reels/TikTok, add text overlays, apply color grades, change speed, and export HD videos.',
    icon: 'fa-clapperboard',
    url: 'videoeditor.html',
    category: 'creative',
    badge: 'STUDIO PRO',
    color: '#ec4899'
  },
  {
    id: 'videoplayer',
    title: 'Video Player & Cinema',
    description: 'High performance video player with theater mode, frame grabbing, speed control, and loop playback.',
    icon: 'fa-circle-play',
    url: 'videoplayer.html',
    category: 'creative',
    badge: 'HD PLAYER',
    color: '#8b5cf6'
  },
  {
    id: 'cricketscore',
    title: 'Cricket Score Counter',
    description: 'Live match scoring board with batsmen/bowler stats, extras, overs, and scorecard export.',
    icon: 'fa-baseball-bat-ball',
    url: 'cricketscore.html',
    category: 'utility',
    badge: 'PRO SCORER',
    color: '#10b981'
  },
  {
    id: 'cricket',
    title: 'Live Cricket Scores',
    description: 'Track international and league cricket fixtures, ball-by-ball commentary, and tournament standings.',
    icon: 'fa-satellite-dish',
    url: 'cricket.html',
    category: 'utility',
    badge: 'LIVE MATCH',
    color: '#06b6d4'
  },
  {
    id: 'game',
    title: 'Realm of Bots RPG',
    description: 'Open-world browser arcade RPG with warrior classes, dungeon exploration, combat, and inventory.',
    icon: 'fa-gamepad',
    url: 'game.html',
    category: 'gaming',
    badge: 'ACTION RPG',
    color: '#f59e0b'
  },
  {
    id: 'typingpractice',
    title: 'Typing Speed Test & Game',
    description: 'Interactive arcade typing test with words per minute (WPM), accuracy tracking, and leaderboard.',
    icon: 'fa-keyboard',
    url: 'typingpractice.html',
    category: 'gaming',
    badge: 'WPM TEST',
    color: '#6366f1'
  },
  {
    id: 'invoice',
    title: 'GST Invoice Generator',
    description: 'Create professional GST/Non-GST tax invoices with instant UPI payment QR, itemized tax, and PDF download.',
    icon: 'fa-file-invoice-dollar',
    url: 'invoice.html',
    category: 'business',
    badge: 'PDF + UPI',
    color: '#10b981'
  },
  {
    id: 'buisnesscard',
    title: 'Business Card Maker',
    description: 'Design sleek, professional business cards with custom branding, themes, typography, and print export.',
    icon: 'fa-id-card',
    url: 'buisnesscard.html',
    category: 'creative',
    badge: 'CUSTOMIZABLE',
    color: '#8b5cf6'
  },
  {
    id: 'logomaker',
    title: 'Vector Logo Maker',
    description: 'Create unique vector logos with custom typography, brand icons, color gradients, and SVG/PNG export.',
    icon: 'fa-shapes',
    url: 'logomaker.html',
    category: 'creative',
    badge: 'VECTOR ENGINE',
    color: '#f97316'
  },
  {
    id: 'backremover',
    title: 'AI Background Remover',
    description: 'Effortlessly remove background from photos with 1-click precision edge detection.',
    icon: 'fa-wand-magic-sparkles',
    url: 'backremover.html',
    category: 'image',
    badge: 'AI POWERED',
    color: '#ec4899'
  },
  {
    id: 'cropphoto',
    title: 'Image Cropper HD',
    description: 'Precision crop photos with interactive draggable bounding box, rotation, and aspect ratio presets.',
    icon: 'fa-crop',
    url: 'cropphoto.html',
    category: 'image',
    badge: 'CANVAS HD',
    color: '#f59e0b'
  },
  {
    id: 'imagecombiner',
    title: 'Image Merger & Stitcher',
    description: 'Combine multiple images vertically, horizontally, or into multi-page A4 PDF collage layouts.',
    icon: 'fa-layer-group',
    url: 'imagecombiner.html',
    category: 'image',
    badge: 'MULTI-PAGE',
    color: '#06b6d4'
  },
  {
    id: 'resizeimage',
    title: 'Image Resizer Pro',
    description: 'Resize photos to exact pixel dimensions, percentage scales, or 33 international paper standards.',
    icon: 'fa-expand',
    url: 'resizeimage.html',
    category: 'image',
    badge: '33 PRESETS',
    color: '#0284c7'
  },
  {
    id: 'imagelink',
    title: 'Image Link Generator',
    description: 'Upload images to generate instant shareable URLs, copy direct markdown links, and create QR codes.',
    icon: 'fa-link',
    url: 'imagelink.html',
    category: 'utility',
    badge: 'CLOUD HOST',
    color: '#6366f1'
  },
  {
    id: 'photogenerator',
    title: 'Photo & Image Generator',
    description: 'Search millions of ultra-HD royalty-free stock photos via curated Unsplash collections.',
    icon: 'fa-image',
    url: 'photogenerator.html',
    category: 'ai',
    badge: 'HD SEARCH',
    color: '#a855f7'
  },
  {
    id: 'pdfmaker',
    title: 'Image to PDF Generator',
    description: 'Convert collections of photos and scans into clean, unified multi-page A4 PDF documents.',
    icon: 'fa-file-pdf',
    url: 'pdfmaker.html',
    category: 'pdf',
    badge: 'PDF EXPORT',
    color: '#ef4444'
  },
  {
    id: 'pdfviewer',
    title: 'PDF Reader & Viewer',
    description: 'High-definition browser PDF reader with thumbnail navigation, zoom, rotation, and presentation mode.',
    icon: 'fa-book-open',
    url: 'pdfviewer.html',
    category: 'pdf',
    badge: 'PDF.JS',
    color: '#14b8a6'
  },
  {
    id: 'print',
    title: 'Print Studio Pro',
    description: 'Format, scale, and optimize documents for physical printing with borderless margins and duplex preview.',
    icon: 'fa-print',
    url: 'print.html',
    category: 'utility',
    badge: 'PRINT READY',
    color: '#4b5563'
  },
  {
    id: 'calculator',
    title: 'Enhanced Calculator',
    description: 'Scientific and standard calculator with square root, trigonometry, log, memory, and calculation history.',
    icon: 'fa-calculator',
    url: 'calculator.html',
    category: 'utility',
    badge: 'MATH.JS',
    color: '#3b82f6'
  },
  {
    id: 'currency',
    title: 'Live Currency Converter',
    description: 'Real-time exchange rate calculator supporting 160+ fiat currencies with forex fluctuation charts.',
    icon: 'fa-coins',
    url: 'currency.html',
    category: 'utility',
    badge: 'LIVE FOREX',
    color: '#10b981'
  },
  {
    id: 'unitconverter',
    title: 'Universal Unit Converter',
    description: 'Convert lengths, weights, temperatures, digital storage, speed, pressure, and energy units instantly.',
    icon: 'fa-ruler-combined',
    url: 'unitconverter.html',
    category: 'utility',
    badge: 'UNIVERSAL',
    color: '#f59e0b'
  },
  {
    id: 'qrcode',
    title: 'QR Code Studio',
    description: 'Generate customizable QR codes for URLs, WiFi networks, vCards, emails, and phone numbers.',
    icon: 'fa-qrcode',
    url: 'qrcode.html',
    category: 'utility',
    badge: 'CUSTOM QR',
    color: '#3b82f6'
  },
  {
    id: 'password',
    title: 'Secure Password Generator',
    description: 'Generate cryptographically secure passwords with custom character sets, entropy scores, and copy button.',
    icon: 'fa-key',
    url: 'password.html',
    category: 'security',
    badge: 'AES SECURE',
    color: '#ef4444'
  },
  {
    id: 'wordcounter',
    title: 'Smart Word Counter',
    description: 'Count words, characters, sentences, paragraphs, reading time, and keyword frequency density.',
    icon: 'fa-spell-check',
    url: 'wordcounter.html',
    category: 'utility',
    badge: 'ANALYTICS',
    color: '#8b5cf6'
  },
  {
    id: 'timer',
    title: 'Precision Stopwatch & Timer',
    description: 'High-precision millisecond stopwatch, interval timer, and Pomodoro focus clock with audio beeps.',
    icon: 'fa-stopwatch',
    url: 'timer.html',
    category: 'utility',
    badge: 'STOPWATCH',
    color: '#f97316'
  },
  {
    id: 'weather',
    title: 'Live Weather Radar',
    description: 'Accurate global weather forecasts, humidity, wind velocity, UV index, and 5-day temperature outlook.',
    icon: 'fa-cloud-sun',
    url: 'weather.html',
    category: 'utility',
    badge: 'GLOBAL FORECAST',
    color: '#06b6d4'
  },
  {
    id: 'emojis',
    title: 'Smart Emoji Picker & Studio',
    description: 'Search 1,120+ emojis, customize skin tones, compose messages, and inspect Unicode/HTML entities.',
    icon: 'fa-face-smile',
    url: 'emojis.html',
    category: 'creative',
    badge: '1120+ EMOJIS',
    color: '#ec4899'
  },
  {
    id: 'endchanger',
    title: 'File Extension Changer',
    description: 'Batch rename and change file extensions safely in-browser with zero upload bandwidth.',
    icon: 'fa-file-pen',
    url: 'endchanger.html',
    category: 'utility',
    badge: 'BATCH EXT',
    color: '#6366f1'
  },
  {
    id: 'print',
    title: 'Pro Print Studio',
    description: 'Ultra-HD PDF & photo printing with Odd/Even duplex, 2-Up paper saver, and mobile phone compatibility.',
    icon: 'fa-print',
    url: 'print.html',
    category: 'utility',
    badge: 'ULTRA HD',
    color: '#3b82f6'
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot Assistant',
    description: 'Intelligent conversational assistant powered by Google Gemini AI for instant Q&A and creative writing.',
    icon: 'fa-robot',
    url: 'chatbot.html',
    category: 'ai',
    badge: 'GEMINI AI',
    color: '#10b981'
  }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAudioSystem();
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initCommandPalette();
      initDropzones();
      initInteractiveLogo();
      initGlobalHotkeys();
    });
  } else {
    setTimeout(() => {
      initCommandPalette();
      initDropzones();
      initInteractiveLogo();
      initGlobalHotkeys();
    }, 50);
  }
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('aibots_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      playSound('click');
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('aibots_theme', theme);

  const themeIcons = document.querySelectorAll('.theme-toggle-btn i');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* ==========================================================================
   2. Web Audio Synthesizer & Sound Effects
   ========================================================================== */
let audioCtx = null;
let isMuted = localStorage.getItem('aibots_sound_muted') === 'true';

function initAudioSystem() {
  const soundToggles = document.querySelectorAll('.sound-toggle-btn');
  updateSoundToggleIcons();

  soundToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      isMuted = !isMuted;
      localStorage.setItem('aibots_sound_muted', isMuted);
      updateSoundToggleIcons();
      if (!isMuted) playSound('click');
      showToast(isMuted ? 'Sound effects muted' : 'Sound effects enabled 🔔', 'info');
    });
  });
}

function updateSoundToggleIcons() {
  const soundIcons = document.querySelectorAll('.sound-toggle-btn i');
  soundIcons.forEach(icon => {
    icon.className = isMuted ? 'fas fa-volume-xmark' : 'fas fa-volume-high';
  });
}

function playSound(type = 'click') {
  if (isMuted) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'four') {
      // Upbeat boundary fanfare chord
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.15, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.25);
      });
    } else if (type === 'six') {
      // Big power celebration chord
      [440, 554.37, 659.25, 880, 1108.73].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.18, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.4);
      });
    } else if (type === 'wicket') {
      // Dramatic drop / gong
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'success') {
      [587.33, 880].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.2);
      });
    }
  } catch (err) {
    console.debug('Audio error:', err);
  }
}

/* ==========================================================================
   3. Confetti Celebration Engine
   ========================================================================== */
let confettiCanvas = null;
let confettiCtx = null;
let confettiParticles = [];
let confettiAnimId = null;

function initConfetti() {
  // Lazily initialized on first launch to eliminate initial forced reflow
}

function launchConfetti(count = 80) {
  if (!confettiCanvas) {
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti-canvas';
    document.body.appendChild(confettiCanvas);
    confettiCtx = confettiCanvas.getContext('2d');
    window.addEventListener('resize', () => {
      if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      }
    }, { passive: true });
  }
  if (!confettiCtx) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const colors = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'];
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  if (!confettiAnimId) {
    animateConfetti();
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // gravity
    p.rotation += p.rSpeed;
    p.opacity -= 0.008;

    if (p.opacity <= 0 || p.y > confettiCanvas.height) {
      confettiParticles.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.globalAlpha = p.opacity;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimId = null;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

/* ==========================================================================
   4. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  toast.innerHTML = `
    <i class="fas ${iconMap[type] || iconMap.info}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ==========================================================================
   5. Command Palette (Ctrl + K / Quick Search)
   ========================================================================== */
function initCommandPalette() {
  const triggerBtn = document.getElementById('search-trigger-btn');
  const modalBackdrop = document.getElementById('command-palette-backdrop');
  const searchInput = document.getElementById('command-palette-input');
  const resultsContainer = document.getElementById('command-palette-results');

  if (!modalBackdrop) return;

  function openPalette() {
    modalBackdrop.classList.add('active');
    playSound('click');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
      renderPaletteResults('');
    }
  }

  function closePalette() {
    modalBackdrop.classList.remove('active');
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openPalette);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closePalette();
  });

  let paletteSearchDebounce = null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      renderPaletteResults(val);
      clearTimeout(paletteSearchDebounce);
      if (val.length >= 2) {
        paletteSearchDebounce = setTimeout(() => {
          if (typeof window.logSearchQueryToAdmin === 'function') {
            window.logSearchQueryToAdmin(val);
          }
        }, 800);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modalBackdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closePalette();
    }
  });

  function renderPaletteResults(query) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';

    const filtered = AI_BOTS_TOOLS.filter(tool => 
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.badge.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted);">
          <i class="fas fa-magnifying-glass" style="font-size: 1.8rem; margin-bottom: 8px; opacity: 0.5;"></i>
          <p>No tools matching "${query}"</p>
        </div>
      `;
      return;
    }

    filtered.forEach((tool, index) => {
      const item = document.createElement('a');
      item.href = tool.url;
      item.className = `command-item ${index === 0 ? 'selected' : ''}`;
      item.innerHTML = `
        <div class="command-item-icon"><i class="fas ${tool.icon}"></i></div>
        <div>
          <div style="font-weight: 600;">${tool.title}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">${tool.description}</div>
        </div>
        <span class="command-item-badge">${tool.badge}</span>
      `;
      resultsContainer.appendChild(item);
    });
  }
}

/* ==========================================================================
   6. Universal Dropzones & Clipboard Paste
   ========================================================================== */
function initDropzones() {
  const dropzones = document.querySelectorAll('.dropzone-container');
  dropzones.forEach(zone => {
    const input = zone.querySelector('input[type="file"]');
    if (!input) return;

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        playSound('pop');
      }
    });
  });

  window.addEventListener('paste', (e) => {
    const activeFileInput = document.querySelector('input[type="file"]');
    if (!activeFileInput) return;

    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        activeFileInput.files = dataTransfer.files;
        activeFileInput.dispatchEvent(new Event('change', { bubbles: true }));
        playSound('pop');
        showToast('Pasted image from clipboard!', 'success');
        break;
      }
    }
  });
}

/* ==========================================================================
   7. Interactive Bouncing / Throw Logo (Original Physics Feature)
   ========================================================================== */
function initInteractiveLogo() {
  const logoWrapper = document.querySelector('.hero-interactive-logo');
  if (!logoWrapper) return;

  let isDragging = false;
  let startX, startY;
  let offsetX = 0, offsetY = 0;
  let startTime;

  function startDrag(e) {
    isDragging = true;
    startTime = Date.now();
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    logoWrapper.style.transition = 'none';
  }

  function drag(e) {
    if (!isDragging) return;
    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    offsetX = currentX - startX;
    offsetY = currentY - startY;
    logoWrapper.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.1) rotate(${offsetX * 0.1}deg)`;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    const elapsed = Math.max((Date.now() - startTime) / 1000, 0.1);
    const velocityX = offsetX / elapsed;
    const velocityY = offsetY / elapsed;

    playSound('pop');
    logoWrapper.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    logoWrapper.style.transform = `translate(${offsetX + velocityX * 0.1}px, ${offsetY + velocityY * 0.1}px) rotate(${offsetX * 0.2}deg)`;

    setTimeout(() => {
      logoWrapper.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      logoWrapper.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
    }, 400);
  }

  logoWrapper.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', endDrag);

  logoWrapper.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', drag, { passive: true });
  window.addEventListener('touchend', endDrag);
}

/* ==========================================================================
   8. Global Keyboard Shortcuts & Cheatsheet
   ========================================================================== */
function initGlobalHotkeys() {
  document.addEventListener('keydown', (e) => {
    // ESC to close all open modals
    if (e.key === 'Escape') {
      const donateModal = document.getElementById('donation-modal');
      if (donateModal && donateModal.classList.contains('active')) {
        donateModal.classList.remove('active');
      }
      const shortcutsModal = document.getElementById('shortcuts-modal');
      if (shortcutsModal && shortcutsModal.classList.contains('active')) {
        shortcutsModal.classList.remove('active');
      }
    }
    // Open Shortcuts Cheatsheet with '?' (Shift + /)
    else if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      toggleShortcutsModal();
    }
    // Press '/' to search
    else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const searchBtn = document.getElementById('search-trigger-btn');
      if (searchBtn) searchBtn.click();
    }
  });
}

function toggleShortcutsModal() {
  let modal = document.getElementById('shortcuts-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'shortcuts-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-keyboard" style="color: var(--primary);"></i> Keyboard Shortcuts
          </h3>
          <button onclick="document.getElementById('shortcuts-modal').classList.remove('active')" class="btn btn-secondary btn-sm"><i class="fas fa-xmark"></i></button>
        </div>
        <div class="shortcut-row"><span>Quick Tool Search</span><span class="kbd-shortcut">Ctrl + K</span></div>
        <div class="shortcut-row"><span>Focus Search Bar</span><span class="kbd-shortcut">/</span></div>
        <div class="shortcut-row"><span>Paste Image to Upload</span><span class="kbd-shortcut">Ctrl + V</span></div>
        <div class="shortcut-row"><span>Shortcuts Cheatsheet</span><span class="kbd-shortcut">?</span></div>
        <div class="shortcut-row"><span>Close Modals</span><span class="kbd-shortcut">ESC</span></div>
      </div>
    `;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
    document.body.appendChild(modal);
  }
  modal.classList.toggle('active');
}

/* ==========================================================================
   9. UPI Donation & Support Modal (Privacy Protected)
   ========================================================================== */
window.AI_BOTS_UPI_CONFIG = {
  // Obfuscated / encoded to protect personal number privacy from scrapers
  _getUpi: function() {
    return atob('OTM4NDM2MTAwOEBtYms='); // 9384361008@mbk
  },
  name: 'Rishit Chajjed',
  maskedDisplay: 'Verified Creator Account (Rishit Chajjed)',
  note: 'Donated to AI Bots',
  defaultAmount: 50
};

window.closeDonationModal = function() {
  const modal = document.getElementById('donation-modal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.openUpiModal = function() { window.openDonationModal(); };
window.openDonationModal = function(opts) {
  opts = opts || {};
  let modal = document.getElementById('donation-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'donation-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="donation-modal-card">
        <!-- Top Sticky / Header Bar with Guaranteed Visible Close Button -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; width: 100%; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div id="donateModalIcon" class="donation-icon" style="margin: 0; width: 32px; height: 32px; font-size: 0.95rem;"><i class="fas fa-heart"></i></div>
            <h3 id="donateModalTitle" style="margin: 0; font-size: 1.1rem; font-weight: 800;">Support AI Bots</h3>
          </div>
          <button onclick="closeDonationModal()" class="btn btn-secondary btn-sm" style="border-radius: 50%; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 1rem; cursor: pointer; border: 1px solid var(--border-color);" title="Close Modal">
            <i class="fas fa-xmark"></i>
          </button>
        </div>

        <p id="donateModalDesc" style="margin: 0 0 10px; color: var(--text-secondary); font-size: 0.84rem; line-height: 1.5;">
          Enter any amount you wish to contribute to keep all 35+ tools 100% free!
        </p>

        <!-- Custom Amount Input -->
        <div style="margin: 8px 0 6px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span style="font-size: 1.2rem; font-weight: 800; color: var(--primary);">&#8377;</span>
            <input type="number" id="customDonateInput" class="form-control" value="50" min="1" step="any" placeholder="Any Amount" style="max-width: 130px; font-size: 1.15rem; font-weight: 800; text-align: center; font-family: monospace; padding: 6px;" oninput="handleCustomDonationInput(this.value)">
          </div>
        </div>

        <!-- Quick Amount Chips -->
        <div class="donation-amount-chips" style="margin: 6px 0 10px;">
          <button class="donation-chip" onclick="setDonationAmount(20, this)">&#8377;20</button>
          <button class="donation-chip active" onclick="setDonationAmount(50, this)">&#8377;50</button>
          <button class="donation-chip" onclick="setDonationAmount(100, this)">&#8377;100</button>
          <button class="donation-chip" onclick="setDonationAmount(250, this)">&#8377;250</button>
          <button class="donation-chip" onclick="setDonationAmount(500, this)">&#8377;500</button>
        </div>

        <!-- Dynamic QR Code -->
        <div class="upi-qr-wrapper" style="padding: 8px; margin: 6px 0;">
          <img id="donateQrImg" src="" alt="Scan to Donate to AI Bots" style="width: 150px; height: 150px;">
        </div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 700;">
          <i class="fas fa-qrcode" style="color:var(--primary); margin-right:4px;"></i> Scan with GPay / PhonePe / Paytm / BHIM
        </div>

        <!-- Verified Creator Badge -->
        <div class="upi-id-badge" style="justify-content: center; gap: 8px; color: var(--text-secondary); margin: 8px 0; padding: 6px 10px; font-size: 0.78rem;">
          <i class="fas fa-shield-check" style="color: var(--success); font-size: 0.95rem;"></i>
          <span style="font-weight: 700;">Verified Creator &bull; Note: "Donated to AI Bots"</span>
        </div>

        <!-- Direct Mobile Pay Button -->
        <a id="donateDirectLink" href="#" class="btn btn-primary" style="width: 100%; padding: 10px; font-weight: 800; border-radius: var(--radius-md); text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.9rem; background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); border-color: #ec4899;">
          <i class="fas fa-mug-hot"></i> <span id="donateCtaText">Buy Creator a Coffee</span>
        </a>

        <!-- Bottom Close / Maybe Later Button -->
        <button id="donateLaterBtn" onclick="closeDonationModal()" class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 8px; padding: 7px; border-radius: var(--radius-md); font-weight: 600;">
          Close Window
        </button>

        <div class="upi-apps-row" style="margin-top: 8px;">
          <span><i class="fas fa-lock" style="color:var(--success);"></i> 100% Direct to Creator</span>
          <span>•</span>
          <span>Zero Commission</span>
        </div>
      </div>
    `;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeDonationModal();
    });
    document.body.appendChild(modal);
  }

  // Update dynamic fields based on opts
  const titleEl = document.getElementById('donateModalTitle');
  const descEl = document.getElementById('donateModalDesc');
  const iconEl = document.getElementById('donateModalIcon');
  const ctaTextEl = document.getElementById('donateCtaText');
  const laterBtnEl = document.getElementById('donateLaterBtn');

  if (titleEl) titleEl.textContent = opts.title || 'Support AI Bots';
  if (descEl) descEl.textContent = opts.desc || 'Enter any amount you wish to contribute to keep all 35+ tools 100% free!';
  if (iconEl) {
    iconEl.innerHTML = opts.isAfterSuccess ? '<i class="fas fa-mug-hot"></i>' : '<i class="fas fa-heart"></i>';
  }
  if (ctaTextEl) {
    ctaTextEl.textContent = opts.ctaText || 'Buy Creator a Coffee';
  }
  if (laterBtnEl) {
    laterBtnEl.textContent = opts.isAfterSuccess ? 'Maybe Later' : 'Close Window';
  }

  const defaultAmt = opts.defaultAmount || window.AI_BOTS_UPI_CONFIG.defaultAmount || 50;
  const input = document.getElementById('customDonateInput');
  if (input) input.value = defaultAmt;
  document.querySelectorAll('.donation-chip').forEach(c => {
    c.classList.toggle('active', c.textContent.replace(/[^\d]/g, '') == defaultAmt);
  });

  updateDonationQR(defaultAmt);
  modal.classList.add('active');
};

/**
 * Polite "After-Success" Modal triggered after a major user achievement
 * (e.g. converting bank statements, removing background from photo).
 * Features a session storage cooldown so it only displays once per session.
 */
window.showSuccessAppreciationModal = function(opts) {
  opts = opts || {};
  const toolName = opts.toolName || 'tool';
  const sessionKey = 'aibots_coffee_modal_' + toolName;

  // Show at most once per session per tool so user experience stays polite and frictionless
  if (sessionStorage.getItem(sessionKey)) {
    return;
  }
  sessionStorage.setItem(sessionKey, 'true');

  const savedTime = opts.savedTime || '30 minutes';
  const title = opts.title || `Saved you ${savedTime} of work? ☕`;
  const desc = opts.message || 'Consider buying Rishit a coffee (₹20 or ₹50) to keep AI Bots 100% free & ad-light!';

  window.openDonationModal({
    title: title,
    desc: desc,
    defaultAmount: opts.defaultAmount || 50,
    ctaText: '☕ Buy Rishit a Coffee',
    isAfterSuccess: true
  });
};

window.setDonationAmount = function(amt, btn) {
  document.querySelectorAll('.donation-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const input = document.getElementById('customDonateInput');
  if (input) input.value = amt;
  updateDonationQR(amt);
};

window.handleCustomDonationInput = function(val) {
  document.querySelectorAll('.donation-chip').forEach(c => c.classList.remove('active'));
  const amt = parseFloat(val) || 0;
  updateDonationQR(amt > 0 ? amt : '');
};

window.updateDonationQR = function(amt) {
  const customUpi = JSON.parse(localStorage.getItem('aibots_custom_upi_config') || '{}');
  const upiId = customUpi.id || window.AI_BOTS_UPI_CONFIG._getUpi();
  const name = customUpi.name || window.AI_BOTS_UPI_CONFIG.name;
  const note = encodeURIComponent(window.AI_BOTS_UPI_CONFIG.note);
  
  // Standard UPI URI specification
  let upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&tn=${note}&cu=INR`;
  if (amt && amt > 0) {
    upiUrl += `&am=${amt}`;
  }
  
  // Update QR Code Image
  const qrImg = document.getElementById('donateQrImg');
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;
  }

  // Update Direct Mobile Deep Link
  const directLink = document.getElementById('donateDirectLink');
  if (directLink) {
    directLink.href = upiUrl;
  }
};

// Global Site Announcement Banner System
(function() {
  window.renderGlobalAnnouncement = function() {
    try {
      const existing = document.getElementById('aibotsGlobalAnnouncementBanner');
      if (existing) existing.remove();

      const saved = JSON.parse(localStorage.getItem('aibots_global_announcement') || '{}');
      if (saved && saved.enabled && saved.text) {
        if (sessionStorage.getItem('aibots_announcement_dismissed') === 'true') return;

        const themes = {
          primary: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          success: 'linear-gradient(135deg, #059669, #10b981)',
          warning: 'linear-gradient(135deg, #d97706, #f59e0b)',
          danger: 'linear-gradient(135deg, #dc2626, #ef4444)'
        };

        const bg = themes[saved.theme] || themes.primary;
        const banner = document.createElement('div');
        banner.id = 'aibotsGlobalAnnouncementBanner';
        banner.style.cssText = `
          background: ${bg};
          color: #ffffff;
          padding: 10px 16px;
          text-align: center;
          font-size: 0.88rem;
          font-weight: 700;
          position: sticky;
          top: 0;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        `;

        let content = `<span>${saved.text}</span>`;
        if (saved.link) {
          content += `<a href="${saved.link}" style="color: #ffffff; text-decoration: underline; font-weight: 800; margin-left: 6px;">Learn More &rarr;</a>`;
        }
        content += `<button onclick="document.getElementById('aibotsGlobalAnnouncementBanner').remove(); sessionStorage.setItem('aibots_announcement_dismissed', 'true');" style="background: rgba(255,255,255,0.25); border: none; color: white; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; margin-left: 10px; font-size: 0.75rem; display: flex; align-items: center; justify-content: center;" title="Dismiss">&times;</button>`;

        banner.innerHTML = content;
        document.body.insertBefore(banner, document.body.firstChild);
      }
    } catch(e) {
      console.warn('Announcement parser error:', e);
    }
  };

  // Welcome Popup Modal Handler
  window.renderWelcomeModal = function(forceShow = false) {
    try {
      const existing = document.getElementById('aibotsWelcomeModalOverlay');
      if (existing) existing.remove();

      const modalCfg = JSON.parse(localStorage.getItem('aibots_welcome_modal_config') || '{}');
      if (forceShow || (modalCfg && modalCfg.enabled && modalCfg.title)) {
        if (!forceShow && sessionStorage.getItem('aibots_welcome_modal_shown') === 'true') return;

        const modalDiv = document.createElement('div');
        modalDiv.id = 'aibotsWelcomeModalOverlay';
        modalDiv.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.68); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px;
        `;
        modalDiv.innerHTML = `
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 36px 30px; max-width: 480px; width: 100%; box-shadow: var(--shadow-xl); text-align: center; animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="font-size: 2.6rem; margin-bottom: 12px;"><i class="fas fa-sparkles" style="color: var(--primary);"></i></div>
            <h2 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 10px; color: var(--text-primary);">${modalCfg.title || '🎉 Welcome to AI Bots!'}</h2>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">${modalCfg.body || 'Enjoy 28+ free creative tools with zero ads or sign-ups.'}</p>
            <button onclick="document.getElementById('aibotsWelcomeModalOverlay').remove(); sessionStorage.setItem('aibots_welcome_modal_shown', 'true');" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 800; font-size: 0.95rem;">
              <i class="fas fa-rocket"></i> Explore Studio
            </button>
          </div>
        `;
        document.body.appendChild(modalDiv);
      }
    } catch(e) {}
  };

  // Festive Visual Effects Handler
  function renderFestiveEffects() {
    try {
      const effects = JSON.parse(localStorage.getItem('aibots_festive_effects') || '{}');
      if (effects.confetti && typeof confetti === 'function') {
        setTimeout(() => {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }, 600);
      }

      if (effects.snow) {
        const snowContainer = document.createElement('div');
        snowContainer.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:9999; overflow:hidden;';
        for (let i = 0; i < 30; i++) {
          const flake = document.createElement('div');
          flake.innerHTML = '❄';
          flake.style.cssText = `
            position: absolute; color: #93c5fd; opacity: ${Math.random() * 0.7 + 0.3};
            font-size: ${Math.random() * 14 + 10}px; left: ${Math.random() * 100}vw; top: -20px;
            animation: fallSnow ${Math.random() * 6 + 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
          `;
          snowContainer.appendChild(flake);
        }
        const style = document.createElement('style');
        style.textContent = `@keyframes fallSnow { to { transform: translateY(105vh) rotate(360deg); } }`;
        document.head.appendChild(style);
        document.body.appendChild(snowContainer);
      }
    } catch(e) {}
  }

  // Global Cloud Analytics Logger (Worldwide Multi-Device Telemetry via Google Drive)
  const GOOGLE_DRIVE_CLOUD_API = 'https://script.google.com/macros/s/AKfycbwXmAujjr_UEo1keKOfC0yWuUHoIzmP1OL7pR7HelrasdaDtCYyC0BMyh6mI5731XPrvQ/exec';

  window.recordToolLaunchClick = function(toolId) {
    if (!toolId || toolId === 'index' || toolId === 'admin' || toolId === '#' || toolId.startsWith('http')) return;
    
    // Prevent double counting within 2 seconds (e.g. click on card + immediate page load)
    const debounceKey = `aibots_last_launch_${toolId}`;
    const lastLaunch = Number(sessionStorage.getItem(debounceKey) || 0);
    const now = Date.now();
    if (now - lastLaunch < 2000) return; // Prevent duplicate increment
    sessionStorage.setItem(debounceKey, now.toString());

    try {
      const clicks = JSON.parse(localStorage.getItem('aibots_tool_click_analytics') || '{}');
      clicks[toolId] = (Number(clicks[toolId]) || 0) + 1;
      localStorage.setItem('aibots_tool_click_analytics', JSON.stringify(clicks));

      const activeHash = localStorage.getItem('aibots_admin_master_hash') || "25db1abcf4f86ca6a3f1927a722063f35c46ae2986e64fe56ae2241463f6d0c0";
      const payload = {
        action: 'record_click',
        tool_id: toolId,
        admin_password_hash: activeHash,
        global_maintenance: localStorage.getItem('aibots_global_maintenance') === 'true',
        disabled_tools: JSON.parse(localStorage.getItem('aibots_disabled_tools') || '[]'),
        featured_tool: localStorage.getItem('aibots_featured_tool') || '',
        announcement: JSON.parse(localStorage.getItem('aibots_global_announcement') || '{}'),
        welcome_modal: JSON.parse(localStorage.getItem('aibots_welcome_modal_config') || '{}'),
        festive_effects: JSON.parse(localStorage.getItem('aibots_festive_effects') || '{}'),
        upi_config: JSON.parse(localStorage.getItem('aibots_custom_upi_config') || '{"id":"9384361008@mbk","name":"Rishit Chajjed","chips":"20, 50, 100, 250, 500"}'),
        analytics_clicks: clicks,
        analytics_searches: JSON.parse(localStorage.getItem('aibots_search_query_log') || '[]'),
        updated_at: new Date().toISOString()
      };

      const cloudApi = localStorage.getItem('aibots_custom_cloud_endpoint') || GOOGLE_DRIVE_CLOUD_API;

      // Push to Google Drive 24/7 Cloud API with keepalive
      fetch(cloudApi, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
        keepalive: true
      }).catch(() => {});
    } catch(e) {}
  };

  // Tool Click & Page Launch Analytics Logger
  function setupToolAnalyticsLogger() {
    // 1. Detect clicks on tool cards, action cards, and navigation links
    document.addEventListener('click', (e) => {
      const card = e.target.closest('a.tool-card, a.action-card, a.shortcut-item, a[href$=".html"]');
      if (card) {
        let tool = card.dataset.tool;
        if (!tool) {
          const href = card.getAttribute('href') || '';
          tool = href.split('?')[0].split('#')[0].replace('.html', '').replace('./', '').replace('/', '').trim();
        }
        if (tool && tool !== 'index' && tool !== 'admin' && tool !== '#' && !tool.startsWith('http')) {
          window.recordToolLaunchClick(tool);
        }
      }
    });

    // 2. Detect direct tool page visits (e.g. user opens bookmarked tool page)
    const currentPath = window.location.pathname.split('/').pop().replace('.html', '').trim();
    if (currentPath && currentPath !== 'index' && currentPath !== 'admin' && currentPath !== '') {
      window.recordToolLaunchClick(currentPath);
    }
  }

  // Helper: Find a tool card by toolId using data-tool, href, and fallback aliases
  function findToolCard(toolId) {
    if (!toolId) return null;
    return document.querySelector(
      `.tool-card[data-tool="${toolId}"], ` +
      `.tool-card[href="${toolId}.html"], ` +
      `.tool-card[href*="${toolId}"]` +
      (toolId === 'bank-statement-converter' ? ', .tool-card[data-tool="tallyconverter"]' : '')
    );
  }

  // Featured Tool Highlight on Homepage
  function highlightFeaturedTool() {
    // 1. Reset any previously highlighted featured card
    document.querySelectorAll('.tool-card.is-featured-card').forEach(card => {
      card.classList.remove('is-featured-card');
      card.style.border = '';
      card.style.boxShadow = '';
      const badge = card.querySelector('.tool-badge-pill');
      if (badge) {
        badge.classList.remove('badge-featured');
        badge.style.background = '';
        badge.style.color = '';
        badge.style.boxShadow = '';
        if (badge.dataset.originalText) {
          badge.textContent = badge.dataset.originalText;
        } else if (badge.dataset.wasAutoCreated === 'true') {
          badge.remove();
        }
      }
    });

    const featuredId = localStorage.getItem('aibots_featured_tool');
    if (featuredId) {
      const card = findToolCard(featuredId);
      if (card && !card.classList.contains('is-maintenance-card')) {
        card.classList.add('is-featured-card');
        card.style.border = '2px solid #f59e0b';
        card.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.45)';
        let badge = card.querySelector('.tool-badge-pill');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'tool-badge-pill badge-featured';
          badge.dataset.wasAutoCreated = 'true';
          card.prepend(badge);
        } else {
          if (!badge.dataset.originalText && !badge.classList.contains('badge-maintenance')) {
            badge.dataset.originalText = badge.textContent.trim();
          }
          badge.className = 'tool-badge-pill badge-featured';
        }
        badge.textContent = '⭐ FEATURED';
        badge.style.background = 'linear-gradient(135deg, #f59e0b, #ef4444)';
        badge.style.color = '#ffffff';
      }
    }
  }

  // Maintenance Mode Shield Engine (Global & Individual Tools)
  function checkMaintenanceShield() {
    const isCurrentAdmin = window.location.pathname.toLowerCase().includes('admin');
    if (isCurrentAdmin) return;

    // 1. Check Global Site Maintenance
    const globalMaintenance = localStorage.getItem('aibots_global_maintenance') === 'true';
    if (globalMaintenance) {
      document.body.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; text-align: center; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans);">
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 40px 30px; max-width: 540px; width: 100%; box-shadow: var(--shadow-xl);">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); color: #f59e0b; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 20px;">
              <i class="fas fa-screwdriver-wrench"></i>
            </div>
            <h1 style="font-size: 1.8rem; font-weight: 900; margin-bottom: 10px;">Platform Under Maintenance</h1>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
              AI Bots is currently undergoing scheduled platform upgrades to bring you exciting new creative tools and performance boosts. We will be back online shortly!
            </p>
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <button onclick="location.reload()" class="btn btn-primary" style="padding: 12px 24px; font-weight: 800;">
                <i class="fas fa-rotate-right"></i> Check Again
              </button>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 20px;">&copy; 2026 AI Bots &bull; System Maintenance</p>
          </div>
        </div>
      `;
      return;
    }

    // 2. Check Individual Tool Maintenance on tool pages
    const disabledTools = JSON.parse(localStorage.getItem('aibots_disabled_tools') || '[]');
    const currentPath = window.location.pathname.split('/').pop().replace('.html', '').trim();
    if (disabledTools.includes(currentPath)) {
      const toolObj = (typeof AI_BOTS_TOOLS !== 'undefined') ? AI_BOTS_TOOLS.find(t => t.id === currentPath) : null;
      const toolTitle = toolObj ? toolObj.title : 'This Tool';

      document.body.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; text-align: center; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans);">
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 40px 30px; max-width: 500px; width: 100%; box-shadow: var(--shadow-xl);">
            <div style="width: 75px; height: 75px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); color: #f59e0b; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px;">
              <i class="fas fa-triangle-exclamation"></i>
            </div>
            <h1 style="font-size: 1.6rem; font-weight: 900; margin-bottom: 8px;">${toolTitle} is Under Maintenance</h1>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
              We are currently fine-tuning and upgrading this tool to improve speed and reliability. Please explore our other 28+ tools while we finish!
            </p>
            <a href="index.html" class="btn btn-primary" style="padding: 12px 24px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px;">
              <i class="fas fa-house"></i> Return to Studio Hub
            </a>
          </div>
        </div>
      `;
      return;
    }

    // 3. Clear existing maintenance state from all cards on homepage
    document.querySelectorAll('.tool-card.is-maintenance-card').forEach(card => {
      card.classList.remove('is-maintenance-card');
      card.style.opacity = '';
      card.style.cursor = '';
      card.style.border = '';
      card.onclick = null;
      const badge = card.querySelector('.tool-badge-pill');
      if (badge) {
        badge.classList.remove('badge-maintenance');
        badge.style.background = '';
        badge.style.color = '';
        if (badge.dataset.originalText) {
          badge.textContent = badge.dataset.originalText;
        } else if (badge.dataset.wasAutoCreated === 'true') {
          badge.remove();
        }
      }
    });

    // 4. Update homepage cards for disabled tools
    if (disabledTools.length > 0) {
      disabledTools.forEach(toolId => {
        const card = findToolCard(toolId);
        if (card) {
          card.classList.add('is-maintenance-card');
          card.style.opacity = '0.65';
          card.style.cursor = 'not-allowed';
          card.style.border = '2px dashed #ef4444';
          let badge = card.querySelector('.tool-badge-pill');
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'tool-badge-pill badge-maintenance';
            badge.dataset.wasAutoCreated = 'true';
            card.prepend(badge);
          } else {
            if (!badge.dataset.originalText) {
              badge.dataset.originalText = badge.textContent.trim();
            }
            badge.className = 'tool-badge-pill badge-maintenance';
          }
          badge.textContent = '🛠️ MAINTENANCE';
          badge.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
          badge.style.color = '#ffffff';

          card.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof showToast === 'function') {
              showToast('This tool is currently undergoing maintenance. Please check back shortly!', 'warning');
            } else {
              alert('This tool is currently undergoing maintenance. Please check back shortly!');
            }
          };
        }
      });
    }
  }

  // Multi-Layer Global Online Cloud Sync Engine
  const CLOUD_ENDPOINTS = [
    'https://script.google.com/macros/s/AKfycbwXmAujjr_UEo1keKOfC0yWuUHoIzmP1OL7pR7HelrasdaDtCYyC0BMyh6mI5731XPrvQ/exec',
    'config.json',
    'https://raw.githubusercontent.com/Rishitchajjed/aibots/main/config.json'
  ];
  
  window.fetchAndApplyGlobalCloudConfig = async function() {
    const customEndpoint = localStorage.getItem('aibots_custom_cloud_endpoint');
    const endpoints = customEndpoint ? [customEndpoint, ...CLOUD_ENDPOINTS] : CLOUD_ENDPOINTS;

    for (let i = 0; i < endpoints.length; i++) {
      const endpoint = endpoints[i];
      const isPrimaryCloud = (i === 0);
      try {
        const url = endpoint.includes('?') ? `${endpoint}&_=${Date.now()}` : `${endpoint}?_=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const txt = await res.text();
          const cleanTxt = txt.replace(/^\uFEFF/, '').trim();
          let parsed = JSON.parse(cleanTxt);
          if (Array.isArray(parsed) && parsed.length > 0) parsed = parsed[0];
          const cloud = (parsed && typeof parsed === 'object' && parsed.data) ? parsed.data : parsed;
          if (cloud && typeof cloud === 'object') {
            if (cloud.global_maintenance !== undefined) {
              localStorage.setItem('aibots_global_maintenance', cloud.global_maintenance ? 'true' : 'false');
            }
            if (cloud.disabled_tools !== undefined) {
              localStorage.setItem('aibots_disabled_tools', JSON.stringify(cloud.disabled_tools));
            }
            if (cloud.featured_tool) {
              localStorage.setItem('aibots_featured_tool', cloud.featured_tool);
            }
            if (cloud.announcement && Object.keys(cloud.announcement).length > 0) {
              localStorage.setItem('aibots_global_announcement', JSON.stringify(cloud.announcement));
            }
            if (cloud.welcome_modal && Object.keys(cloud.welcome_modal).length > 0) {
              localStorage.setItem('aibots_welcome_modal_config', JSON.stringify(cloud.welcome_modal));
            }
            if (cloud.festive_effects && Object.keys(cloud.festive_effects).length > 0) {
              localStorage.setItem('aibots_festive_effects', JSON.stringify(cloud.festive_effects));
            }
            if (cloud.upi_config && cloud.upi_config.id) {
              localStorage.setItem('aibots_custom_upi_config', JSON.stringify(cloud.upi_config));
            }
            if (cloud.analytics_clicks && Object.keys(cloud.analytics_clicks).length > 0) {
              const localClicks = JSON.parse(localStorage.getItem('aibots_tool_click_analytics') || '{}');
              localStorage.setItem('aibots_tool_click_analytics', JSON.stringify({ ...localClicks, ...cloud.analytics_clicks }));
            }
            if (Array.isArray(cloud.analytics_searches) && cloud.analytics_searches.length > 0) {
              localStorage.setItem('aibots_search_query_log', JSON.stringify(cloud.analytics_searches));
            }

            // Re-evaluate reactive components
            checkMaintenanceShield();
            window.renderGlobalAnnouncement();
            window.renderWelcomeModal();
            highlightFeaturedTool();
            break; // Successfully loaded and applied
          }
        }
      } catch(err) {
        // Try next fallback endpoint
      }
    }
  };

  const initAllAdminModules = () => {
    checkMaintenanceShield();
    renderGlobalAnnouncement();
    renderWelcomeModal();
    renderFestiveEffects();
    setupToolAnalyticsLogger();
    highlightFeaturedTool();
    window.fetchAndApplyGlobalCloudConfig();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAdminModules);
  } else {
    initAllAdminModules();
  }
})();

// ==========================================================================
// Progressive Web App (PWA) — Service Worker & Install Prompt Manager
// ==========================================================================
(function initPWA() {
  let deferredInstallPrompt = null;

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Capture 'beforeinstallprompt' for Android/Chrome/Edge/Windows/Mac
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    window.deferredInstallPrompt = e;

    // Show Install App buttons if present on page
    const installBtns = document.querySelectorAll('.pwa-install-btn, #pwaInstallNavBtn, #pwaFloatingInstall');
    installBtns.forEach(btn => {
      btn.style.display = 'inline-flex';
    });
  });

  // 3. Global Install Trigger Function
  window.installAIbotsPWA = function() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          if (typeof showToast === 'function') {
            showToast('🎉 AI Bots installed successfully! Check your home screen/apps.', 'success');
          }
          const installBtns = document.querySelectorAll('.pwa-install-btn, #pwaInstallNavBtn, #pwaFloatingInstall');
          installBtns.forEach(btn => btn.style.display = 'none');
        }
        deferredInstallPrompt = null;
      });
    } else {
      // Check if iOS Safari
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

      if (isStandalone) {
        if (typeof showToast === 'function') {
          showToast('✨ AI Bots is already installed and running as an app!', 'info');
        }
      } else if (isIos) {
        if (typeof showToast === 'function') {
          showToast('📲 To install on iPhone: Tap "Share" (⬆) at the bottom, then select "Add to Home Screen" (➕)!', 'info', 7000);
        } else {
          alert('📲 To install on iPhone/iPad:\n1. Tap the Share button (square with arrow up)\n2. Scroll down and tap "Add to Home Screen"');
        }
      } else {
        if (typeof showToast === 'function') {
          showToast('📲 Tap the install icon (⬇) in your browser address bar to install AI Bots!', 'info', 5000);
        }
      }
    }
  };

  // 4. Log successful appinstalled event
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] AI Bots was installed to the device home screen/apps!');
    const installBtns = document.querySelectorAll('.pwa-install-btn, #pwaInstallNavBtn, #pwaFloatingInstall');
    installBtns.forEach(btn => btn.style.display = 'none');
  });
})();







