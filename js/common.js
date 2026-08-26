/* ==========================================================================
   AI Bots — Shared registry & site chrome.
   Add a tool to AB_TOOLS once and it appears in the topbar, footer, the
   homepage grid, and search — every page updates automatically.
   ========================================================================== */

const AB_TOOLS = [
  { id:'calculator',     name:'Calculator',            file:'calculator.html',     icon:'🧮', cat:'Utilities', desc:'Scientific calculator with history and keyboard input.' },
  { id:'currency',       name:'Currency Converter',     file:'currency.html',       icon:'💱', cat:'Utilities', desc:'Live exchange rates between 150+ currencies.' },
  { id:'timer',          name:'Timer & Stopwatch',      file:'timer.html',          icon:'⏱️', cat:'Utilities', desc:'Countdown timer, stopwatch and Pomodoro sessions.' },
  { id:'unitconverter',  name:'Unit Converter',         file:'unitconverter.html',  icon:'📐', cat:'Utilities', desc:'Length, weight, temperature and more.', isNew:true },
  { id:'password',       name:'Password Generator',     file:'password.html',       icon:'🔐', cat:'Utilities', desc:'Strong random passwords with a strength meter.', isNew:true },
  { id:'wordcounter',    name:'Word Counter',           file:'wordcounter.html',    icon:'📝', cat:'Utilities', desc:'Words, characters, reading time and keyword density.', isNew:true },
  { id:'qrcode',         name:'QR Code Generator',      file:'qrcode.html',         icon:'▦',  cat:'Image & Design', desc:'Turn any text or link into a downloadable QR code.', isNew:true },

  { id:'weather',        name:'Weather',                file:'weather.html',        icon:'⛅', cat:'Live Data', desc:'Current conditions and forecast for any city.' },
  { id:'cricket',        name:'Cricket Scores',         file:'cricket.html',        icon:'🏏', cat:'Live Data', desc:'Live and recent cricket scores.' },

  { id:'backremover',    name:'Background Remover',     file:'backremover.html',    icon:'🖼️', cat:'Image & Design', desc:'Remove image backgrounds fully in your browser — no upload, no key.' },
  { id:'cropphoto',      name:'Crop Photo',             file:'cropphoto.html',      icon:'✂️', cat:'Image & Design', desc:'Crop and export images to common sizes.' },
  { id:'resizeimage',    name:'Resize Image',           file:'resizeimage.html',    icon:'🖥️', cat:'Image & Design', desc:'Resize images by pixels or percentage.' },
  { id:'imagecombiner',  name:'Image Combiner',         file:'imagecombiner.html',  icon:'🧩', cat:'Image & Design', desc:'Merge multiple images into one canvas.' },
  { id:'imagelink',      name:'Image to Link',          file:'imagelink.html',      icon:'🔗', cat:'Image & Design', desc:'Host an image and get a shareable direct link.' },
  { id:'logomaker',      name:'Logo Maker',             file:'logomaker.html',      icon:'🎨', cat:'Image & Design', desc:'Generate a simple text-based logo.' },
  { id:'photogenerator', name:'Photo Generator',        file:'photogenerator.html', icon:'🖌️', cat:'Image & Design', desc:'Placeholder / generated image utility.' },
  { id:'emojis',         name:'Emoji Picker',           file:'emojis.html',         icon:'😀', cat:'Image & Design', desc:'Search and copy emojis fast.' },

  { id:'pdfmaker',       name:'PDF Maker',              file:'pdfmaker.html',       icon:'📄', cat:'Documents', desc:'Turn text and images into a PDF.' },
  { id:'pdfviewer',      name:'PDF Viewer',             file:'pdfviewer.html',      icon:'📖', cat:'Documents', desc:'View PDFs in the browser, page by page.' },
  { id:'print',          name:'Print Center',           file:'print.html',          icon:'🖨️', cat:'Documents', desc:'Prep and print documents and images.' },
  { id:'invoice',        name:'Invoice Generator',      file:'invoice.html',        icon:'🧾', cat:'Documents', desc:'Create and download a professional invoice.' },
  { id:'buisnesscard',   name:'Business Card Maker',    file:'buisnesscard.html',   icon:'💼', cat:'Documents', desc:'Design a printable business card.' },
  { id:'endchanger',     name:'File Extension Changer', file:'endchanger.html',     icon:'📁', cat:'Documents', desc:'Rename a file\u2019s extension.' },

  { id:'chatbot',        name:'AI Chatbot',             file:'chatbot.html',        icon:'💬', cat:'Fun & Learning', desc:'Chat with a simple assistant.' },
  { id:'game',           name:'Mini Game',              file:'game.html',           icon:'🎮', cat:'Fun & Learning', desc:'Quick browser game break.' },
  { id:'typingpractice', name:'Typing Practice',        file:'typingpractice.html', icon:'⌨️', cat:'Fun & Learning', desc:'Test and improve your typing speed.' },
  { id:'videoplayer',    name:'Video Player',           file:'videoplayer.html',    icon:'🎬', cat:'Fun & Learning', desc:'Play local video files in the browser.' },
];

/* -------------------------------- Chrome -------------------------------- */

function abInitChrome(currentId){
  const cur = AB_TOOLS.find(t => t.id === currentId);

  document.body.classList.add('ab-body');

  // topbar
  const topbar = document.createElement('div');
  topbar.className = 'ab-topbar';
  topbar.innerHTML = `
    <a href="index.html" class="ab-brand"><span class="ab-mark">AI</span> AI Bots</a>
    ${cur ? `<div class="ab-tool-title"><span class="sep">/</span><span class="cur">${cur.icon} ${cur.name}</span></div>` : ''}
    <div class="ab-topbar-spacer"></div>
    <button class="ab-icon-btn" id="abThemeToggle" title="Toggle dark mode" aria-label="Toggle dark mode">🌙</button>
    ${cur ? `<a href="index.html" class="ab-home-link">← All tools</a>` : ''}
  `;
  document.body.insertBefore(topbar, document.body.firstChild);

  // skip link
  const skip = document.createElement('a');
  skip.href = '#ab-main'; skip.className = 'ab-skip'; skip.textContent = 'Skip to content';
  document.body.insertBefore(skip, document.body.firstChild);

  // wrap existing content in <main id="ab-main"> if not already
  let main = document.getElementById('ab-main');
  if (!main) {
    main = document.createElement('main');
    main.id = 'ab-main';
    main.className = 'ab-main';
    const kids = Array.from(document.body.children).filter(el => el !== topbar && el !== skip);
    kids.forEach(k => main.appendChild(k));
    document.body.appendChild(main);
  }

  // footer
  const footer = document.createElement('footer');
  footer.className = 'ab-footer';
  const related = AB_TOOLS.filter(t => t.id !== currentId).slice(0, 6);
  footer.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-bottom:10px;">
      ${related.map(t => `<a href="${t.file}">${t.name}</a>`).join('')}
      <a href="index.html">All tools →</a>
    </div>
    <div>© ${new Date().getFullYear()} AI Bots — free browser tools, no signup.</div>
  `;
  document.body.appendChild(footer);

  abInitTheme();
}

function abInitTheme(){
  const saved = localStorage.getItem('ab-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('abThemeToggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ab-theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
}

function abToast(msg, ms=2400){
  let el = document.querySelector('.ab-toast');
  if (!el){
    el = document.createElement('div');
    el.className = 'ab-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), ms);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.hasAttribute('data-ab-page')) abInitTheme();
});
