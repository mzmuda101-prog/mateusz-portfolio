window.PortfolioData = (() => {
const STORAGE_KEY = "mateusz-portfolio-lang";

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
  defaultProjectProps,
  projects,
  repoFallback,
  repoProjectAliases,
};
})();
