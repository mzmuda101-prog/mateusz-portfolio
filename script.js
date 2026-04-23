// Uogólniam projekty żeby łatwiej dokładać i można było dynamicznie coś dograć (np. kolory czy dane z fetchowania z API).
const defaultProjectProps = {
  accent: "#ce5a2f", // domyślny accent (fallback gdy nie określono per-project)
  accentDeep: "#a03e1b",
  glow: "rgba(206, 90, 47, 0.18)",
  glowSoft: "rgba(206, 90, 47, 0.12)",
  repoTheme: {
    fillStrength: "14%",
    borderStrength: "20%",
    shadowStrength: "18%",
    softGlowSize: "46%",
  },
  // Można dodać tu domyślne ikony czy cokolwiek do dziedziczenia
};

// Elastyczny helper, z możliwością podmiany configów głębiej jeśli projekty są bardziej zagnieżdżone
function makeProject(spec, overrideDefaultProps = {}) {
  return {
    ...defaultProjectProps,
    ...overrideDefaultProps,
    ...spec,
    repoTheme: {
      ...defaultProjectProps.repoTheme,
      ...(overrideDefaultProps.repoTheme || {}),
      ...(spec.repoTheme || {})
    }
  };
}

// --- [NOWE]: Zautomatyzowane wykrywanie i tworzenie project configów na podstawie zfetchowanych repozytoriów
// Pomysł: jeśli fetch z GitHub da nowe repo bez wpisu per-project w poniższym 'projects', to dodać go automatycznie z fallbackiem do defaultowych styli
function insertDynamicProjectFromRepo(repo) {
  // Sprawdź czy istnieje w projects - jeśli nie, stwórz z fallbackiem
  const key = normalizeRepoToken(repo.name);
  if (!(key in projects)) {
    projects[key] = makeProject({
      title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      kicker: repo.language ? `${repo.language} / GitHub` : "GitHub",
      description: repo.description || "Projekt zaimportowany automatycznie z GitHub.",
      actions: [
        ...(repo.homepage ? [{ label: "Live demo", href: repo.homepage }] : []),
        { label: "Repozytorium", href: repo.html_url }
      ],
      // Spróbuj podpiąć jakikolwiek domyślny stack jeżeli nieznany język
      stack: repo.language ? [repo.language] : ["Unknown"],
      // Kolory mogą być pobierane dynamicznie! Można podrasować np. do generowania na podstawie language/brand
      accent: defaultProjectProps.accent,
      accentDeep: defaultProjectProps.accentDeep,
      glow: defaultProjectProps.glow,
      glowSoft: defaultProjectProps.glowSoft,
      image: "", // Można spróbować pobierać np. GitHub social image, albo fallback ikonke
      imageAlt: `Screenshot of ${repo.name}`,
      meta: [
        repo.description || "Repozytorium bez opisu.",
        `Ostatnia aktualizacja: ${(new Date(repo.updated_at)).toLocaleDateString()}`,
      ],
    });
    // @mateusz: jeżeli chcesz mocniej stylować po języku albo "brandować" - można tu podpiąć mapę domyślnych akcentów per język!
  }
}

