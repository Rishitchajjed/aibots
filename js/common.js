/* ==========================================================================
   common.js — Shared navbar, footer, dark mode, and tool registry
   Included by every tool page: <script src="js/common.js"></script>
   Then call: abInitChrome('toolId');
   ========================================================================== */

const AB_TOOLS = [
  // Utilities
  { id:'calculator',     name:'Calculator',            file:'calculator.html',     icon:'🧮', cat:'Utilities',      desc:'Scientific calculator with history and keyboard input.' },
  { id:'currency',       name:'Currency Converter',    file:'currency.html',       icon:'💱', cat:'Utilities',      desc:'Live exchange rates between 150+ currencies.' },
  { id:'timer',          name:'Timer & Stopwatch',     file:'timer.html',          icon:'⏱️', cat:'Utilities',      desc:'Countdown timer, stopwatch and Pomodoro sessions.' },
  { id:'unitconverter',  name:'Unit Converter',        file:'unitconverter.html',  icon:'📐', cat:'Utilities',      desc:'Length, weight, temperature and more.', isNew:true },
  { id:'password',       name:'Password Generator',   file:'password.html',       icon:'🔑', cat:'Utilities',      desc:'Strong random passwords with a strength meter.', isNew:true },
  { id:'wordcounter',    name:'Word Counter',          file:'wordcounter.html',    icon:'📝', cat:'Utilities',      desc:'Words, characters, reading time and keyword density.', isNew:true },
  { id:'qrcode',         name:'QR Code Generator',    file:'qrcode.html',         icon:'📷', cat:'Utilities',      desc:'Turn any text or link into a downloadable QR code.', isNew:true },
  { id:'weather',        name:'Weather',               file:'weather.html',        icon:'🌤️', cat:'Live Data',       desc:'Current conditions and forecast for any city.' },
  { id:'cricket',        name:'Cricket Scores',        file:'cricket.html',        icon:'🏏', cat:'Live Data',       desc:'Live and recent cricket scores.' },
  { id:'cricketscore',   name:'Cricket Scorer',        file:'cricketscore.html',   icon:'📊', cat:'Live Data',       desc:'Ball-by-ball scoring board for live matches.', isNew:true },
  // Image & Design
  { id:'backremover',    name:'Background Remover',   file:'backremover.html',    icon:'✂️', cat:'Image & Design',  desc:'Remove image backgrounds fully in your browser — no upload, no key.' },
  { id:'cropphoto',      name:'Crop Photo',            file:'cropphoto.html',      icon:'🖼️', cat:'Image & Design',  desc:'Crop and export images to common sizes.' },
  { id:'resizeimage',    name:'Resize Image',          file:'resizeimage.html',    icon:'📏', cat:'Image & Design',  desc:'Resize images by pixels or percentage.' },
  { id:'imagecombiner',  name:'Image Combiner',        file:'imagecombiner.html',  icon:'🖇️', cat:'Image & Design',  desc:'Merge multiple images into one canvas.' },
  { id:'imagelink',      name:'Image to Link',         file:'imagelink.html',      icon:'🔗', cat:'Image & Design',  desc:'Host an image and get a shareable direct link.' },
  { id:'logomaker',      name:'Logo Maker',            file:'logomaker.html',      icon:'🎨', cat:'Image & Design',  desc:'Generate a simple text-based vector logo.' },
  { id:'photogenerator', name:'Photo Generator',       file:'photogenerator.html', icon:'🤖', cat:'Image & Design',  desc:'AI-powered placeholder & image generation utility.' },
  { id:'emojis',         name:'Emoji Picker',          file:'emojis.html',         icon:'😊', cat:'Image & Design',  desc:'Search and copy emojis fast.' },
  // Documents
  { id:'pdfmaker',       name:'PDF Maker',             file:'pdfmaker.html',       icon:'📄', cat:'Documents',       desc:'Turn images and text into a downloadable PDF.' },
  { id:'pdfviewer',      name:'PDF Viewer',            file:'pdfviewer.html',      icon:'📖', cat:'Documents',       desc:'View PDFs in the browser, page by page.' },
  { id:'print',          name:'Print Studio',          file:'print.html',          icon:'🖨️', cat:'Documents',       desc:'Preview, watermark, and print PDFs & images.' },
  { id:'invoice',        name:'Invoice Generator',     file:'invoice.html',        icon:'🧾', cat:'Documents',       desc:'Create and download a professional invoice PDF.' },
  { id:'buisnesscard',   name:'Business Card Maker',  file:'buisnesscard.html',   icon:'💼', cat:'Documents',       desc:'Design a printable business card.' },
  { id:'endchanger',     name:'File Extension Changer',file:'endchanger.html',    icon:'🔄', cat:'Documents',       desc:"Rename a file's extension instantly." },
  // Fun & Learning
  { id:'chatbot',        name:'AI Chatbot',            file:'chatbot.html',        icon:'💬', cat:'Fun & Learning',  desc:'Chat with an intelligent assistant.' },
  { id:'game',           name:'Mini Game',             file:'game.html',           icon:'🎮', cat:'Fun & Learning',  desc:'Quick browser game to take a break.' },
  { id:'typingpractice', name:'Typing Practice',       file:'typingpractice.html', icon:'⌨️', cat:'Fun & Learning',  desc:'Test and improve your typing speed & accuracy.' },
  { id:'videoplayer',    name:'Video Player',          file:'videoplayer.html',    icon:'▶️', cat:'Fun & Learning',  desc:'Play local video files in the browser.' },
];

