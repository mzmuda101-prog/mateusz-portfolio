const STORAGE_KEY = "mateusz-portfolio-lang";

const copy = {
  pl: {
    locale: "pl-PL",
    pageTitle: "Mateusz Zmuda | Portfolio",
    pageDescription:
      "Portfolio Mateusza Zmudy: aplikacje webowe, narzędzia do Excela, projekty frontendowe i utility apps.",
    brandAria: "Przejdź do początku strony",
    refreshAria: "Odśwież stronę",
    refreshHint: "kliknij aby Odświeżyć stronę",
    refreshAlt: "Odśwież stronę",
    navAria: "Główna nawigacja",
    nav: {
      projects: "Projekty",
      about: "Profil",
      github: "GitHub",
      contact: "Kontakt",
    },
    langSwitchAria: "Przełącznik języka",
    heroEyebrowHint:
      "Głównie Frontend Developer, JavaScript, Firebase /| Buduję interaktywne aplikacje webowe i narzędzia do pracy z danymi",
    heroEyebrowTop: "Portfolio / Web & utility projects.",
    heroEyebrowBottom: "Głównie Frontend Developer | JavaScript | Firebase",
    heroTitleMain: "Buduję strony i narzędzia,",
    heroTitleAccent: "które mają konkretną pracę do wykonania.",
    heroLead:
      "Tworzę projekty z pogranicza frontendu, danych i workflow: aplikacje, np. do pracy z Excelem, interaktywne strony, marketplace'y i eksperymenty z analizą kodu.",
    heroPrimaryCta: "Zobacz wybrane projekty",
    heroSecondaryCta: "Otwórz GitHub",
    heroMetric1: "projektów publicznych i showcase'ów",
    heroMetric2: "główne osie pracy: web, Excel, utility tools",
    heroMetric3: "cel: budować rzeczy przydatne, nie tylko efektowne",
    heroPanelMainLabel: "Wybrane obszary",
    heroPanelMain1: "Frontend i UI z charakterem",
    heroPanelMain2: "Excel / workflow / dane",
    heroPanelMain3: "Narzędzia desktopowe i utility apps",
    heroPanelSideLabel: "Aktualnie rozwijane",
    heroPanelSideTitle: "Excel Workbench PWA",
    heroPanelSideText:
      "Offline-first workbench do eksploracji, filtrowania i przekształcania plików Excel w przeglądarce.",
    introStrip:
      "Najchętniej buduję rzeczy użyteczne: od narzędzi do analizy i pracy z danymi, po strony, które mają wyraźny styl i czytelny cel.",
    projectsEyebrow: "Selected work",
    projectsTitle: "Najmocniejsze projekty w jednym miejscu",
    projectListAria: "Lista wyróżnionych projektów",
    processEyebrow: "Approach",
    processTitle: "Łączę klimat i wygląd z jasną funkcją produktu",
    processStep1Title: "Punkt wyjścia",
    processStep1Text:
      "Szukam realnego problemu albo konkretnego przepływu pracy: czego użytkownik potrzebuje szybciej, prościej albo czytelniej.",
    processStep2Title: "Forma",
    processStep2Text:
      "Potem dopiero dobieram język wizualny: rytm sekcji, proporcje, ruch i typografię, tak żeby projekt miał charakter, ale nie przeszkadzał w użyciu.",
    processStep3Title: "Dowiezienie",
    processStep3Text:
      "Lubię domykać projekt do wersji, którą da się uruchomić, pokazać online, przetestować i dalej rozwijać.",
    aboutEyebrow: "Profile",
    aboutTitle: "Jak podchodzę do budowania produktów",
    about1Title: "Utility-first thinking",
    about1Text:
      "Najbardziej interesują mnie projekty, które rozwiązują realny problem: upraszczają workflow, porządkują dane albo przyspieszają codzienną pracę.",
    about2Title: "Frontend z klimatem",
    about2Text:
      "Nawet w prostych aplikacjach zależy mi na kompozycji, ruchu, rytmie sekcji i wyrazistej warstwie wizualnej.",
    about3Title: "Od pomysłu do wdrożenia",
    about3Text:
      "Lubię spinać pełną całość: interfejs, logikę, eksport danych, integracje z chmurą i wersję gotową do pokazania online.",
    githubEyebrow: "GitHub",
    githubTitle: "Repozytoria publiczne pobierane na żywo z profilu",
    githubProfileLabel: "Profil:",
    githubStatusLoading: "Ładowanie repozytoriów…",
    githubStatusLoaded: "Sekcja jest aktualizowana z GitHub API.",
    githubStatusFallback:
      "Nie udało się pobrać API, więc pokazuję przygotowaną listę najważniejszych repozytoriów.",
    repoMixedStack: "Mixed stack",
    repoUpdated: "Aktualizacja",
    repoNoDescription:
      "Repozytorium bez opisu w sekcji About, ale README i sam projekt są dostępne publicznie na GitHubie.",
    buttonRepo: "Repozytorium",
    buttonLive: "Live demo",
    projectLocalOnly: "Projekt lokalny / bez publicznego linku",
    contactEyebrow: "Kontakt",
    contactTitle:
      "Otwarty na ciekawe projekty, współpracę i kolejne webowe\n(i nie tylko...) wyzwania.",
 
    contactPrimaryCta: "Przejdź do projektów",
    contactSecondaryCta: "Zobacz wszystkie repo na GitHubie",
    clickHint: "Kliknij",
  },
  en: {
    locale: "en-US",
    pageTitle: "Mateusz Zmuda | Portfolio",
    pageDescription:
      "Mateusz Zmuda's portfolio: web apps, Excel tools, frontend projects, and utility apps.",
    brandAria: "Go to the top of the page",
    refreshAria: "Refresh the page",
    refreshHint: "click to refresh the page",
    refreshAlt: "Refresh the page",
    navAria: "Main navigation",
    nav: {
      projects: "Projects",
      about: "Profile",
      github: "GitHub",
      contact: "Contact",
    },
    langSwitchAria: "Language switcher",
    heroEyebrowHint:
      "Primarily Frontend Developer, JavaScript, Firebase /| I build interactive web apps and tools for working with data",
    heroEyebrowTop: "Portfolio / Web & utility projects.",
    heroEyebrowBottom: "Primarily Frontend Developer | JavaScript | Firebase",
    heroTitleMain: "I build websites and tools",
    heroTitleAccent: "that have a real job to do.",
    heroLead:
      "I create projects at the intersection of frontend, data, and workflow: Excel-oriented apps, interactive websites, marketplaces, and code-analysis experiments.",
    heroPrimaryCta: "See selected projects",
    heroSecondaryCta: "Open GitHub",
    heroMetric1: "public projects and showcase builds",
    heroMetric2: "main focus areas: web, Excel, utility tools",
    heroMetric3: "goal: build useful things, not just flashy ones",
    heroPanelMainLabel: "Selected areas",
    heroPanelMain1: "Frontend and UI with character",
    heroPanelMain2: "Excel / workflow / data",
    heroPanelMain3: "Desktop tools and utility apps",
    heroPanelSideLabel: "Currently evolving",
    heroPanelSideTitle: "Excel Workbench PWA",
    heroPanelSideText:
      "An offline-first workbench for exploring, filtering, and transforming Excel files directly in the browser.",
    introStrip:
      "I most enjoy building useful things: from tools for analysis and data work to websites with a clear style and a clear purpose.",
    projectsEyebrow: "Selected work",
    projectsTitle: "The strongest projects in one place",
    projectListAria: "List of featured projects",
    processEyebrow: "Approach",
    processTitle: "I connect visual atmosphere with a clear product function",
    processStep1Title: "Starting point",
    processStep1Text:
      "I look for a real problem or a concrete workflow: what the user needs faster, simpler, or in a clearer form.",
    processStep2Title: "Form",
    processStep2Text:
      "Only then do I shape the visual language: section rhythm, proportions, motion, and typography, so the project has personality without getting in the way.",
    processStep3Title: "Delivery",
    processStep3Text:
      "I like taking projects to a version that can be launched, shown online, tested, and improved further.",
    aboutEyebrow: "Profile",
    aboutTitle: "How I approach building products",
    about1Title: "Utility-first thinking",
    about1Text:
      "I'm most interested in projects that solve a real problem: simplifying workflows, organizing data, or speeding up everyday work.",
    about2Title: "Frontend with atmosphere",
    about2Text:
      "Even in simple apps, I care about composition, motion, section rhythm, and a distinct visual layer.",
    about3Title: "From idea to launch",
    about3Text:
      "I like tying the whole thing together: interface, logic, data export, cloud integrations, and a version ready to show online.",
    githubEyebrow: "GitHub",
    githubTitle: "Public repositories pulled live from the profile",
    githubProfileLabel: "Profile:",
    githubStatusLoading: "Loading repositories…",
    githubStatusLoaded: "This section is being updated from the GitHub API.",
    githubStatusFallback:
      "The API couldn't be loaded, so I'm showing a prepared list of key repositories.",
    repoMixedStack: "Mixed stack",
    repoUpdated: "Updated",
    repoNoDescription:
      "This repository has no About description, but the README and project are publicly available on GitHub.",
    buttonRepo: "Repository",
    buttonLive: "Live demo",
    projectLocalOnly: "Local project / no public link",
    contactEyebrow: "Contact",
    contactTitle:
      "Open to interesting projects, collaboration, and more web (and not only web) challenges.",
    contactPrimaryCta: "Go to projects",
    contactSecondaryCta: "See all GitHub repos",
    clickHint: "Click",
  },
};

