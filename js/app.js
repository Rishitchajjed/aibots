/**
 * AI Bots Creative Studio - Core Shared Script
 * Handles Themes, Command Palette (Ctrl+K), Toast Notifications, File Dropzones, and Logo Physics.
 */

// Tools Registry for Search and Navigation
const AI_BOTS_TOOLS = [
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
  initCommandPalette();
  initDropzones();
  initInteractiveLogo();
  initGlobalHotkeys();
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
   2. Toast Notification System
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
   3. Command Palette (Ctrl + K / Quick Search)
   ========================================================================== */
function initCommandPalette() {
  const triggerBtn = document.getElementById('search-trigger-btn');
  const modalBackdrop = document.getElementById('command-palette-backdrop');
  const searchInput = document.getElementById('command-palette-input');
  const resultsContainer = document.getElementById('command-palette-results');

  if (!modalBackdrop) return;

  function openPalette() {
    modalBackdrop.classList.add('active');
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
   4. Universal Dropzones & Clipboard Paste
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
      }
    });
  });

  // Global Clipboard Paste Support (Ctrl + V images into active upload input)
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
        showToast('Pasted image from clipboard!', 'success');
        break;
      }
    }
  });
}

/* ==========================================================================
   5. Interactive Bouncing / Throw Logo (Original Physics Feature)
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

    // Throw animation with bounce
    logoWrapper.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    logoWrapper.style.transform = `translate(${offsetX + velocityX * 0.1}px, ${offsetY + velocityY * 0.1}px) rotate(${offsetX * 0.2}deg)`;

    // Return to initial position
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
   6. Global Keyboard Shortcuts
   ========================================================================== */
function initGlobalHotkeys() {
  document.addEventListener('keydown', (e) => {
    // Press '/' to focus search if not in an input
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const searchBtn = document.getElementById('search-trigger-btn');
      if (searchBtn) searchBtn.click();
    }
  });
}
