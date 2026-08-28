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

window.openDonationModal = function() {
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
            <div class="donation-icon" style="margin: 0; width: 32px; height: 32px; font-size: 0.95rem;"><i class="fas fa-heart"></i></div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 800;">Support AI Bots</h3>
          </div>
          <button onclick="closeDonationModal()" class="btn btn-secondary btn-sm" style="border-radius: 50%; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 1rem; cursor: pointer; border: 1px solid var(--border-color);" title="Close Modal">
            <i class="fas fa-xmark"></i>
          </button>
        </div>

        <p style="margin: 0 0 10px; color: var(--text-secondary); font-size: 0.82rem;">
          Enter any amount you wish to contribute to keep all 28+ tools 100% free!
        </p>

        <!-- Custom Amount Input -->
        <div style="margin: 8px 0 6px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span style="font-size: 1.2rem; font-weight: 800; color: var(--primary);">₹</span>
            <input type="number" id="customDonateInput" class="form-control" value="50" min="1" step="any" placeholder="Any Amount" style="max-width: 130px; font-size: 1.15rem; font-weight: 800; text-align: center; font-family: monospace; padding: 6px;" oninput="handleCustomDonationInput(this.value)">
          </div>
        </div>

        <!-- Quick Amount Chips -->
        <div class="donation-amount-chips" style="margin: 6px 0 10px;">
          <button class="donation-chip" onclick="setDonationAmount(20, this)">₹20</button>
          <button class="donation-chip active" onclick="setDonationAmount(50, this)">₹50</button>
          <button class="donation-chip" onclick="setDonationAmount(100, this)">₹100</button>
          <button class="donation-chip" onclick="setDonationAmount(250, this)">₹250</button>
          <button class="donation-chip" onclick="setDonationAmount(500, this)">₹500</button>
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
        <a id="donateDirectLink" href="#" class="btn btn-primary" style="width: 100%; padding: 10px; font-weight: 800; border-radius: var(--radius-md); text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.9rem;">
          <i class="fas fa-mobile-screen"></i> Pay with UPI App (Mobile)
        </a>

        <!-- Bottom Close Button -->
        <button onclick="closeDonationModal()" class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 8px; padding: 7px; border-radius: var(--radius-md); font-weight: 600;">
          <i class="fas fa-xmark"></i> Close Window
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

  updateDonationQR(window.AI_BOTS_UPI_CONFIG.defaultAmount);
  modal.classList.add('active');
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

  // Global Cloud Analytics Logger
  let analyticsSyncTimer = null;
  function syncAnalyticsToCloud() {
    clearTimeout(analyticsSyncTimer);
    analyticsSyncTimer = setTimeout(async () => {
      try {
        const res = await fetch(AIBOTS_CLOUD_API, { cache: 'no-store' });
        if (res.ok) {
          const body = await res.json();
          const cloud = (body && typeof body === 'object' && body.data) ? body.data : body;
          const localClicks = JSON.parse(localStorage.getItem('aibots_tool_click_analytics') || '{}');
          const localSearches = JSON.parse(localStorage.getItem('aibots_search_query_log') || '[]');

          const mergedClicks = { ...(cloud.analytics_clicks || {}) };
          Object.keys(localClicks).forEach(k => {
            if (!mergedClicks[k] || localClicks[k] > mergedClicks[k]) {
              mergedClicks[k] = localClicks[k];
            }
          });

          const searchSet = new Set([...(cloud.analytics_searches || []), ...localSearches]);
          const mergedSearches = Array.from(searchSet).slice(-50);

          const patchPayload = {
            analytics_clicks: mergedClicks,
            analytics_searches: mergedSearches,
            updated_at: new Date().toISOString()
          };

          await fetch(AIBOTS_CLOUD_API, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/merge-patch+json' },
            body: JSON.stringify(patchPayload)
          });
        }
      } catch (err) {}
    }, 2500);
  }

  // Tool Click Analytics Logger
  function setupToolAnalyticsLogger() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('a.tool-card, a.action-card');
      if (card) {
        const tool = card.dataset.tool || card.getAttribute('href')?.replace('.html', '').replace('/', '');
        if (tool) {
          try {
            const clicks = JSON.parse(localStorage.getItem('aibots_tool_click_analytics') || '{}');
            clicks[tool] = (clicks[tool] || 0) + 1;
            localStorage.setItem('aibots_tool_click_analytics', JSON.stringify(clicks));
            syncAnalyticsToCloud();
          } catch(err) {}
        }
      }
    });
  }

  // Search Query Logger
  window.logSearchQueryToAdmin = function(query) {
    if (!query || query.trim().length < 2) return;
    try {
      let searches = JSON.parse(localStorage.getItem('aibots_search_query_log') || '[]');
      if (!searches.includes(query.trim())) {
        searches.push(query.trim());
        if (searches.length > 50) searches.shift();
        localStorage.setItem('aibots_search_query_log', JSON.stringify(searches));
        syncAnalyticsToCloud();
      }
    } catch(e) {}
  };

  // Featured Tool Highlight on Homepage
  function highlightFeaturedTool() {
    const featuredId = localStorage.getItem('aibots_featured_tool');
    if (featuredId) {
      const card = document.querySelector(`.tool-card[data-tool="${featuredId}"]`);
      if (card) {
        card.style.border = '2px solid var(--primary)';
        card.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.4)';
        let badge = card.querySelector('.tool-badge-pill');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'tool-badge-pill badge-featured';
          card.prepend(badge);
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

    // 2. Check Individual Tool Maintenance
    const disabledTools = JSON.parse(localStorage.getItem('aibots_disabled_tools') || '[]');
    const currentPath = window.location.pathname.toLowerCase();
    const currentToolId = currentPath.split('/').pop().replace('.html', '');

    // If on a disabled tool's direct page
    if (disabledTools.includes(currentToolId) && currentToolId !== '' && currentToolId !== 'index') {
      const toolObj = (typeof AI_BOTS_TOOLS !== 'undefined') ? AI_BOTS_TOOLS.find(t => t.id === currentToolId) : null;
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

    // 3. Update homepage cards for disabled tools
    if (disabledTools.length > 0) {
      disabledTools.forEach(toolId => {
        const card = document.querySelector(`.tool-card[data-tool="${toolId}"]`);
        if (card) {
          card.style.opacity = '0.65';
          card.style.cursor = 'not-allowed';
          let badge = card.querySelector('.tool-badge-pill');
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'tool-badge-pill';
            card.prepend(badge);
          }
          badge.textContent = '🛠️ MAINTENANCE';
          badge.style.background = '#f59e0b';
          badge.style.color = '#000000';

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
    'https://extendsclass.com/api/json-storage/bin/adebbab',
    'config.json',
    'https://raw.githubusercontent.com/Rishitchajjed/aibots/main/config.json'
  ];
  
  window.fetchAndApplyGlobalCloudConfig = async function() {
    for (const endpoint of CLOUD_ENDPOINTS) {
      try {
        const url = endpoint.includes('?') ? endpoint : `${endpoint}?_=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const body = await res.json();
          const cloud = (body && typeof body === 'object' && body.data) ? body.data : body;
          if (cloud) {
            if (cloud.global_maintenance !== undefined) {
              localStorage.setItem('aibots_global_maintenance', cloud.global_maintenance ? 'true' : 'false');
            }
            if (cloud.disabled_tools !== undefined) {
              localStorage.setItem('aibots_disabled_tools', JSON.stringify(cloud.disabled_tools));
            }
            if (cloud.featured_tool) {
              localStorage.setItem('aibots_featured_tool', cloud.featured_tool);
            }
            if (cloud.announcement) {
              localStorage.setItem('aibots_global_announcement', JSON.stringify(cloud.announcement));
            }
            if (cloud.welcome_modal) {
              localStorage.setItem('aibots_welcome_modal_config', JSON.stringify(cloud.welcome_modal));
            }
            if (cloud.festive_effects) {
              localStorage.setItem('aibots_festive_effects', JSON.stringify(cloud.festive_effects));
            }
            if (cloud.upi_config && cloud.upi_config.id) {
              localStorage.setItem('aibots_custom_upi_config', JSON.stringify(cloud.upi_config));
            }
            if (cloud.analytics_clicks) {
              localStorage.setItem('aibots_tool_click_analytics', JSON.stringify(cloud.analytics_clicks));
            }
            if (cloud.analytics_searches) {
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






