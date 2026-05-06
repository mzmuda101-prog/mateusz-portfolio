window.PortfolioData = (() => {
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
    heroTitleHint: "najedź na karty po lewej stronie - te lekko przykryte",
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
    contactEmailHint: "kliknij aby wyslac wiadomośc na ten adres email",
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
    heroTitleHint: "hover over the slightly covered cards on the left",
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
    contactEmailHint: "click to send a message to this email address",
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

const repoProjectAliases = {
  "excel-workbench-pwa": "excel-workbench-pwa",
  "portal-ogloszeniowy": "portal-ogloszeniowy",
  "portal-ogloszeniowy-vercel-app": "portal-ogloszeniowy",
  "data-collector-excel-app": "data-collector",
  "strona-6-vercel-app": "data-collector",
  "code-learning-analyzer": "code-learning-analyzer",
  "excel-workbench": "excel-workbench",
};

return {
  STORAGE_KEY,
  copy,
  defaultProjectProps,
  projects,
  repoFallback,
  repoProjectAliases,
};
})();