/* ──────────────────────────────────────────────
   Main init — call once per tool page
   ────────────────────────────────────────────── */

function abInitChrome(currentId) {
  const cur = AB_TOOLS.find(t => t.id === currentId);
  document.body.classList.add('ab-body');

  // ── Skip link (a11y) ──
  const skip = document.createElement('a');
  skip.href = '#ab-main';
  skip.className = 'ab-skip';
  skip.textContent = 'Skip to content';
  document.body.insertBefore(skip, document.body.firstChild);

  // ── Top navbar ──
  const topbar = document.createElement('nav');
  topbar.className = 'ab-topbar';
  topbar.setAttribute('role', 'navigation');
  topbar.setAttribute('aria-label', 'Main navigation');
  topbar.innerHTML = `
    <a href="index.html" class="ab-brand" aria-label="AI Bots Home">
      <img src="logo.png" alt="AI Bots logo" class="ab-brand-logo" width="32" height="32" style="width: 32px; height: 32px; object-fit: contain; aspect-ratio: 1/1;">
      <span class="ab-brand-name">AI Bots</span>
    </a>

    ${cur ? `<div class="ab-breadcrumb">
      <span class="ab-sep">/</span>
      <span class="ab-cur-tool">${cur.icon} ${cur.name}</span>
    </div>` : ''}

    <div class="ab-topbar-spacer"></div>

    <div class="ab-nav-links" id="abNavLinks">
      <a href="index.html" class="ab-nav-link${!cur ? ' ab-nav-active' : ''}">Home</a>
      <a href="cricketscore.html" class="ab-nav-link${currentId==='cricketscore' ? ' ab-nav-active' : ''}">Cricket</a>
      <a href="qrcode.html" class="ab-nav-link${currentId==='qrcode' ? ' ab-nav-active' : ''}">QR Code</a>
      <a href="backremover.html" class="ab-nav-link${currentId==='backremover' ? ' ab-nav-active' : ''}">BG Remove</a>
    </div>

    <button class="ab-icon-btn" id="abThemeToggle" title="Toggle dark / light mode" aria-label="Toggle dark mode">
      <span id="abThemeIcon">🌙</span>
    </button>

    <button class="ab-hamburger" id="abHamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.insertBefore(topbar, document.body.firstChild);

  // ── Mobile drawer ──
  const drawer = document.createElement('div');
  drawer.className = 'ab-drawer';
  drawer.id = 'abDrawer';
  drawer.setAttribute('aria-hidden', 'true');
  const cats = [...new Set(AB_TOOLS.map(t => t.cat))];
  drawer.innerHTML = `
    <div class="ab-drawer-inner">
      <button class="ab-drawer-close" id="abDrawerClose" aria-label="Close menu">✕</button>
      <a href="index.html" class="ab-brand" style="margin-bottom:20px;">
        <img src="logo.png" alt="Logo" class="ab-brand-logo" width="32" height="32" style="width: 32px; height: 32px; object-fit: contain; aspect-ratio: 1/1;">
        <span class="ab-brand-name">AI Bots</span>
      </a>
      ${cats.map(cat => `
        <div class="ab-drawer-section">
          <div class="ab-drawer-cat">${cat}</div>
          ${AB_TOOLS.filter(t => t.cat === cat).map(t => `
            <a href="${t.file}" class="ab-drawer-link${t.id === currentId ? ' ab-drawer-active' : ''}">
              <span class="ab-dl-icon">${t.icon}</span>
              <span>${t.name}</span>
              ${t.isNew ? '<span class="ab-new-badge">NEW</span>' : ''}
            </a>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
  document.body.appendChild(drawer);

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'ab-overlay';
  overlay.id = 'abOverlay';
  document.body.appendChild(overlay);

  // Hamburger logic
  const ham = document.getElementById('abHamburger');
  const closeBtn = document.getElementById('abDrawerClose');
  const ov = document.getElementById('abOverlay');
  function openDrawer() {
    drawer.classList.add('open');
    ov.classList.add('show');
    ham.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    ov.classList.remove('show');
    ham.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }
  ham.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  ov.addEventListener('click', closeDrawer);

  // ── Wrap body content in <main> ──
  let main = document.getElementById('ab-main');
  if (!main) {
    main = document.createElement('main');
    main.id = 'ab-main';
    main.className = 'ab-main';
    const kids = Array.from(document.body.children).filter(el =>
      el !== topbar && el !== skip && el !== drawer && el !== overlay
    );
    kids.forEach(k => main.appendChild(k));
    document.body.appendChild(main);
  }

  // ── Footer ──
  const related = AB_TOOLS.filter(t => t.id !== currentId).slice(0, 8);
  const footer = document.createElement('footer');
  footer.className = 'ab-footer';
  footer.innerHTML = `
    <div class="ab-footer-inner">
      <div class="ab-footer-brand">
        <img src="logo.png" alt="AI Bots" width="28" height="28" style="height:28px; width:28px; object-fit:contain; aspect-ratio:1/1;">
        <strong>AI Bots</strong>
      </div>
      <div class="ab-footer-links">
        ${related.map(t => `<a href="${t.file}">${t.icon} ${t.name}</a>`).join('')}
        <a href="index.html">📋 All Tools →</a>
      </div>
      <div class="ab-footer-copy">
        © ${new Date().getFullYear()} AI Bots · <a href="https://www.aibots.co.in" target="_blank">aibots.co.in</a> · Built by <strong>Rishit Chajjed</strong>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  abInitTheme();
}

/* ──────────────────────────────────────────────
   Theme (dark / light) persistence
   ────────────────────────────────────────────── */

function abInitTheme() {
  const saved = localStorage.getItem('ab-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  _updateThemeIcon(theme);

  const btn = document.getElementById('abThemeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ab-theme', next);
      _updateThemeIcon(next);
    });
  }
}

function _updateThemeIcon(theme) {
  const icon = document.getElementById('abThemeIcon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ──────────────────────────────────────────────
   Toast helper (usable from any tool page)
   ────────────────────────────────────────────── */

function abToast(msg, ms = 2600) {
  let el = document.querySelector('.ab-toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'ab-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), ms);
}

/* ── Auto dark-mode on pages that don't call abInitChrome ── */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('ab-body')) abInitTheme();
});
