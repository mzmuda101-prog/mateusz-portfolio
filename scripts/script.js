const {
  STORAGE_KEY,
  defaultProjectProps,
  projects,
  repoFallback,
  hiddenRepos,
  repoProjectAliases,
} = window.PortfolioData;
const copy = window.PortfolioTranslations;

function getEl(id) {
  return document.getElementById(id);
}

const spotlight = {
  kicker: getEl("spotlight-kicker"),
  title: getEl("spotlight-title"),
  description: getEl("spotlight-description"),
  image: getEl("spotlight-image"),
  meta: getEl("spotlight-meta"),
  stack: getEl("spotlight-stack"),
  actions: getEl("spotlight-actions"),
  root: getEl("project-spotlight"),
};

const tabs = Array.from(document.querySelectorAll(".project-tab"));
const repoGrid = getEl("repo-grid");
const githubStatus = getEl("github-status");
const revealTargets = document.querySelectorAll(".reveal");
const heroStage = document.querySelector(".hero-stage");
const heroShot = document.querySelector(".hero-shot");
const magneticButtons = document.querySelectorAll(".button-magnetic");
const heroPanels = Array.from(document.querySelectorAll(".hero-panel-trigger"));
const cursorHint = getEl("cursor-hint");
const langButtons = Array.from(document.querySelectorAll(".lang-button"));
const siteHeader = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[data-nav]"));
const toast = getEl("toast");

let currentLang = "pl";
let activeProjectKey = "excel-workbench-pwa";
let activeHeroPanel = null;
let panelFocusedAt = 0;
let currentRepos = [];
let githubStatusMode = "loading";
let panelElevateTimer = null;
let panelTuckTimer = null;
let panelFocusResizeTimer = null;
let lenis = null;
let toastTimer = null;

const defaultRepoTheme = { ...defaultProjectProps.repoTheme };
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


// ________________________________________________________________ AUTO COLOR EXTRACTION ________________________________________________________________
//
// Strategy (in order of priority):
//   1. Repo has a manual accent set in portfolio-data.js → use it, skip extraction
//   2. GitHub API → find .css files in repo → raw.githubusercontent.com → parse CSS vars → pick brand color
//   3. Fallback: favicon via ColorThief
//   4. Last resort: deterministic color from repo name (always works, no network)
//
// Results are cached in localStorage for a week, so extraction doesn't hit
// GitHub again on repeat visits or language switches.

const colorThief = (typeof ColorThief !== 'undefined') ? new ColorThief() : null;
const COLOR_CACHE_KEY = 'portfolio-repo-colors-v2';
const COLOR_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

// ── Load/save cache ────────────────────────────────────────────────────────────

function readStorageJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch { return fallback; }
}

function writeStorageJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function loadColorCache() {
  const cache = readStorageJson(COLOR_CACHE_KEY, {});
  const now = Date.now();
  // Drop stale entries so a repo's new look shows up eventually.
  Object.keys(cache).forEach((key) => {
    if (!cache[key] || now - cache[key].savedAt > COLOR_CACHE_TTL) delete cache[key];
  });
  return cache;
}

function saveColorCache(cache) {
  writeStorageJson(COLOR_CACHE_KEY, cache);
}

const repoColorCache = loadColorCache();

// ── Math helpers ───────────────────────────────────────────────────────────────

function clamp(v, mn, mx) { return Math.min(Math.max(v, mn), mx); }

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0, l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    switch (mx) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return [hue2rgb(p, q, h + 1/3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1/3)].map(v => Math.round(v * 255));
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [parseInt(full.slice(0,2),16), parseInt(full.slice(2,4),16), parseInt(full.slice(4,6),16)];
}

// ── Color scoring (Mateusz's taste) ───────────────────────────────────────────
//
// Calibrated by analysing his 5 manual projects:
//   accent L: 31–59%, S: 41–80%  — stonowane, nie neonowe
//   glowSoft: lighter (+14–40% L), S boosted ≥60%, alpha 0.18
//   accentDeep: L –8 to –18%, same H
//   glow alpha: 0.20 base, 0.24 for vivid (S>60)

function scoreColor(r, g, b, isNearKeyword) {
  const [, s, l] = rgbToHsl(r, g, b);
  if (s < 12 || l < 8 || l > 92) return -1;
  let score = s * 0.5 + (1 - Math.abs(l - 50) / 50) * 30;
  if (isNearKeyword) score += 60;
  return score;
}

function buildThemeFromRgb(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  const aL = clamp(l, 30, 56);
  const aS = clamp(s, 42, 72);
  const [ar, ag, ab] = hslToRgb(h, aS, aL);
  const deepDelta = clamp(8 + (aL - 30) * 0.35, 8, 18);
  const [dr, dg, db] = hslToRgb(h, aS, clamp(aL - deepDelta, 14, aL - 7));
  const glowAlpha = aS > 60 ? '0.24' : '0.20';
  const softL = clamp(aL + 20 + (72 - aS) * 0.4, aL + 14, 82);
  const softS = clamp(Math.max(aS, 60), 60, 100);
  const [sr, sg, sb] = hslToRgb(h, softS, softL);
  return {
    accent:     rgbToHex(ar, ag, ab),
    accentDeep: rgbToHex(dr, dg, db),
    glow:       `rgba(${ar},${ag},${ab},${glowAlpha})`,
    glowSoft:   `rgba(${sr},${sg},${sb},0.18)`,
  };
}