const defaultProjectProps = {
  accent: "#ce5a2f",
  accentDeep: "#a03e1b",
  glow: "rgba(206, 90, 47, 0.18)",
  glowSoft: "rgba(206, 90, 47, 0.12)",
  repoTheme: {
    fillStrength: "14%",
    borderStrength: "20%",
    shadowStrength: "18%",
    softGlowSize: "46%",
  },
};

function makeProject(spec, overrideDefaultProps = {}) {
  return {
    ...defaultProjectProps,
    ...overrideDefaultProps,
    ...spec,
    repoTheme: {
      ...defaultProjectProps.repoTheme,
      ...(overrideDefaultProps.repoTheme || {}),
      ...(spec.repoTheme || {}),
    },
  };
}

const projects = {
  "excel-workbench-pwa": makeProject({
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
    image: "./assets/excel-workbench-pwa-2.png",
    imageAlt: {
      pl: "Zrzut ekranu Excel Workbench PWA",
      en: "Screenshot of Excel Workbench PWA",
    },
    actions: [
      { type: "live", href: "https://excel-workbench-pwa.vercel.app" },
      { type: "repo", href: "https://github.com/mzmuda101-prog/excel-workbench-pwa" },
    ],
    copy: {
      pl: {
        tabLabel: "Excel Workbench PWA",
        kicker: "PWA / data tools",
        title: "Excel Workbench PWA",
        description:
          "Offline-first aplikacja do przeglądania, filtrowania, analizowania i lekkiego przekształcania plików Excel bez backendu i bez wysyłania danych poza urządzenie.",
        meta: [
          "Działa lokalnie w przeglądarce i wspiera tryb offline.",
          "Skupiona na realnym workflow wokół arkuszy, a nie na kopiowaniu całego Excela.",
          "Ma narzędzia do inspekcji struktury, filtrów, sortowania i eksportu.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Sheet workflows"],
      },
      en: {
        tabLabel: "Excel Workbench PWA",
        kicker: "PWA / data tools",
        title: "Excel Workbench PWA",
        description:
          "An offline-first app for browsing, filtering, analyzing, and lightly transforming Excel files without a backend and without sending data off the device.",
        meta: [
          "Runs locally in the browser and supports offline mode.",
          "Focused on real spreadsheet workflows instead of copying all of Excel.",
          "Includes tools for structure inspection, filtering, sorting, and export.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Sheet workflows"],
      },
    },
  }),
  "excel-workbench": makeProject({
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
    image: "./assets/excel-workbench-logo.png",
    imageAlt: {
      pl: "Logo projektu Excel Workbench",
      en: "Excel Workbench project logo",
    },
    actions: [],
    copy: {
      pl: {
        tabLabel: "Excel Workbench",
        kicker: "Desktop app / Excel tooling",
        title: "Excel Workbench",
        description:
          "Modularne narzędzie desktopowe do pracy z workbookami Excela, z wyraźnym podziałem logiki na moduły odpowiedzialne za filtrowanie, formatowanie, układ kolumn i obsługę plików.",
        meta: [
          "Refaktoryzacja z monolitu do czytelnej, modułowej architektury.",
          "Obsługa filtrowania, sortowania, edycji komórek i analizy workbooka.",
          "Silny nacisk na utrzymanie, testowalność i dalszą rozbudowę.",
        ],
        stack: ["Python", "Tkinter", "openpyxl", "Desktop UI"],
      },
      en: {
        tabLabel: "Excel Workbench",
        kicker: "Desktop app / Excel tooling",
        title: "Excel Workbench",
        description:
          "A modular desktop tool for working with Excel workbooks, with clear logic split into modules responsible for filtering, formatting, column layout, and file handling.",
        meta: [
          "Refactored from a monolith into a cleaner modular architecture.",
          "Supports filtering, sorting, cell editing, and workbook inspection.",
          "Built with a strong focus on maintainability, testability, and future growth.",
        ],
        stack: ["Python", "Tkinter", "openpyxl", "Desktop UI"],
      },
    },
  }),
  "portal-ogloszeniowy": makeProject({
    accent: "#e67c21",
    accentDeep: "#d55704",
    glow: "rgba(230, 126, 34, 0.22)",
    glowSoft: "rgba(241, 158, 15, 0.18)",
    repoTheme: {
      fillStrength: "20%",
      borderStrength: "30%",
      shadowStrength: "26%",
      softGlowSize: "54%",
    },
    image: "./assets/portal-bg.jpg",
    imageAlt: {
      pl: "Tło projektu Portal Ogłoszeniowy",
      en: "Listings Portal project background",
    },
    actions: [
      { type: "live", href: "https://portal-ogloszeniowy.vercel.app" },
      { type: "repo", href: "https://github.com/mzmuda101-prog/Portal-Ogloszeniowy" },
    ],
    copy: {
      pl: {
        tabLabel: "Portal Ogłoszeniowy",
        kicker: "Marketplace / cloud integrations",
        title: "Portal Ogłoszeniowy",
        description:
          "Marketplace z panelem administratora, publikacją ogłoszeń oraz integracjami z Firebase i Cloudinary. Projekt łączy prostą ścieżkę publikacji z realnym deployem online.",
        meta: [
          "Logowanie administratora i zarządzanie ogłoszeniami.",
          "Obsługa uploadu zdjęć i filtrowania po kategoriach.",
          "Wersja live dostępna online na Vercel.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "Node.js", "Firebase", "Cloudinary"],
      },
      en: {
        tabLabel: "Listings Portal",
        kicker: "Marketplace / cloud integrations",
        title: "Listings Portal",
        description:
          "A marketplace with an admin panel, listing publishing, and Firebase plus Cloudinary integrations. The project combines a simple publishing flow with a real online deployment.",
        meta: [
          "Admin authentication and listing management.",
          "Image upload support and category-based filtering.",
          "A live version deployed on Vercel.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "Node.js", "Firebase", "Cloudinary"],
      },
    },
  }),
  "data-collector": makeProject({
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
    image: "./assets/data-collector-bg.png",
    imageAlt: {
      pl: "Tło projektu Data Collector & Excel Export",
      en: "Data Collector & Excel Export project background",
    },
    actions: [
      { type: "live", href: "https://strona-6.vercel.app" },
      { type: "repo", href: "https://github.com/mzmuda101-prog/Data-Collector-Excel-App" },
    ],
    copy: {
      pl: {
        tabLabel: "Data Collector & Excel Export",
        kicker: "Frontend / Excel export",
        title: "Data Collector & Excel Export",
        description:
          "Interaktywna strona demonstracyjna, która łączy motion-driven frontend z praktycznym przepływem danych i eksportem do pliku Excel przez SheetJS.",
        meta: [
          "Animowany layout project-first z intro i efektami wizualnymi.",
          "Dynamiczny formularz danych i eksport do `.xlsx`.",
          "Pokazuje połączenie UX, frontendu i pracy z danymi po stronie klienta.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "GSAP", "SheetJS"],
      },
      en: {
        tabLabel: "Data Collector & Excel Export",
        kicker: "Frontend / Excel export",
        title: "Data Collector & Excel Export",
        description:
          "An interactive showcase page that connects a motion-driven frontend with a practical data flow and Excel export via SheetJS.",
        meta: [
          "An animated project-first layout with intro and visual effects.",
          "A dynamic data form and `.xlsx` export.",
          "Shows the intersection of UX, frontend work, and client-side data handling.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "GSAP", "SheetJS"],
      },
    },
  }),
  "code-learning-analyzer": makeProject({
    accent: "#6e4fbc",
    accentDeep: "#48309f",
    glow: "rgba(111, 84, 217, 0.2)",
    glowSoft: "rgba(166, 144, 255, 0.18)",
    repoTheme: {
      fillStrength: "18%",
      borderStrength: "27%",
      shadowStrength: "24%",
      softGlowSize: "50%",
    },
    image: "./assets/code-learning-analyzer-ui.png",
    imageAlt: {
      pl: "Zrzut interfejsu projektu Code Learning Analyzer",
      en: "Code Learning Analyzer interface screenshot",
    },
    actions: [{ type: "repo", href: "https://github.com/mzmuda101-prog/code-learning-analyzer" }],
    copy: {
      pl: {
        tabLabel: "Code Learning Analyzer",
        kicker: "CLI / reports / learning tool",
        title: "Code Learning Analyzer",
        description:
          "Analizator jakości kodu dla osób uczących się programowania i projektów portfolio. Generuje raporty tekstowe, Excel, PDF i HTML, a przy tym tłumaczy sens metryk.",
        meta: [
          "Obsługuje analizę folderów, plików, Git i udział języków.",
          "Łączy utility CLI z trybem nauki i wyjaśnianiem metryk.",
          "Projekt skierowany do nauki świadomego rozwijania jakości kodu.",
        ],
        stack: ["Python", "CLI", "Tkinter", "HTML reports", "PDF/XLSX export"],
      },
      en: {
        tabLabel: "Code Learning Analyzer",
        kicker: "CLI / reports / learning tool",
        title: "Code Learning Analyzer",
        description:
          "A code quality analyzer for people learning programming and building portfolio projects. It generates text, Excel, PDF, and HTML reports while also explaining what the metrics actually mean.",
        meta: [
          "Supports folder, file, Git, and language-share analysis.",
          "Combines a utility CLI with a learning mode and metric explanations.",
          "Built to support more conscious improvement of code quality.",
        ],
        stack: ["Python", "CLI", "Tkinter", "HTML reports", "PDF/XLSX export"],
      },
    },
  }),
};

const repoFallback = [
  {
    name: "excel-workbench-pwa",
    description: {
      pl: "Offline-first workbench do pracy z plikami Excel w przeglądarce.",
      en: "An offline-first workbench for working with Excel files in the browser.",
    },
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/excel-workbench-pwa",
    homepage: "https://excel-workbench-pwa.vercel.app",
  },
  {
    name: "Portal-Ogloszeniowy",
    description: {
      pl: "Marketplace z panelem administratora i integracjami chmurowymi.",
      en: "A marketplace with an admin panel and cloud integrations.",
    },
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/Portal-Ogloszeniowy",
    homepage: "https://portal-ogloszeniowy.vercel.app",
  },
  {
    name: "Data-Collector-Excel-App",
    description: {
      pl: "Interaktywny frontend z eksportem danych do Excela.",
      en: "An interactive frontend with Excel data export.",
    },
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/Data-Collector-Excel-App",
    homepage: "https://strona-6.vercel.app",
  },
  {
    name: "code-learning-analyzer",
    description: {
      pl: "Analizator jakości kodu z raportami i trybem nauki.",
      en: "A code quality analyzer with reports and a learning mode.",
    },
    language: "Python",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/code-learning-analyzer",
    homepage: "",
  },
];

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

let currentLang = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "pl";
let activeProjectKey = "excel-workbench-pwa";
let activeHeroPanel = null;
let currentRepos = [];
let githubStatusMode = "loading";
let cursorHintX = -999;
let cursorHintY = -999;
let cursorHintTargetX = -999;
let cursorHintTargetY = -999;
let cursorHintFrame = null;

const repoProjectAliases = {
  "excel-workbench-pwa": "excel-workbench-pwa",
  "portal-ogloszeniowy": "portal-ogloszeniowy",
  "portal-ogloszeniowy-vercel-app": "portal-ogloszeniowy",
  "data-collector-excel-app": "data-collector",
  "strona-6-vercel-app": "data-collector",
  "code-learning-analyzer": "code-learning-analyzer",
  "excel-workbench": "excel-workbench",
};

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

function setText(id, value) {
  const element = getEl(id);
  if (element) element.textContent = value;
}

function setHTML(id, value) {
  const element = getEl(id);
  if (element) {
    // Usuwamy całe dzieci elementu, unikając bezpośredniego użycia innerHTML
    element.replaceChildren();
    // Dodajemy tekstowy węzeł (bezpieczne dla plain text)
    element.appendChild(document.createTextNode(value));
  }
}

function updateLangSwitchIndicator() {
  const langSwitch = getEl("lang-switch");
  if (!langSwitch) return;

  const activeButton = langButtons.find((button) => button.classList.contains("is-active"));
  if (!activeButton) return;

  langSwitch.style.setProperty("--lang-pill-x", `${activeButton.offsetLeft}px`);
  langSwitch.style.setProperty("--lang-pill-width", `${activeButton.offsetWidth}px`);

  if (!langSwitch.classList.contains("is-ready")) {
    window.requestAnimationFrame(() => {
      langSwitch.classList.add("is-ready");
    });
  }
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  document.title = copy[lang].pageTitle;

  const descriptionMeta = getEl("page-description");
  if (descriptionMeta) descriptionMeta.setAttribute("content", copy[lang].pageDescription);

  const brandLink = getEl("brand-link");
  if (brandLink) brandLink.setAttribute("aria-label", copy[lang].brandAria);

  const refreshLink = getEl("refresh-link");
  if (refreshLink) {
    refreshLink.setAttribute("aria-label", copy[lang].refreshAria);
    refreshLink.dataset.hint = copy[lang].refreshHint;
  }

  const refreshImage = getEl("refresh-image");
  if (refreshImage) refreshImage.alt = copy[lang].refreshAlt;

  const siteNav = getEl("site-nav");
  if (siteNav) siteNav.setAttribute("aria-label", copy[lang].navAria);

  const langSwitch = getEl("lang-switch");
  if (langSwitch) langSwitch.setAttribute("aria-label", copy[lang].langSwitchAria);

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const key = link.dataset.nav;
    if (copy[lang].nav[key]) link.textContent = copy[lang].nav[key];
  });

  const heroEyebrow = getEl("hero-eyebrow");
  if (heroEyebrow) heroEyebrow.dataset.hint = copy[lang].heroEyebrowHint;

  setText("hero-eyebrow-top", copy[lang].heroEyebrowTop);
  setText("hero-eyebrow-bottom", copy[lang].heroEyebrowBottom);
  setText("hero-title-main", copy[lang].heroTitleMain);
  setText("hero-title-accent", copy[lang].heroTitleAccent);
  setText("hero-lead", copy[lang].heroLead);
  setText("hero-metric-1", copy[lang].heroMetric1);
  setText("hero-metric-2", copy[lang].heroMetric2);
  setText("hero-metric-3", copy[lang].heroMetric3);
  setText("hero-panel-main-label", copy[lang].heroPanelMainLabel);
  setText("hero-panel-main-item-1", copy[lang].heroPanelMain1);
  setText("hero-panel-main-item-2", copy[lang].heroPanelMain2);
  setText("hero-panel-main-item-3", copy[lang].heroPanelMain3);
  setText("hero-panel-side-label", copy[lang].heroPanelSideLabel);
  setText("hero-panel-side-title", copy[lang].heroPanelSideTitle);
  setText("hero-panel-side-content", copy[lang].heroPanelSideText);
  setText("intro-strip-text", copy[lang].introStrip);
  setText("projects-eyebrow", copy[lang].projectsEyebrow);
  setText("projects-title", copy[lang].projectsTitle);
  setText("process-eyebrow", copy[lang].processEyebrow);
  setText("process-title", copy[lang].processTitle);
  setText("process-step-1-title", copy[lang].processStep1Title);
  setText("process-step-1-text", copy[lang].processStep1Text);
  setText("process-step-2-title", copy[lang].processStep2Title);
  setText("process-step-2-text", copy[lang].processStep2Text);
  setText("process-step-3-title", copy[lang].processStep3Title);
  setText("process-step-3-text", copy[lang].processStep3Text);
  setText("about-eyebrow", copy[lang].aboutEyebrow);
  setText("about-title", copy[lang].aboutTitle);
  setText("about-block-1-title", copy[lang].about1Title);
  setText("about-block-1-text", copy[lang].about1Text);
  setText("about-block-2-title", copy[lang].about2Title);
  setText("about-block-2-text", copy[lang].about2Text);
  setText("about-block-3-title", copy[lang].about3Title);
  setText("about-block-3-text", copy[lang].about3Text);
  setText("github-eyebrow", copy[lang].githubEyebrow);
  setText("github-title", copy[lang].githubTitle);
  setText("github-profile-label", copy[lang].githubProfileLabel);
  setText("contact-eyebrow", copy[lang].contactEyebrow);
  setHTML("contact-title", copy[lang].contactTitle);
  setText("cursor-hint-text", copy[lang].clickHint);

  const heroPrimary = getEl("hero-primary-cta");
  const heroSecondary = getEl("hero-secondary-cta");
  const contactPrimary = getEl("contact-primary-cta");
  const contactSecondary = getEl("contact-secondary-cta");
  if (heroPrimary?.firstElementChild) heroPrimary.firstElementChild.textContent = copy[lang].heroPrimaryCta;
  if (heroSecondary?.firstElementChild) heroSecondary.firstElementChild.textContent = copy[lang].heroSecondaryCta;
  if (contactPrimary) contactPrimary.textContent = copy[lang].contactPrimaryCta;
  if (contactSecondary) contactSecondary.textContent = copy[lang].contactSecondaryCta;

  const projectList = document.querySelector(".project-list");
  if (projectList) projectList.setAttribute("aria-label", copy[lang].projectListAria);

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateLangSwitchIndicator();

  renderSpotlight(activeProjectKey);
  if (currentRepos.length) {
    renderRepos(currentRepos);
  } else {
    githubStatus.textContent = getGithubStatusText();
  }
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

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextLang = button.dataset.lang;
    if (nextLang && nextLang !== currentLang) {
      applyLanguage(nextLang);
    }
  });
});

