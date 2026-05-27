const {
  STORAGE_KEY,
  defaultProjectProps,
  projects,
  repoFallback,
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
const heroStageButton1 = document.querySelector(".hero-stage-button-1");
const heroStageButton2 = document.querySelector(".hero-stage-button-2");
const heroShot = document.querySelector(".hero-shot");
const magneticButtons = document.querySelectorAll(".button-magnetic");
const heroPanels = Array.from(document.querySelectorAll(".hero-panel-trigger"));
const cursorHint = getEl("cursor-hint");
const langButtons = Array.from(document.querySelectorAll(".lang-button"));

let currentLang = "pl";
let activeProjectKey = "excel-workbench-pwa";
let activeHeroPanel = null;
let currentRepos = [];
let githubStatusMode = "loading";

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
// Results are cached in sessionStorage so extraction runs once per session,
// never on repeat visits or language switches.

const colorThief = (typeof ColorThief !== 'undefined') ? new ColorThief() : null;
const SESSION_CACHE_KEY = 'portfolio-repo-colors-v1';

// ── Load/save cache ────────────────────────────────────────────────────────────

function loadColorCache() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_CACHE_KEY) || '{}');
  } catch { return {}; }
}

function saveColorCache(cache) {
  try { sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(cache)); } catch {}
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
const CSS_CANDIDATES = [
  'styles.css', 'style.css', 'index.css', 'app.css', 'main.css',
  'src/styles.css', 'src/style.css', 'src/index.css', 'src/app.css',
  'css/style.css', 'css/styles.css', 'css/main.css',
  'public/styles.css', 'assets/styles.css',
];
const BRANCHES = ['main', 'master'];

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
  try {
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`,
      { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(5000) }
    );
    if (treeRes.ok) {
      const data = await treeRes.json();
      if (data.tree) {
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

  // 2. Fallback: guess common filenames × branches
  for (const branch of BRANCHES) {
    for (const path of CSS_CANDIDATES) {
      const rgb = await fetchAndExtractCss(rawUrl(owner, repo, branch, path));
      if (rgb) return rgb;
    }
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

  // Serve from session cache (extracted once per session, never again)
  if (repoColorCache[cacheKey] !== undefined) {
    return repoColorCache[cacheKey];
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

  // Cache to sessionStorage — never runs extraction again this session
  repoColorCache[cacheKey] = theme;
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
  return new Intl.DateTimeFormat(copy[currentLang].locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function getGithubStatusText() {
  if (githubStatusMode === "loaded") return copy[currentLang].githubStatusLoaded;
  if (githubStatusMode === "fallback") return copy[currentLang].githubStatusFallback;
  return copy[currentLang].githubStatusLoading;
}

function getRepoDescription(repo) {
  if (typeof repo.description === "object" && repo.description !== null) {
    return repo.description[currentLang] || repo.description.pl || repo.description.en;
  }

  return repo.description || copy[currentLang].repoNoDescription;
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
    if (tabCopy) tab.textContent = tabCopy.tabLabel;
  });

  activeProjectKey = projectKey;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const nextProjectKey = tab.dataset.project;
    if (nextProjectKey === activeProjectKey) return;

    if (spotlight.root) {
      spotlight.root.classList.add("is-switching");
      window.setTimeout(() => renderSpotlight(nextProjectKey), 110);
      window.setTimeout(() => spotlight.root.classList.remove("is-switching"), 320);
      return;
    }

    renderSpotlight(nextProjectKey);
  });
});

async function loadRepos() {
  githubStatusMode = "loading";
  githubStatus.textContent = getGithubStatusText();

  try {
    const response = await fetch("https://api.github.com/users/mzmuda101-prog/repos?sort=updated&per_page=9", {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = await response.json();
    githubStatusMode = "loaded";
    renderRepos(repos);
  } catch {
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
    if (activeHeroPanel && isPointerFarFromHero(event.clientX, event.clientY)) {
      setPanelFocus(null);
    }
  });
}
// _______________________________________________________________ SET PANEL FOCUS _____________________________________________________________
function setPanelFocus(activePanel) {
  activeHeroPanel = activePanel;

  if (heroStage) {
    heroStage.classList.toggle("has-panel-focus", Boolean(activePanel));
  }

  heroPanels.forEach((panel) => {
    const isActive = panel === activePanel;
    panel.classList.toggle("is-focused", isActive);
    panel.classList.toggle("is-dimmed", Boolean(activePanel) && !isActive);
    panel.setAttribute("aria-expanded", String(isActive));
  });
}

function isPointerFarFromHero(x, y) {
  if (!heroStage) return false;
  const rect = heroStage.getBoundingClientRect();
  const margin = 90;

  return x < rect.left - margin || x > rect.right + margin || y < rect.top - margin || y > rect.bottom + margin;
}
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
// ________________________________________________________________ LANGUAGE init ________________________________________________________________
currentLang = languageController.getCurrentLang();
languageController.init();

languageController.applyLanguage(currentLang);
loadRepos();