function colorFromRepoName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const h = hash % 360;
  const s = 44 + (hash >> 4) % 25;
  const l = 32 + (hash >> 8) % 20;
  return buildThemeFromRgb(...hslToRgb(h, s, l));
}

// ── CSS color extraction ───────────────────────────────────────────────────────

const BRAND_KEYWORDS_RE = /--primary|--brand|--accent|--main|--theme|--color-primary|--highlight|--key|--cta/gi;

function extractBestColorFromCss(cssText) {
  // Find positions of brand keyword mentions
  const keywordPositions = [];
  let km;
  const kwRe = new RegExp(BRAND_KEYWORDS_RE.source, 'gi');
  while ((km = kwRe.exec(cssText)) !== null) keywordPositions.push(km.index);

  const scored = new Map();
  const hexRe = /#([0-9a-fA-F]{6})\b/g;
  let m;
  while ((m = hexRe.exec(cssText)) !== null) {
    const hex = '#' + m[1].toLowerCase();
    const pos = m.index;
    const rgb = hexToRgb(hex);
    const nearKeyword = keywordPositions.some(kp => Math.abs(pos - kp) < 120);
    const s = scoreColor(...rgb, nearKeyword);
    if (s > 0 && (!scored.has(hex) || s > scored.get(hex).score)) {
      scored.set(hex, { rgb, score: s });
    }
  }

  if (scored.size === 0) return null;
  const best = [...scored.values()].sort((a, b) => b.score - a.score)[0];
  return best.rgb;
}

// ── GitHub CSS fetching ────────────────────────────────────────────────────────

// Common CSS filenames to try, in priority order
const CSS_CANDIDATES = ['styles.css', 'style.css', 'css/style.css', 'src/index.css'];

function rawUrl(owner, repo, branch, path) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

