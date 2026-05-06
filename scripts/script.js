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
  repoGrid.replaceChildren(...repos.map((repo) => createRepoCard(repo)));
  githubStatus.textContent = getGithubStatusText();
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
