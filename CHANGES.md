# AI Bots — Update Summary

## New shared foundation
- `css/theme.css` — one design system (colors, type, components, dark mode) used by every page.
- `js/common.js` — a single tool registry (`AB_TOOLS`). Add one entry here and the new tool automatically
  appears in the top nav, the homepage grid/search, and every page's footer. This is what makes future
  additions "auto-propagate" instead of hand-editing 28 files.
- All 24 original tools + `index.html` now share a consistent top bar, dark-mode toggle, and footer —
  previously most tool pages had **no way to navigate back to the homepage at all**.
- Fixed a broken page: `logomaker.html` was missing its `<body>` tag (content was nested inside `<head>`),
  which likely caused it to render inconsistently across browsers.

## Security fixes (important)
- **`backremover.html`**: your original file had a **remove.bg API key hardcoded in client-side JavaScript**,
  visible to anyone who viewed page source. Anyone could copy it and spend your API credits. Replaced it
  entirely with `@imgly/background-removal`, a model that runs **locally in the visitor's browser** — no key,
  no server upload, faster for repeat use (model is cached), and free with no usage limits.
- **`weather.html`**: replaced a hardcoded OpenWeatherMap key with Open-Meteo, a free API that needs no key
  at all, and added city search + geolocation + a 5-day forecast.
- ⚠️ **Two more exposed keys I did *not* rewrite** (left as-is since these tools weren't in the deep-upgrade
  list, but you should rotate/replace them soon):
  - `imagelink.html` line ~132 — an imgbb.com upload key
  - `photogenerator.html` line ~131 — an Unsplash access key
  Both are visible in page source right now. I'd recommend regenerating both keys on those services and,
  ideally, proxying them through a small backend rather than shipping them client-side.

## Deep-rewritten tools
- **Calculator** — scientific mode, keyboard input, memory/Ans, persistent calculation history.
- **Currency Converter** — swapped a fragile API for a more reliable one, added swap button, favorite
  currencies, 6-hour local caching so it doesn't refetch every visit.
- **Weather** — see above; added search-as-you-type city lookup and "use my location."
- **Background Remover** — see above; drag-and-drop, before/after compare, progress bar.
- **Timer** — now three tools in one: countdown, stopwatch with laps, and a Pomodoro focus timer.
- **PDF Maker** — multi-image upload, drag-to-reorder thumbnails, page size options, custom filename.

## New tools added
- **QR Code Generator** — text/link, email, or Wi-Fi QR codes, adjustable size and color, PNG download.
- **Password Generator** — adjustable length/character rules, strength meter, bulk generation, all local.
- **Word Counter** — live word/character/sentence/reading-time stats plus top-keyword extraction.
- **Unit Converter** — length, weight, temperature, area, speed, and data units.

## Homepage
- Rebuilt with a search box and category filter chips, pulling live from the shared tool registry — so it
  can never go out of sync with the actual tools again.

## Everything else (16 tools)
Given the consistent-polish-everywhere + deep-upgrade-select-tools brief, these got the shared nav/footer/
theme treatment but kept their original working logic untouched: buisnesscard, chatbot, cricket, cropphoto,
emojis, endchanger, game, imagecombiner, imagelink, invoice, logomaker (+bug fix), pdfviewer, photogenerator,
print, resizeimage, typingpractice, videoplayer.