async function fetchFirstCssFromRepo(htmlUrl) {
  // Parse owner/repo from html_url
  const match = htmlUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;

  // 1. Try GitHub API to get the real file tree (most accurate)
  //    Unauthenticated: 60 req/h per IP — one call per unknown repo is fine
  let treeListed = false;
  try {
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`,
      { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(5000) }
    );
    if (treeRes.ok) {
      const data = await treeRes.json();
      if (data.tree) {
        treeListed = !data.truncated;
        // Find all CSS files, skip minified and node_modules
        const cssFiles = data.tree
          .filter(f => f.type === 'blob'
            && f.path.endsWith('.css')
            && !f.path.includes('node_modules')
            && !f.path.includes('.min.')
            && !f.path.includes('vendor'))
          .sort((a, b) => {
            // Prefer root-level files and short paths (main stylesheet first)
            const aDepth = a.path.split('/').length;
            const bDepth = b.path.split('/').length;
            if (aDepth !== bDepth) return aDepth - bDepth;
            // Prefer files matching common main-stylesheet names
            const preferred = /^(styles?|index|app|main)\.css$/i;
            const aP = preferred.test(a.path.split('/').pop()) ? 0 : 1;
            const bP = preferred.test(b.path.split('/').pop()) ? 0 : 1;
            return aP - bP;
          });

        // Try up to 3 CSS files to find one with brand colors
        for (const file of cssFiles.slice(0, 3)) {
          // Get the default branch from API response if available
          const branch = data.sha ? 'HEAD' : 'main';
          const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
          const rgb = await fetchAndExtractCss(url);
          if (rgb) return rgb;
        }
      }
    }
  } catch { /* fall through to guessing */ }

  // The full tree had no usable CSS (e.g. a Python repo) — guessing would only
  // produce a wall of 404s.
  if (treeListed) return null;

  // 2. Fallback (API rate-limited): guess a few common filenames on the default branch
  for (const path of CSS_CANDIDATES) {
    const rgb = await fetchAndExtractCss(rawUrl(owner, repo, 'HEAD', path));
    if (rgb) return rgb;
  }

  return null;
}

async function fetchAndExtractCss(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const text = await res.text();
    return extractBestColorFromCss(text);
  } catch { return null; }
}

// ── Favicon fallback ───────────────────────────────────────────────────────────

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const t = setTimeout(() => reject(new Error('timeout')), 5000);
    img.onload = () => { clearTimeout(t); resolve(img); };
    img.onerror = () => { clearTimeout(t); reject(); };
    img.src = src;
  });
}

async function fetchColorFromFavicon(domain) {
  if (!colorThief) return null;
  const sources = [
    `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=64`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
  ];
  for (const src of sources) {
    try {
      const img = await loadImg(src);
      if ((img.naturalWidth || img.width) < 8) continue;
      const palette = colorThief.getPalette(img, 8);
      if (!palette?.length) continue;
      // Score all palette entries
      const best = palette
        .map(([r, g, b]) => ({ rgb: [r, g, b], score: scoreColor(r, g, b, false) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)[0];
      if (best) return best.rgb;
    } catch { }
  }
  return null;
}

// ── Main resolver ──────────────────────────────────────────────────────────────

async function resolveRepoTheme(repo) {
  // Skip extraction for repos that have a manually configured accent
  const projectKey = getRepoProjectKey(repo);
  if (projectKey && projects[projectKey] && projects[projectKey].accent) {
    return null; // let buildRepoThemeVars handle it
  }

  const cacheKey = repo.html_url;

  // Serve from cache (extracted once a week at most)
  if (repoColorCache[cacheKey]) {
    return repoColorCache[cacheKey].theme;
  }

  let rgb = null;

  // Layer 1 — CSS from GitHub repo (most accurate: reads actual CSS variables)
  if (repo.html_url && repo.html_url.includes('github.com')) {
    rgb = await fetchFirstCssFromRepo(repo.html_url);
  }

  // Layer 2 — favicon ColorThief
  if (!rgb) {
    const urlToTry = repo.homepage || repo.html_url;
    let domain = null;
    try { domain = new URL(urlToTry).hostname; } catch {}
    if (domain && !domain.includes('github.com')) {
      rgb = await fetchColorFromFavicon(domain);
    }
  }

  // Layer 3 — deterministic color (always works, no network needed)
  const theme = rgb ? buildThemeFromRgb(...rgb) : colorFromRepoName(repo.name);

  repoColorCache[cacheKey] = { theme, savedAt: Date.now() };
  saveColorCache(repoColorCache);

  return theme;
}

function applyThemeToCard(article, theme) {
  if (!theme) return;
  article.style.transition = 'background 0.7s ease, box-shadow 0.7s ease, border-color 0.6s ease';
  article.style.setProperty('--repo-accent', theme.accent);
  article.style.setProperty('--repo-accent-deep', theme.accentDeep);
  article.style.setProperty('--repo-glow', theme.glow);
  article.style.setProperty('--repo-glow-soft', theme.glowSoft);
}

async function enrichRepoCardWithColors(article, repo) {
  const theme = await resolveRepoTheme(repo);
  applyThemeToCard(article, theme);
}


function normalizeRepoToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProjectCopy(projectKey, lang = currentLang) {
  const project = projects[projectKey];
  if (!project) return null;
  return project.copy[lang] || project.copy.pl;
}

function getRepoProjectKey(repo) {
  const directMatch = repoProjectAliases[normalizeRepoToken(repo.name)];
  if (directMatch && projects[directMatch]) return directMatch;

  const homepageMatch = repoProjectAliases[normalizeRepoToken(repo.homepage)];
  if (homepageMatch && projects[homepageMatch]) return homepageMatch;

  const repoUrlMatch = repoProjectAliases[normalizeRepoToken(repo.html_url)];
  if (repoUrlMatch && projects[repoUrlMatch]) return repoUrlMatch;

  return null;
}

function buildRepoThemeVars(repo) {
  const projectKey = getRepoProjectKey(repo);
  const project = projectKey ? projects[projectKey] : null;

  if (!project) return "";

  const theme = { ...defaultRepoTheme, ...(project.repoTheme || {}) };

  return [
    `--repo-accent:${project.accent || "var(--accent)"}`,
    `--repo-accent-deep:${project.accentDeep || "var(--accent-deep)"}`,
    `--repo-glow:${project.glow || "rgba(206, 90, 47, 0.18)"}`,
    `--repo-glow-soft:${project.glowSoft || "rgba(206, 90, 47, 0.12)"}`,
    `--repo-fill-strength:${theme.fillStrength}`,
    `--repo-border-strength:${theme.borderStrength}`,
    `--repo-shadow-strength:${theme.shadowStrength}`,
    `--repo-soft-glow-size:${theme.softGlowSize}`,
  ].join(";");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(copy[currentLang].locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getGithubStatusText() {
  if (githubStatusMode === "loaded") return copy[currentLang].githubStatusLoaded;
  if (githubStatusMode === "cached") return copy[currentLang].githubStatusCached;
  if (githubStatusMode === "fallback") return copy[currentLang].githubStatusFallback;
  return copy[currentLang].githubStatusLoading;
}

function getLocalizedDescription(description) {
  if (typeof description === "object" && description !== null) {
    return description[currentLang] || description.pl || description.en;
  }
  return description;
}

function getRepoDescription(repo) {
  // Hand-written PL/EN descriptions win (GitHub "About" is often empty or only
  // in Polish), then GitHub's own text, then the generic placeholder.
  const known = repoFallback.find((item) => item.name.toLowerCase() === String(repo.name).toLowerCase());
  return (
    (known && getLocalizedDescription(known.description)) ||
    getLocalizedDescription(repo.description) ||
    copy[currentLang].repoNoDescription
  );
}

function createProjectAction(action, index) {
  const link = document.createElement("a");
  link.className = `button ${index === 0 ? "button-primary" : "button-secondary"}`;
  link.href = action.href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = action.type === "repo" ? copy[currentLang].buttonRepo : copy[currentLang].buttonLive;
  return link;
}

function createRepoAction(type, href, variant) {
  const link = document.createElement("a");
  link.className = `button ${variant}`;
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = type === "repo" ? copy[currentLang].buttonRepo : copy[currentLang].buttonLive;
  return link;
}

function createRepoCard(repo) {
  const article = document.createElement("article");
  const repoThemeVars = buildRepoThemeVars(repo);

  article.className = "repo-card";
  if (repoThemeVars) {
    article.style.cssText = repoThemeVars;
  }

  const meta = document.createElement("div");
  meta.className = "repo-meta";

  const language = document.createElement("span");
  language.textContent = repo.language || copy[currentLang].repoMixedStack;

  const updated = document.createElement("span");
  updated.textContent = `${copy[currentLang].repoUpdated}: ${formatDate(repo.updated_at)}`;

  meta.append(language, updated);

  const title = document.createElement("h3");
  title.textContent = repo.name;

  const description = document.createElement("p");
  description.textContent = getRepoDescription(repo);

  const actions = document.createElement("div");
  actions.className = "project-actions";
  actions.append(createRepoAction("repo", repo.html_url, "button-primary"));

  if (repo.homepage) {
    actions.append(createRepoAction("live", repo.homepage, "button-secondary"));
  }

  article.append(meta, title, description, actions);
  return article;
}

function renderRepos(repos) {
  currentRepos = repos;
  const cards = repos.map((repo) => createRepoCard(repo));
  repoGrid.replaceChildren(...cards);
  githubStatus.textContent = getGithubStatusText();

  // Asynchronously enrich cards with auto-extracted colors
  cards.forEach((card, i) => {
    const repo = repos[i];
    // Small stagger so network requests don't all fire at once
    setTimeout(() => enrichRepoCardWithColors(card, repo), i * 120);
  });
}

function renderSpotlight(projectKey) {
  const project = projects[projectKey];
  const projectCopy = getProjectCopy(projectKey);
  if (!project || !projectCopy) return;

  if (spotlight.root) {
    spotlight.root.style.setProperty("--project-accent", project.accent || "#ce5a2f");
    spotlight.root.style.setProperty("--project-accent-deep", project.accentDeep || "#8c3416");
    spotlight.root.style.setProperty("--project-glow", project.glow || "rgba(206, 90, 47, 0.18)");
    spotlight.root.style.setProperty("--project-glow-soft", project.glowSoft || "rgba(206, 90, 47, 0.12)");
  }

  spotlight.kicker.textContent = projectCopy.kicker;
  spotlight.title.textContent = projectCopy.title;
  spotlight.description.textContent = projectCopy.description;
  spotlight.image.src = project.image;
  spotlight.image.alt = project.imageAlt[currentLang] || project.imageAlt.pl;

  spotlight.meta.replaceChildren(
    ...projectCopy.meta.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );

  spotlight.stack.replaceChildren(
    ...projectCopy.stack.map((item) => {
      const stackItem = document.createElement("span");
      stackItem.textContent = item;
      return stackItem;
    })
  );

  if (project.actions.length) {
    spotlight.actions.replaceChildren(
      ...project.actions.map((action, index) => createProjectAction(action, index))
    );
  } else {
    const fallback = document.createElement("span");
    fallback.className = "button button-secondary";
    fallback.setAttribute("aria-disabled", "true");
    fallback.textContent = copy[currentLang].projectLocalOnly;
    spotlight.actions.replaceChildren(fallback);
  }

  tabs.forEach((tab) => {
    const isActive = tab.dataset.project === projectKey;
    const tabCopy = getProjectCopy(tab.dataset.project);
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && spotlight.root) spotlight.root.setAttribute("aria-labelledby", tab.id);
    if (tabCopy) tab.textContent = tabCopy.tabLabel;
  });

  activeProjectKey = projectKey;
  const projectList = document.querySelector(".project-list");
  if (projectList && typeof revealActiveInRow === "function") revealActiveInRow(projectList);
}

function selectProject(nextProjectKey) {
  if (!projects[nextProjectKey] || nextProjectKey === activeProjectKey) return;

  // Shareable link to the selected project (?project=…), without a history entry.
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("project", nextProjectKey);
    window.history.replaceState(null, "", url);
  } catch {}

  if (spotlight.root && !prefersReducedMotion) {
    spotlight.root.classList.add("is-switching");
    window.setTimeout(() => renderSpotlight(nextProjectKey), 110);
    window.setTimeout(() => spotlight.root.classList.remove("is-switching"), 320);
    return;
  }

  renderSpotlight(nextProjectKey);
}

function getProjectKeyFromUrl() {
  try {
    const value = new URL(window.location.href).searchParams.get("project");
    if (!value) return null;
    if (projects[value]) return value;
    const alias = repoProjectAliases[normalizeRepoToken(value)];
    return alias && projects[alias] ? alias : null;
  } catch {
    return null;
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProject(tab.dataset.project));

  // WAI-ARIA tabs: arrows move between projects, Home/End jump to the ends.
  tab.addEventListener("keydown", (event) => {
    const keyToIndex = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in keyToIndex)) return;
    event.preventDefault();
    const nextTab = tabs[(keyToIndex[event.key] + tabs.length) % tabs.length];
    nextTab.focus();
    selectProject(nextTab.dataset.project);
  });
});

// Warm the other screenshots once the page is idle, so switching tabs is instant.
(window.requestIdleCallback || ((fn) => window.setTimeout(fn, 1500)))(() => {
  Object.values(projects).forEach((project) => {
    const img = new Image();
    img.decoding = "async";
    img.src = project.image;
  });
});

const REPO_CACHE_KEY = "portfolio-github-repos-v1";
const REPO_CACHE_FRESH_MS = 60 * 60 * 1000;
const REPO_LIMIT = 9;

function pickRepoFields(repo) {
  const { name, description, language, updated_at, pushed_at, html_url, homepage } = repo;
  return { name, description, language, updated_at: pushed_at || updated_at, html_url, homepage };
}

function prepareRepos(repos) {
  const hidden = new Set(hiddenRepos.map((name) => name.toLowerCase()));
  return repos
    .filter((repo) => !repo.fork && !repo.archived && !hidden.has(String(repo.name).toLowerCase()))
    .slice(0, REPO_LIMIT)
    .map(pickRepoFields);
}

async function loadRepos() {
  githubStatusMode = "loading";
  githubStatus.textContent = getGithubStatusText();

  // Unauthenticated GitHub API allows 60 requests/hour — a fresh cached copy
  // renders instantly and keeps the budget for colour extraction.
  const cached = readStorageJson(REPO_CACHE_KEY, null);
  if (cached && Array.isArray(cached.repos) && Date.now() - cached.savedAt < REPO_CACHE_FRESH_MS) {
    githubStatusMode = "loaded";
    renderRepos(cached.repos);
    return;
  }

  try {
    const response = await fetch("https://api.github.com/users/mzmuda101-prog/repos?sort=pushed&per_page=30", {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined,
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = prepareRepos(await response.json());
    writeStorageJson(REPO_CACHE_KEY, { repos, savedAt: Date.now() });
    githubStatusMode = "loaded";
    renderRepos(repos);
  } catch {
    if (cached && Array.isArray(cached.repos) && cached.repos.length) {
      githubStatusMode = "cached";
      renderRepos(cached.repos);
      return;
    }
    githubStatusMode = "fallback";
    renderRepos(repoFallback);
  }
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

if (heroStage && heroShot && !prefersReducedMotion) {
  heroStage.addEventListener("pointermove", (event) => {
    if (heroStage.classList.contains("has-panel-focus")) return;

    const rect = heroStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroShot.style.transform = `rotate(-4deg) translate(${x * 18}px, ${y * 18}px)`;
  });

  heroStage.addEventListener("pointerleave", () => {
    heroShot.style.transform = "rotate(-4deg) translate(0, 0)";
  });
}

if (!prefersReducedMotion) {
  magneticButtons.forEach((button) => {
    const label = button.querySelector("span");
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameId = null;

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      if (Math.abs(targetX - currentX) < 0.08 && Math.abs(targetY - currentY) < 0.08) {
        currentX = targetX;
        currentY = targetY;
      }

      button.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (label) {
        label.style.transform = `translate3d(${currentX * 0.42}px, ${currentY * 0.42}px, 0)`;
      }

      if (currentX !== targetX || currentY !== targetY) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        frameId = null;
      }
    };

    const ensureAnimation = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 12;
      targetY = y * 12;
      ensureAnimation();
    });

    button.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      ensureAnimation();
    });
  });

  window.addEventListener("pointermove", (event) => {
    if (!activeHeroPanel) return;
    // Ignore the first moments after open so the emerge animation can finish.
    if (performance.now() - panelFocusedAt < 500) return;
    if (isPointerFarFromHero(event.clientX, event.clientY)) {
      setPanelFocus(null);
    }
  });
}
// _______________________________________________________________ SET PANEL FOCUS _____________________________________________________________
const PANEL_ELEVATE_MS = 280;
const PANEL_SLIDE_MS = 620;
const PANEL_VARS = ["--panel-tx", "--panel-ty", "--panel-rest-tx", "--panel-rest-ty"];
const SHOT_VARS = ["--shot-tx", "--shot-ty", "--shot-rot", "--shot-scale"];

function setVars(el, vars) {
  Object.entries(vars).forEach(([key, value]) => {
    if (value == null || value === "") el.style.removeProperty(key);
    else el.style.setProperty(key, value);
  });
}

function clearVars(el, keys) {
  keys.forEach((key) => el.style.removeProperty(key));
}

function overlapXY(a, b) {
  return {
    x: Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)),
    y: Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)),
  };
}

function clampToRoom(tx, ty, room) {
  return {
    x: clamp(tx, -Math.max(0, room.left), Math.max(0, room.right)),
    y: clamp(ty, -Math.max(0, room.top), Math.max(0, room.bottom)),
  };
}

/** Measure panel/shot/stage as if no focus transforms were applied. */
function measureHeroGeometry(panel) {
  const savedPanel = {
    transition: panel.style.transition,
    transform: panel.style.transform,
  };
  const savedShot = {
    transition: heroShot.style.transition,
    transform: heroShot.style.transform,
  };
  const hadFocus = heroStage.classList.contains("has-panel-focus");
  const panelVarSnapshot = Object.fromEntries(PANEL_VARS.map((key) => [key, panel.style.getPropertyValue(key)]));

  panel.style.transition = "none";
  heroShot.style.transition = "none";
  panel.style.setProperty("transform", "none", "important");
  PANEL_VARS.forEach((key) => panel.style.setProperty(key, "0px"));
  if (hadFocus) heroStage.classList.remove("has-panel-focus");
  heroShot.style.transform = "";
  void panel.offsetWidth;

  const geometry = {
    panel: panel.getBoundingClientRect(),
    shot: heroShot.getBoundingClientRect(),
    stage: heroStage.getBoundingClientRect(),
  };

  if (hadFocus) heroStage.classList.add("has-panel-focus");
  panel.style.transition = savedPanel.transition;
  panel.style.transform = savedPanel.transform;
  setVars(panel, panelVarSnapshot);
  heroShot.style.transition = savedShot.transition;
  heroShot.style.transform = savedShot.transform;

  return geometry;
}

function computePanelSlide(panel) {
  if (!heroStage || !heroShot) return { x: 0, y: 0 };

  const { panel: panelRect, shot: shotRect, stage: stageRect } = measureHeroGeometry(panel);
  const isMain = panel.classList.contains("hero-panel-main");
  const compact = window.innerWidth <= 760;
  const pad = 14;

  const room = {
    left: panelRect.left - Math.max(pad, stageRect.left - (isMain ? 56 : 28)),
    right: Math.min(window.innerWidth - pad, stageRect.right + (isMain ? 28 : 72)) - panelRect.right,
    top: panelRect.top - Math.max(pad, stageRect.top - (isMain ? 20 : 36)),
    bottom: Math.min(window.innerHeight - pad, stageRect.bottom + 8) - panelRect.bottom,
  };

  let nx = (panelRect.left + panelRect.right) / 2 - (shotRect.left + shotRect.right) / 2;
  let ny = (panelRect.top + panelRect.bottom) / 2 - (shotRect.top + shotRect.bottom) / 2;

  if (isMain) {
    nx = nx * 0.35 - 0.8;
    ny = ny * 0.35 - 0.45;
  } else {
    nx = nx * 0.4 + 0.55;
    ny = ny * 0.35 - 0.15;
  }

  // Steer away from cramped edges (especially: don't dive under the photo).
  if (room.left < 24 && room.right > room.left) {
    if (isMain) {
      nx *= 0.15;
      ny = -Math.abs(ny) - 0.55;
    } else nx = Math.abs(nx) + 0.35;
  }
  if (room.right < 24 && room.left > room.right) nx = -Math.abs(nx) - 0.35;
  if (room.top < 24 && room.bottom > room.top) {
    if (isMain) {
      ny *= 0.12;
      nx = nx <= 0 ? -Math.abs(nx) - 0.55 : nx * 0.25;
    } else ny = Math.abs(ny) + 0.35;
  }
  if (room.bottom < 24 && room.top > room.bottom) ny = -Math.abs(ny) - 0.35;

  const len = Math.hypot(nx, ny) || 1;
  nx /= len;
  ny /= len;

  const overlap = overlapXY(panelRect, shotRect);
  const desired = isMain
    ? clamp(Math.max(overlap.x * Math.abs(nx), overlap.y * Math.abs(ny)) * 0.42 + (compact ? 12 : 16), 30, compact ? 52 : 64)
    : clamp(Math.max(overlap.x * Math.abs(nx), overlap.y * Math.abs(ny)) * 0.72 + (compact ? 20 : 32), 52, compact ? 96 : 132);

  let { x: tx, y: ty } = clampToRoom(nx * desired, ny * desired, room);

  if (Math.abs(tx) < desired * 0.35 && Math.abs(nx) >= Math.abs(ny)) {
    ({ x: tx, y: ty } = clampToRoom(tx, Math.sign(ny || (isMain ? -1 : 1)) * desired * 0.7, room));
  } else if (Math.abs(ty) < desired * 0.35 && Math.abs(ny) > Math.abs(nx)) {
    ({ x: tx, y: ty } = clampToRoom(Math.sign(nx || (isMain ? -1 : 1)) * desired * 0.7, ty, room));
  }

  const minTravel = isMain ? (compact ? 24 : 36) : compact ? 32 : 56;
  if (Math.hypot(tx, ty) < minTravel) {
    ({ x: tx, y: ty } = clampToRoom(
      isMain ? -minTravel : minTravel * 0.55,
      isMain ? -minTravel * 0.5 : -minTravel * 0.85,
      room
    ));
  }

  const nearView =
    panelRect.bottom > -40 &&
    panelRect.top < window.innerHeight + 40 &&
    panelRect.right > -40 &&
    panelRect.left < window.innerWidth + 40;

  if (nearView) {
    const viewBottom = window.innerHeight - pad;
    if (panelRect.bottom + ty > viewBottom) ({ x: tx, y: ty } = clampToRoom(tx, ty - (panelRect.bottom + ty - viewBottom), room));
    if (panelRect.top + ty < pad) ({ x: tx, y: ty } = clampToRoom(tx, ty + (pad - (panelRect.top + ty)), room));
  }

  return { x: Math.round(tx), y: Math.round(ty) };
}

function applyShotRelease(panel, slide) {
  if (!heroStage || !heroShot) return;
  const compact = window.innerWidth <= 760;
  const push = compact ? 0.62 : 0.78;
  setVars(heroStage, {
    "--shot-tx": `${Math.round(-slide.x * push + (slide.x >= 0 ? 8 : -8))}px`,
    "--shot-ty": `${Math.round(-slide.y * push + (compact ? 8 : 4))}px`,
    "--shot-rot": `${compact ? 0 : panel.classList.contains("hero-panel-main") ? -6.5 : -5}deg`,
    "--shot-scale": String(compact ? 0.98 : 0.95),
  });
  heroShot.style.transform = "";
}

function clearPanelTimers() {
  if (panelElevateTimer !== null) {
    window.clearTimeout(panelElevateTimer);
    panelElevateTimer = null;
  }
  if (panelTuckTimer !== null) {
    window.clearTimeout(panelTuckTimer);
    panelTuckTimer = null;
  }
}

function raiseFocusedPanel(panel) {
  panel.classList.add("is-focused");
  panel.classList.remove("is-emerging");
  heroStage?.classList.add("is-panel-raised");
}

function setPanelFocus(activePanel) {
  activeHeroPanel = activePanel;
  panelFocusedAt = activePanel ? performance.now() : 0;
  clearPanelTimers();
  heroStage?.classList.toggle("has-panel-focus", Boolean(activePanel));

  if (!activePanel) {
    clearVars(heroStage, SHOT_VARS);
    heroStage?.classList.remove("is-panel-raised");

    const openPanels = heroPanels.filter((panel) => panel.classList.contains("is-focused") || panel.classList.contains("is-emerging"));

    heroPanels.forEach((panel) => {
      panel.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-dimmed");
      if (openPanels.includes(panel) && !prefersReducedMotion) {
        panel.classList.add("is-emerging");
        panel.classList.remove("is-focused");
      } else {
        panel.classList.remove("is-focused", "is-emerging");
        clearVars(panel, PANEL_VARS);
      }
    });

    if (openPanels.length && !prefersReducedMotion) {
      openPanels.forEach((panel) => clearVars(panel, PANEL_VARS));
      panelTuckTimer = window.setTimeout(() => {
        panelTuckTimer = null;
        if (activeHeroPanel) return;
        openPanels.forEach((panel) => panel.classList.remove("is-emerging"));
      }, PANEL_SLIDE_MS);
    }
    return;
  }

  const slide = prefersReducedMotion ? { x: 0, y: 0 } : computePanelSlide(activePanel);
  applyShotRelease(activePanel, slide);
  heroStage?.classList.remove("is-panel-raised");

  heroPanels.forEach((panel) => {
    const isActive = panel === activePanel;
    panel.classList.toggle("is-dimmed", !isActive);
    panel.classList.toggle("is-emerging", isActive);
    panel.classList.remove("is-focused");
    panel.setAttribute("aria-expanded", String(isActive));

    if (isActive) {
      setVars(panel, {
        "--panel-tx": `${slide.x}px`,
        "--panel-ty": `${slide.y}px`,
        "--panel-rest-tx": null,
        "--panel-rest-ty": null,
      });
    } else {
      const isMain = panel.classList.contains("hero-panel-main");
      setVars(panel, {
        "--panel-tx": null,
        "--panel-ty": null,
        "--panel-rest-tx": `${isMain ? 10 : -8}px`,
        "--panel-rest-ty": `${isMain ? 8 : -6}px`,
      });
    }
  });

  if (prefersReducedMotion) {
    raiseFocusedPanel(activePanel);
  } else {
    panelElevateTimer = window.setTimeout(() => {
      panelElevateTimer = null;
      if (activeHeroPanel === activePanel) raiseFocusedPanel(activePanel);
    }, PANEL_ELEVATE_MS);
  }
}

function isPointerFarFromHero(x, y) {
  if (!heroStage) return false;
  const rect = heroStage.getBoundingClientRect();
  const margin = 90;
  return x < rect.left - margin || x > rect.right + margin || y < rect.top - margin || y > rect.bottom + margin;
}

window.addEventListener("resize", () => {
  if (!activeHeroPanel) return;
  window.clearTimeout(panelFocusResizeTimer);
  panelFocusResizeTimer = window.setTimeout(() => {
    if (activeHeroPanel) setPanelFocus(activeHeroPanel);
  }, 120);
});

// ________________________________________________________________ Language controler _________________________________________________________
const languageController = window.PortfolioLanguage.createLanguageController({
  storageKey: STORAGE_KEY,
  copy,
  langButtons,
  getActiveProjectKey: () => activeProjectKey,
  getCurrentRepos: () => currentRepos,
  getGithubStatusText,
  renderSpotlight,
  renderRepos,
  setGithubStatusText: (text) => {
    githubStatus.textContent = text;
  },
  setCurrentLang: (lang) => {
    currentLang = lang;
  },
});
// ________________________________________________________________ PODPIĘCIE CURSOR HINT ________________________________________________________________
const cursorHintController = window.PortfolioCursorHint.createCursorHintController({
  cursorHint,
  prefersReducedMotion,
  getFallbackHint: () => copy[currentLang].clickHint,
});

cursorHintController.setupCursorHint(heroPanels, (panel) => {
  const isAlreadyFocused = panel.classList.contains("is-focused");
  setPanelFocus(isAlreadyFocused ? null : panel);
});

const hintTargets = document.querySelectorAll(
  "[data-hint]:not(.hero-panel-trigger), [data-hint-class], [data-hint-class-only]"
);
cursorHintController.setupCursorHint(hintTargets);
// ________________________________________________________________ KEYBOARD NAVIGATION ________________________________________________________________
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setPanelFocus(null);
  }
});
// ________________________________________________________________ SMOOTH SCROLL (Lenis) ________________________________________________________________
function getHeaderOffset() {
  return (siteHeader ? siteHeader.getBoundingClientRect().height : 0) + 12;
}

function initSmoothScroll() {
  // Reduced motion and touch devices keep native scrolling.
  if (prefersReducedMotion || typeof Lenis === "undefined") return;

  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    lerp: 0.085,
  });

  // One driver per frame — calling lenis.raf twice doubled the scroll speed.
  const raf = (time) => {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  };
  window.requestAnimationFrame(raf);
}

// Layout position, ignoring transforms — a not-yet-revealed section is still
// shifted down by its reveal animation, which would make us land too far.
function getDocumentTop(element) {
  let top = 0;
  for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

function scrollToTarget(target) {
  const top = target === "top" ? 0 : Math.max(0, getDocumentTop(target) - getHeaderOffset());
  if (lenis) {
    lenis.scrollTo(top);
    return;
  }
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

  const id = link.getAttribute("href").slice(1);
  const target = id === "top" || id === "" ? "top" : getEl(id);
  if (!target) return;

  event.preventDefault();
  scrollToTarget(target);

  // Keep keyboard users where they landed.
  if (target !== "top") {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
});

// ________________________________________________________________ SCROLLSPY (active nav link) ________________________________________________________________
let currentNavId;

function setCurrentNav(sectionId) {
  if (sectionId === currentNavId) return;
  currentNavId = sectionId;
  navLinks.forEach((link) => {
    const isCurrent = link.dataset.nav === sectionId;
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  const nav = getEl("site-nav");
  if (nav) revealActiveInRow(nav);
}

if ("IntersectionObserver" in window && navLinks.length) {
  const spySections = navLinks.map((link) => getEl(link.dataset.nav)).filter(Boolean);
  const visibleSections = new Set();
  let spyFrame = null;

  const updateSpy = () => {
    spyFrame = null;
    // The short last section never reaches the reading line — at the very
    // bottom of the page it is the one being read.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    // Otherwise the last section in document order that crosses the reading line wins.
    const current = atBottom
      ? spySections[spySections.length - 1]
      : spySections.filter((section) => visibleSections.has(section.id)).pop();
    setCurrentNav(current ? current.id : null);
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target.id);
        else visibleSections.delete(entry.target.id);
      });
      updateSpy();
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  spySections.forEach((section) => spy.observe(section));
  window.addEventListener(
    "scroll",
    () => {
      if (spyFrame === null) spyFrame = window.requestAnimationFrame(updateSpy);
    },
    { passive: true }
  );
}

// ________________________________________________________________ OVERFLOW ROWS (phones) ________________________________________________________________
// Nav and project tabs become one scrollable row on narrow screens; the edge
// fades only on the side where something is actually hidden.
const compactLayout = window.matchMedia("(max-width: 760px)");
const overflowRows = [getEl("site-nav"), document.querySelector(".project-list")].filter(Boolean);

function updateOverflowFade(row) {
  const isRow = row.classList.contains("overflow-row");
  const maxScroll = row.scrollWidth - row.clientWidth;
  row.classList.toggle("has-more-start", isRow && row.scrollLeft > 2);
  row.classList.toggle("has-more-end", isRow && maxScroll - row.scrollLeft > 2);
}

function revealActiveInRow(row) {
  const active = row.querySelector(".is-active, .is-current");
  if (!active || !row.classList.contains("overflow-row")) return;
  const rowRect = row.getBoundingClientRect();
  const itemRect = active.getBoundingClientRect();
  if (itemRect.left < rowRect.left + 24 || itemRect.right > rowRect.right - 40) {
    row.scrollBy({ left: itemRect.left - rowRect.left - 24, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
}

function applyOverflowRows() {
  overflowRows.forEach((row) => {
    row.classList.toggle("overflow-row", compactLayout.matches);
    if (!compactLayout.matches) row.scrollLeft = 0;
    updateOverflowFade(row);
  });
}

overflowRows.forEach((row) => {
  row.setAttribute("data-lenis-prevent-wheel", "");
  row.addEventListener("scroll", () => updateOverflowFade(row), { passive: true });
  // A vertical mouse wheel scrolls the row sideways while it can.
  row.addEventListener(
    "wheel",
    (event) => {
      if (!row.classList.contains("overflow-row") || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const maxScroll = row.scrollWidth - row.clientWidth;
      const canScroll = (event.deltaY > 0 && row.scrollLeft < maxScroll - 1) || (event.deltaY < 0 && row.scrollLeft > 1);
      if (!canScroll) return;
      event.preventDefault();
      row.scrollLeft += event.deltaY;
    },
    { passive: false }
  );
  if ("ResizeObserver" in window) new ResizeObserver(() => updateOverflowFade(row)).observe(row);
});

compactLayout.addEventListener?.("change", applyOverflowRows);
applyOverflowRows();

// ________________________________________________________________ TOAST ________________________________________________________________
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

// ________________________________________________________________ COPY EMAIL ________________________________________________________________
const copyEmailButton = getEl("copy-email");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied / no user activation — try the legacy path below.
    }
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  if (!ok) throw new Error("copy failed");
}

copyEmailButton?.addEventListener("click", async () => {
  try {
    await copyText(copyEmailButton.dataset.email);
    copyEmailButton.classList.add("is-done");
    window.setTimeout(() => copyEmailButton.classList.remove("is-done"), 1600);
    showToast(copy[currentLang].copyEmailDone);
  } catch {
    showToast(copy[currentLang].copyEmailFailed);
  }
});

// ________________________________________________________________ SCREENSHOT LIGHTBOX ________________________________________________________________
const lightbox = getEl("image-lightbox");
const lightboxImage = getEl("image-lightbox-img");
const lightboxCaption = getEl("image-lightbox-caption");
const spotlightZoom = getEl("spotlight-zoom");

function openLightbox() {
  if (!lightbox || typeof lightbox.showModal !== "function") {
    window.open(spotlight.image.currentSrc || spotlight.image.src, "_blank", "noopener");
    return;
  }
  lightboxImage.src = spotlight.image.currentSrc || spotlight.image.src;
  lightboxImage.alt = spotlight.image.alt;
  lightboxCaption.textContent = spotlight.title.textContent;
  cursorHint?.classList.remove("is-visible");
  lenis?.stop();
  lightbox.showModal();
}

spotlightZoom?.addEventListener("click", openLightbox);
getEl("image-lightbox-close")?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  // Click on the dimmed backdrop (the dialog itself, not its content) closes it.
  if (event.target === lightbox) lightbox.close();
});
lightbox?.addEventListener("close", () => {
  lenis?.start();
  spotlightZoom?.focus({ preventScroll: true });
});

// ________________________________________________________________ LANGUAGE init ________________________________________________________________
activeProjectKey = getProjectKeyFromUrl() || activeProjectKey;
currentLang = languageController.getCurrentLang();
languageController.init();

languageController.applyLanguage(currentLang);
initSmoothScroll();
loadRepos();