window.addEventListener("resize", () => {
  updateLangSwitchIndicator();
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

function moveCursorHint(x, y) {
  if (!cursorHint) return;
  const style = getComputedStyle(cursorHint);
  const offsetX = parseInt(style.getPropertyValue("--hint-offset-x"), 10) || 22;
  const offsetY = parseInt(style.getPropertyValue("--hint-offset-y"), 10) || 18;

  cursorHintTargetX = x + offsetX;
  cursorHintTargetY = y - offsetY;
  if (cursorHintFrame !== null) return;

  const animateHint = () => {
    cursorHintX += (cursorHintTargetX - cursorHintX) * 0.24;
    cursorHintY += (cursorHintTargetY - cursorHintY) * 0.24;

    if (Math.abs(cursorHintTargetX - cursorHintX) < 0.2) cursorHintX = cursorHintTargetX;
    if (Math.abs(cursorHintTargetY - cursorHintY) < 0.2) cursorHintY = cursorHintTargetY;

    cursorHint.style.transform = `translate3d(${cursorHintX}px, ${cursorHintY}px, 0) scale(1)`;

    if (cursorHintX !== cursorHintTargetX || cursorHintY !== cursorHintTargetY) {
      cursorHintFrame = window.requestAnimationFrame(animateHint);
    } else {
      cursorHintFrame = null;
    }
  };

  cursorHintFrame = window.requestAnimationFrame(animateHint);
}

function setupCursorHint(elements, clickCallback = null) {
  elements.forEach((el) => {
    el.addEventListener("pointerenter", (event) => {
      if (!cursorHint || prefersReducedMotion) return;
      const span = cursorHint.querySelector("span");
      const hintContent = el.dataset.hint || copy[currentLang].clickHint;

      if (hintContent.includes("/|")) {
        const lines = hintContent.split("/|").map((line) => line.trim());
        if (span) {
          span.textContent = "";
          lines.forEach((line, index) => {
            if (index > 0) span.appendChild(document.createElement("br"));
            span.appendChild(document.createTextNode(line));
          });
        }
      } else if (span) {
        span.textContent = hintContent;
      }

      if (el.dataset.hintClassOnly) {
        cursorHint.removeAttribute("style");
        cursorHint.className = `is-visible ${el.dataset.hintClassOnly}`;
        Object.assign(cursorHint.style, {
          top: "0",
          left: "0",
          position: "fixed",
          zIndex: "9999",
          pointerEvents: "none",
          display: "inline-flex",
        });
      } else {
        cursorHint.className = `cursor-hint is-visible ${el.dataset.hintClass || ""}`;
      }

      cursorHint.style.transformOrigin = "left bottom";
      moveCursorHint(event.clientX, event.clientY);
    });

    el.addEventListener("pointermove", (event) => {
      if (!cursorHint || prefersReducedMotion) return;
      moveCursorHint(event.clientX, event.clientY);
    });

    el.addEventListener("pointerleave", () => {
      if (!cursorHint) return;
      cursorHint.classList.remove("is-visible");
      cursorHintTargetX = -999;
      cursorHintTargetY = -999;
      moveCursorHint(-999, -999);
    });

    if (clickCallback) {
      el.addEventListener("click", () => clickCallback(el));
    }
  });
}

setupCursorHint(heroPanels, (panel) => {
  const isAlreadyFocused = panel.classList.contains("is-focused");
  setPanelFocus(isAlreadyFocused ? null : panel);
});

const hintTargets = document.querySelectorAll(
  "[data-hint]:not(.hero-panel-trigger), [data-hint-class], [data-hint-class-only]"
);
setupCursorHint(hintTargets);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setPanelFocus(null);
  }
});

applyLanguage(currentLang);
renderSpotlight(activeProjectKey);
loadRepos();