// Wersja rozwojowa, pozwala na kick-off z fetchem danych czy sekcjami - można np. dynamicznie doklejać do tego obiektu projekty!
const projects = {
  "excel-workbench-pwa": makeProject({
    kicker: "PWA / data tools",
    title: "Excel Workbench PWA",
    accent: "#2f6f5c",
    accentDeep: "#245849",
    glow: "rgba(47, 111, 92, 0.22)",
    glowSoft: "rgba(168, 217, 184, 0.18)",
    repoTheme: {
      fillStrength: "18%",
      borderStrength: "28%",
      shadowStrength: "24%",
      softGlowSize: "52%",
    },
    description:
      "Offline-first aplikacja do przeglądania, filtrowania, analizowania i lekkiego przekształcania plików Excel bez backendu i bez wysyłania danych poza urządzenie.",
    image: "./assets/excel-workbench-pwa-2.png",
    imageAlt: "Zrzut ekranu Excel Workbench PWA",
    meta: [
      "Działa lokalnie w przeglądarce i wspiera tryb offline.",
      "Skupiona na realnym workflow wokół arkuszy, a nie na kopiowaniu całego Excela.",
      "Ma narzędzia do inspekcji struktury, filtrów, sortowania i eksportu.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PWA", "Sheet workflows"],
    actions: [
      {
        label: "Live demo",
        href: "https://excel-workbench-pwa.vercel.app",
      },
      {
        label: "Repozytorium",
        href: "https://github.com/mzmuda101-prog/excel-workbench-pwa",
      },
    ],
  }),
  "excel-workbench": makeProject({
    kicker: "Desktop app / Excel tooling",
    title: "Excel Workbench",
    accent: "#3f6db5",
    accentDeep: "#294676",
    glow: "rgba(63, 109, 181, 0.2)",
    glowSoft: "rgba(122, 162, 224, 0.18)",
    repoTheme: {
      fillStrength: "16%",
      borderStrength: "24%",
      shadowStrength: "22%",
      softGlowSize: "50%",
    },
    description:
      "Modularne narzędzie desktopowe do pracy z workbookami Excela, z wyraźnym podziałem logiki na moduły odpowiedzialne za filtrowanie, formatowanie, układ kolumn i obsługę plików.",
    image: "./assets/excel-workbench-logo.png",
    imageAlt: "Logo projektu Excel Workbench",
    meta: [
      "Refaktoryzacja z monolitu do czytelnej, modułowej architektury.",
      "Obsługa filtrowania, sortowania, edycji komórek i analizy workbooka.",
      "Silny nacisk na utrzymanie, testowalność i dalszą rozbudowę.",
    ],
    stack: ["Python", "Tkinter", "openpyxl", "Desktop UI"],
    actions: [],
  }),
  "portal-ogloszeniowy": makeProject({
    kicker: "Marketplace / cloud integrations",
    title: "Portal Ogłoszeniowy",
    accent: "#E67C21",
    accentDeep: "#D55704",
    glow: "rgba(230, 126, 34, 0.22)",
    glowSoft: "rgba(241, 158, 15, 0.18)",
    repoTheme: {
      fillStrength: "20%",
      borderStrength: "30%",
      shadowStrength: "26%",
      softGlowSize: "54%",
    },
    description:
      "Marketplace z panelem administratora, publikacją ogłoszeń oraz integracjami z Firebase i Cloudinary. Projekt łączy prostą ścieżkę publikacji z realnym deployem online.",
    image: "./assets/portal-bg.jpg",
    imageAlt: "Tło projektu Portal Ogłoszeniowy",
    meta: [
      "Logowanie administratora i zarządzanie ogłoszeniami.",
      "Obsługa uploadu zdjęć i filtrowania po kategoriach.",
      "Wersja live dostępna online na Vercel.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Firebase", "Cloudinary"],
    actions: [
      {
        label: "Live demo",
        href: "https://portal-ogloszeniowy.vercel.app",
      },
      {
        label: "Repozytorium",
        href: "https://github.com/mzmuda101-prog/Portal-Ogloszeniowy",
      },
    ],
  }),
  "data-collector": makeProject({
    kicker: "Frontend / Excel export",
    title: "Data Collector & Excel Export",
    accent: "#e94560",
    accentDeep: "#a5283f",
    glow: "rgba(233, 69, 96, 0.24)",
    glowSoft: "rgba(255, 107, 107, 0.18)",
    repoTheme: {
      fillStrength: "19%",
      borderStrength: "29%",
      shadowStrength: "26%",
      softGlowSize: "52%",
    },
    description:
      "Interaktywna strona demonstracyjna, która łączy motion-driven frontend z praktycznym przepływem danych i eksportem do pliku Excel przez SheetJS.",
    image: "./assets/data-collector-bg.png",
    imageAlt: "Tło projektu Data Collector & Excel Export",
    meta: [
      "Animowany layout project-first z intro i efektami wizualnymi.",
      "Dynamiczny formularz danych i eksport do `.xlsx`.",
      "Pokazuje połączenie UX, frontendu i pracy z danymi po stronie klienta.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "SheetJS"],
    actions: [
      {
        label: "Live demo",
        href: "https://strona-6.vercel.app",
      },
      {
        label: "Repozytorium",
        href: "https://github.com/mzmuda101-prog/Data-Collector-Excel-App",
      },
    ],
  }),
  "code-learning-analyzer": makeProject({
    kicker: "CLI / reports / learning tool",
    title: "Code Learning Analyzer",
    accent: "#6f54d9",
    accentDeep: "#48309f",
    glow: "rgba(111, 84, 217, 0.2)",
    glowSoft: "rgba(166, 144, 255, 0.18)",
    repoTheme: {
      fillStrength: "18%",
      borderStrength: "27%",
      shadowStrength: "24%",
      softGlowSize: "50%",
    },
    description:
      "Analizator jakości kodu dla osób uczących się programowania i projektów portfolio. Generuje raporty tekstowe, Excel, PDF i HTML, a przy tym tłumaczy sens metryk.",
    image: "./assets/code-learning-analyzer-ui.png",
    imageAlt: "Zrzut interfejsu projektu Code Learning Analyzer",
    meta: [
      "Obsługuje analizę folderów, plików, Git i udział języków.",
      "Łączy utility CLI z trybem nauki i wyjaśnianiem metryk.",
      "Projekt skierowany do nauki świadomego rozwijania jakości kodu.",
    ],
    stack: ["Python", "CLI", "Tkinter", "HTML reports", "PDF/XLSX export"],
    actions: [
      {
        label: "Repozytorium",
        href: "https://github.com/mzmuda101-prog/code-learning-analyzer",
      },
    ],
  }),
};

// --- fallbacky dla repozytoriów: można by dynamicznie dogrywać z GitHub API jeśli offline no to z tego arraya (no i np. ładować później język/kategorie)
// Rozważam trzymanie tylko minimalnego fallbacka, a resztę updateować przez fetch jak online!
const repoFallback = [
  {
    name: "excel-workbench-pwa",
    description: "Offline-first workbench do pracy z plikami Excel w przeglądarce.",
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/excel-workbench-pwa",
    homepage: "https://excel-workbench-pwa.vercel.app",
    isPublic: true, // można wyfiltrować do podglądu tylko publiczne itd.
  },
  {
    name: "Portal-Ogloszeniowy",
    description: "Marketplace z panelem administratora i integracjami chmurowymi.",
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/Portal-Ogloszeniowy",
    homepage: "https://portal-ogloszeniowy.vercel.app",
    isPublic: true,
  },
  {
    name: "Data-Collector-Excel-App",
    description: "Interaktywny frontend z eksportem danych do Excela.",
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/Data-Collector-Excel-App",
    homepage: "https://strona-6.vercel.app",
    isPublic: true,
  },
  {
    name: "code-learning-analyzer",
    description: "Analizator jakości kodu z raportami i trybem nauki.",
    language: "Python",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/code-learning-analyzer",
    homepage: "",
    isPublic: true,
  },
];

// Centralizuję pobieranie elementów z możliwością refaktoru pod lazy-get czy proxy (pomysł: "UI.get('spotlight-kicker')")
function getEl(id) {
  // fallbacky (np. do testów: można tu dorobić try/catch czy warn)
  return document.getElementById(id);
}

// Spotlight można w sumie łatwo w przyszłości zrobić jako class z metodami typu "set" czy animacjami CSS - dla elastyczności zostaje tu prosty obiekt
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

// Tabsy - pamiętać, że łatwo potem dorobić tryb dynamiczny przez data-* lub nadpisać poniższy Selectorem
const tabs = Array.from(document.querySelectorAll(".project-tab"));
// repoGrid, githubStatus itp trzymam bardziej klasycznie - nie ma sensu tu proxy dawać na razie
const repoGrid = getEl("repo-grid");
const githubStatus = getEl("github-status");
const revealTargets = document.querySelectorAll(".reveal");
const heroStage = document.querySelector(".hero-stage");
const heroShot = document.querySelector(".hero-shot");
const magneticButtons = document.querySelectorAll(".button-magnetic");
const heroPanels = Array.from(document.querySelectorAll(".hero-panel-trigger"));
const cursorHint = getEl("cursor-hint");

// UI State - przewidziane na przyszłość do scentralizowania (można zrobić object UIState/Reactive)
let activeProjectKey = "excel-workbench-pwa";
let activeHeroPanel = null;
let cursorHintX = -999;
let cursorHintY = -999;
let cursorHintTargetX = -999;
let cursorHintTargetY = -999;
let cursorHintFrame = null;

// Repozytoria - aliasy (potencjał na dynamiczny mapping jak integracja z GitHub API, np. z automatu generować aliasy)
// --- [NOWE] hint: można dorzucić wstępne uzgadnianie aliasów na podstawie homepage czy url automatycznie!
const repoProjectAliases = {
  "excel-workbench-pwa": "excel-workbench-pwa",
  "portal-ogloszeniowy": "portal-ogloszeniowy",
  "portal-ogloszeniowy-vercel-app": "portal-ogloszeniowy",
  "data-collector-excel-app": "data-collector",
  "strona-6-vercel-app": "data-collector",
  "code-learning-analyzer": "code-learning-analyzer",
  "excel-workbench": "excel-workbench",
  // @mateusz: Jeśli chcesz by nowe projekty łapały mapowanie aliasów automatycznie, możesz odpalić loopa po fetchowanych repo i dodawać tutaj aliasy per homepage/url!
};

// Domyślny theme dla repo, jeśli nie znajdzie - patrz makeProject (głębokie dziedziczenie, zawsze coś jest)
const defaultRepoTheme = { ...defaultProjectProps.repoTheme };

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

  const theme = {
    ...defaultRepoTheme,
    ...(project.repoTheme || {}),
  };

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

function createProjectAction(action, index) {
  const link = document.createElement("a");
  link.className = `button ${index === 0 ? "button-primary" : "button-secondary"}`;
  link.href = action.href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = action.label;
  return link;
}

function createRepoAction(label, href, variant) {
  const link = document.createElement("a");
  link.className = `button ${variant}`;
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = label;
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
  language.textContent = repo.language || "Mixed stack";

  const updated = document.createElement("span");
  updated.textContent = `Update: ${formatDate(repo.updated_at)}`;

  meta.append(language, updated);

  const title = document.createElement("h3");
  title.textContent = repo.name;

  const description = document.createElement("p");
  description.textContent =
    repo.description || "Repozytorium bez opisu, ale dostępne publicznie na GitHubie.";

  const actions = document.createElement("div");
  actions.className = "project-actions";
  actions.append(createRepoAction("Repo", repo.html_url, "button-primary"));

  if (repo.homepage) {
    actions.append(createRepoAction("Live", repo.homepage, "button-secondary"));
  }

  article.append(meta, title, description, actions);
  return article;
}

function renderSpotlight(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  if (spotlight.root) {
    spotlight.root.style.setProperty("--project-accent", project.accent || "#ce5a2f");
    spotlight.root.style.setProperty("--project-accent-deep", project.accentDeep || "#8c3416");
    spotlight.root.style.setProperty("--project-glow", project.glow || "rgba(206, 90, 47, 0.18)");
    spotlight.root.style.setProperty(
      "--project-glow-soft",
      project.glowSoft || "rgba(206, 90, 47, 0.12)"
    );
  }

  spotlight.kicker.textContent = project.kicker;
  spotlight.title.textContent = project.title;
  spotlight.description.textContent = project.description;
  spotlight.image.src = project.image;
  spotlight.image.alt = project.imageAlt;

  spotlight.meta.replaceChildren(
    ...project.meta.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );

  spotlight.stack.replaceChildren(
    ...project.stack.map((item) => {
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
    fallback.textContent = "Projekt lokalny / bez publicznego linku";
    spotlight.actions.replaceChildren(fallback);
  }

  tabs.forEach((tab) => {
    const isActive = tab.dataset.project === projectKey;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  activeProjectKey = projectKey;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const nextProjectKey = tab.dataset.project;
    if (nextProjectKey === activeProjectKey) return;

    if (spotlight.root) {
      spotlight.root.classList.add("is-switching");
      window.setTimeout(() => {
        renderSpotlight(nextProjectKey);
      }, 110);
      window.setTimeout(() => {
        spotlight.root.classList.remove("is-switching");
      }, 320);
      return;
    }

    renderSpotlight(nextProjectKey);
  });
});

function formatDate(dateString) {
  const formatter = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(new Date(dateString));
}

function renderRepos(repos) {
  repoGrid.replaceChildren(...repos.map((repo) => createRepoCard(repo)));
}

async function loadRepos() {
  try {
    const response = await fetch(
      "https://api.github.com/users/mzmuda101-prog/repos?sort=updated&per_page=9",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = await response.json();
    githubStatus.textContent = "Sekcja jest aktualizowana z GitHub API.";
    renderRepos(repos);
  } catch (error) {
    githubStatus.textContent =
      "Nie udało się pobrać API, więc pokazuję przygotowaną listę najważniejszych repozytoriów.";
    renderRepos(repoFallback);
  }
}

renderSpotlight("excel-workbench-pwa");
loadRepos();

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
    {
      threshold: 0.18,
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

if (heroStage && heroShot && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
}

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

  return (
    x < rect.left - margin ||
    x > rect.right + margin ||
    y < rect.top - margin ||
    y > rect.bottom + margin
  );
}

function moveCursorHint(x, y) {
  if (!cursorHint) return;
  cursorHintTargetX = x + 22;
  cursorHintTargetY = y - 18;

  if (cursorHintFrame !== null) return;

  const animateHint = () => {
    cursorHintX += (cursorHintTargetX - cursorHintX) * 0.24;
    cursorHintY += (cursorHintTargetY - cursorHintY) * 0.24;

    if (Math.abs(cursorHintTargetX - cursorHintX) < 0.2) {
      cursorHintX = cursorHintTargetX;
    }

    if (Math.abs(cursorHintTargetY - cursorHintY) < 0.2) {
      cursorHintY = cursorHintTargetY;
    }

    cursorHint.style.transform = `translate3d(${cursorHintX}px, ${cursorHintY}px, 0) scale(1)`;

    if (cursorHintX !== cursorHintTargetX || cursorHintY !== cursorHintTargetY) {
      cursorHintFrame = window.requestAnimationFrame(animateHint);
    } else {
      cursorHintFrame = null;
    }
  };

  cursorHintFrame = window.requestAnimationFrame(animateHint);
}

/**
 * Uniwersalna funkcja przypisująca podążający hint do elementów
 * @param {NodeList|Array} elements - Lista elementów (np. z querySelectorAll)
 * @param {Function} clickCallback - Opcjonalna funkcja wywoływana przy kliknięciu
 */
function setupCursorHint(elements, clickCallback = null) {
  elements.forEach((el) => {
    el.addEventListener("pointerenter", (event) => {
      if (!cursorHint || prefersReducedMotion) return;
                      // JESLI W < > w HTML WPISZĘ jeden z atrybutów, np. data-hint="Napis" to  w tym przypadku bezposrednio bierze z tego atrybutu czyli bedzie "Napis" zamiast "Kliknij"
      // 1. Zmiana tekstu: bierze z data-hint="Napis" lub daje "Kliknij"
      const span = cursorHint.querySelector('span');
      if (span) span.textContent = el.dataset.hint || "Kliknij";

      // 2. Dodanie dodatkowej klasy stylu: bierze z data-hint-class-only="klasa" lub data-hint-class="klasa" lub z klasy .cursor-hint
      if (el.dataset.hintClassOnly) {// Czyści wszystko i ustawia TYLKO Moją klasę + widoczność
        cursorHint.className = `is-visible ${el.dataset.hintClassOnly}`;
      } else if (el.dataset.hintClass) {// Standard: bazowa klasa + Twoja dodatkowa
        cursorHint.className = `cursor-hint is-visible ${el.dataset.hintClass}`;
      } else {// Domyślnie
        cursorHint.className = "cursor-hint is-visible";
      }

      moveCursorHint(event.clientX, event.clientY);
    });

    el.addEventListener("pointermove", (event) => {
      if (!cursorHint || prefersReducedMotion) return;
      moveCursorHint(event.clientX, event.clientY);
    });

    el.addEventListener("pointerleave", () => {
      if (!cursorHint) return;
      cursorHint.classList.remove("is-visible");
      
      // Resetowanie pozycji (Twój skok)
      cursorHintTargetX = -999;
      cursorHintTargetY = -999;
      moveCursorHint(-999, -999);
    });

    if (clickCallback) {
      el.addEventListener("click", () => clickCallback(el));
    }
  });
}

// --- UŻYCIE ---

// Dla paneli (z logiką focusowania)
setupCursorHint(heroPanels, (panel) => {
  const isAlreadyFocused = panel.classList.contains("is-focused");
  setPanelFocus(isAlreadyFocused ? null : panel);
});

// Dla dowolnych innych przycisków (tylko hint, bez dodatkowej akcji kliknięcia)
const otherStuff = document.querySelectorAll(""); /* tu będe mógł dodawać nowe elementy np według klas czyli np. ".button-magnetic" */
setupCursorHint(otherStuff);




document.addEventListener("pointermove", (event) => {
  if (!activeHeroPanel) return;
  if (!isPointerFarFromHero(event.clientX, event.clientY)) return;
  setPanelFocus(null);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setPanelFocus(null);
  }
});
