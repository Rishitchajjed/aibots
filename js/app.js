/**
 * AI Bots Creative Studio - Core Shared Script
 * Handles Themes, Audio Synthesizer, Confetti Celebrations, Command Palette, File Dropzones, and Logo Physics.
 */

// Tools Registry for Search and Navigation
const AI_BOTS_TOOLS = [
  {
    id: 'cricketscore',
    title: 'Cricket Score Counter',
    description: 'Live match scoring board with batsmen/bowler stats, extras, overs, and scorecard export.',
    icon: 'fa-baseball-bat-ball',
    url: 'cricketscore.html',
    category: 'utility',
    badge: 'Pro Scorer',
    color: '#10b981'
  },
  {
    id: 'backremover',
    title: 'Background Remover',
    description: 'Effortlessly remove background from photos with 1-click precision.',
    icon: 'fa-wand-magic-sparkles',
    url: 'backremover.html',
    category: 'image',
    badge: 'AI Powered',
    color: '#ec4899'
  },
  {
    id: 'buisnesscard',
    title: 'Business Card Maker',
    description: 'Design sleek, professional business cards with custom branding & live preview.',
    icon: 'fa-id-card',
    url: 'buisnesscard.html',
    category: 'creative',
    badge: 'Customizable',
    color: '#8b5cf6'
  },
  {
    id: 'calculator',
    title: 'Enhanced Calculator',
    description: 'Scientific and standard calculator with square root, exponentiation, and math history.',
    icon: 'fa-calculator',
    url: 'calculator.html',
    category: 'utility',
    badge: 'Math.js',
    color: '#3b82f6'
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot Assistant',
    description: 'Instant interactive assistant to answer questions, guide tools, and chat.',
    icon: 'fa-robot',
    url: 'chatbot.html',
    category: 'ai',
    badge: 'Interactive',
    color: '#10b981'
  },
  {
    id: 'cropphoto',
    title: 'Image Cropper',
    description: 'Precision crop photos with interactive draggable bounding box and aspect ratios.',
    icon: 'fa-crop',
    url: 'cropphoto.html',
    category: 'image',
    badge: 'Canvas HD',
    color: '#f59e0b'
  },
  {
    id: 'imagecombiner',
    title: 'Image Merger & Combiner',
    description: 'Combine multiple images into organized single or multi-page A4/A3/Custom layouts.',
    icon: 'fa-layer-group',
    url: 'imagecombiner.html',
    category: 'image',
    badge: 'Multi-Page',
    color: '#06b6d4'
  },
  {
    id: 'imagelink',
    title: 'Image Link Generator',
    description: 'Upload images to get instant shareable URLs, copy to clipboard, and generate QR codes.',
    icon: 'fa-link',
    url: 'imagelink.html',
    category: 'utility',
    badge: 'Cloud Host',
    color: '#6366f1'
  },
  {
    id: 'logomaker',
    title: 'Vector Logo Maker',
    description: 'Create unique vector logos with custom typography, shapes, colors, and sizing.',
    icon: 'fa-shapes',
    url: 'logomaker.html',
    category: 'creative',
    badge: 'Vector Engine',
    color: '#f97316'
  },
  {
    id: 'pdfmaker',
    title: 'Image to PDF Generator',
    description: 'Convert image collections into clean, beautifully formatted A4 PDF documents.',
    icon: 'fa-file-pdf',
    url: 'pdfmaker.html',
    category: 'pdf',
    badge: 'PDF Export',
    color: '#ef4444'
  },
  {
    id: 'pdfviewer',
    title: 'PDF Reader & Viewer',
    description: 'High-definition PDF viewer with page thumbnails, fullscreen reader, and swipe gestures.',
    icon: 'fa-book-open',
    url: 'pdfviewer.html',
    category: 'pdf',
    badge: 'PDF.js Reader',
    color: '#14b8a6'
  },
  {
    id: 'photogenerator',
    title: 'Photo & Image Generator',
    description: 'Search millions of high-resolution royalty-free photos via Unsplash integration.',
    icon: 'fa-image',
    url: 'photogenerator.html',
    category: 'ai',
    badge: 'HD Search',
    color: '#a855f7'
  },
  {
    id: 'resizeimage',
    title: 'Image Resizer',
    description: 'Resize photos to exact pixel dimensions or standard international paper sizes (A0-A10, B, C).',
    icon: 'fa-expand',
    url: 'resizeimage.html',
    category: 'image',
    badge: 'Exact Presets',
    color: '#0284c7'
  }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAudioSystem();
  initCommandPalette();
  initDropzones();
  initInteractiveLogo();
  initGlobalHotkeys();
  initConfetti();
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
  confettiCanvas = document.createElement('canvas');
  confettiCanvas.id = 'confetti-canvas';
  document.body.appendChild(confettiCanvas);
  confettiCtx = confettiCanvas.getContext('2d');

  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function launchConfetti(count = 80) {
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

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderPaletteResults(e.target.value.toLowerCase().trim());
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
    // Open Shortcuts Cheatsheet with '?' (Shift + /)
    if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
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
  defaultAmount: 100
};

window.openDonationModal = function() {
  let modal = document.getElementById('donation-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'donation-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="donation-modal-card">
        <button onclick="document.getElementById('donation-modal').classList.remove('active')" class="btn btn-secondary btn-sm" style="position: absolute; top: 16px; right: 16px; border-radius: 50%; width: 32px; height: 32px; padding: 0;">
          <i class="fas fa-xmark"></i>
        </button>

        <div class="donation-icon"><i class="fas fa-heart"></i></div>
        <h3 style="margin: 0 0 6px; font-size: 1.25rem;">Support AI Bots</h3>
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">
          Help keep all 28+ creative browser tools 100% free & fast for everyone!
        </p>

        <!-- Preset Amount Chips -->
        <div class="donation-amount-chips">
          <button class="donation-chip" onclick="setDonationAmount(50, this)">₹50</button>
          <button class="donation-chip active" onclick="setDonationAmount(100, this)">₹100</button>
          <button class="donation-chip" onclick="setDonationAmount(250, this)">₹250</button>
          <button class="donation-chip" onclick="setDonationAmount(500, this)">₹500</button>
          <button class="donation-chip" onclick="setDonationAmount(1000, this)">₹1,000</button>
        </div>

        <!-- Dynamic QR Code -->
        <div class="upi-qr-wrapper">
          <img id="donateQrImg" src="" alt="Scan to Support via UPI">
        </div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 700;">
          <i class="fas fa-qrcode" style="color:var(--primary); margin-right:4px;"></i> Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
        </div>

        <!-- Verified Creator Badge (Protects Phone Number from Public Display) -->
        <div class="upi-id-badge" style="justify-content: center; gap: 8px; color: var(--text-secondary);">
          <i class="fas fa-shield-check" style="color: var(--success); font-size: 1rem;"></i>
          <span id="donateUpiText" style="font-weight: 700;">Verified Creator Account</span>
        </div>

        <!-- Direct Mobile Pay Button -->
        <a id="donateDirectLink" href="#" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 800; border-radius: var(--radius-md); text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fas fa-mobile-screen"></i> Pay with UPI App (GPay / PhonePe)
        </a>

        <div class="upi-apps-row">
          <span><i class="fas fa-lock" style="color:var(--success);"></i> 100% Direct & Safe</span>
          <span>•</span>
          <span>Zero Platform Fees</span>
        </div>
      </div>
    `;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
    document.body.appendChild(modal);
  }

  updateDonationQR(window.AI_BOTS_UPI_CONFIG.defaultAmount);
  modal.classList.add('active');
};

window.setDonationAmount = function(amt, btn) {
  document.querySelectorAll('.donation-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateDonationQR(amt);
};

window.updateDonationQR = function(amt) {
  const upiId = window.AI_BOTS_UPI_CONFIG._getUpi();
  const name = window.AI_BOTS_UPI_CONFIG.name;
  const note = encodeURIComponent('Support AI Bots Studio');
  
  // Standard UPI URI specification
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amt}&cu=INR&tn=${note}`;
  
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


