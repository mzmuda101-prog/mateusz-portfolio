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
    image: "./assets/excel-workbench-pwa-1.png",
    imageAlt: {
      pl: "Zrzut ekranu Sheet Workbench PWA",
      en: "Screenshot of Sheet Workbench PWA",
    },
    actions: [
      { type: "live", href: "https://excel-workbench-pwa.vercel.app" },
      { type: "repo", href: "https://github.com/mzmuda101-prog/excel-workbench-pwa" },
    ],
    copy: {
      pl: {
        tabLabel: "Sheet Workbench PWA",
        kicker: "PWA / data tools",
        title: "Sheet Workbench PWA",
        description:
          "Offline-first aplikacja do przeglądania, filtrowania, analizowania plików Excel bez backendu i bez wysyłania danych poza urządzenie.",
        meta: [
          "Działa lokalnie w przeglądarce, na tablecie, komputerze czy nawet telefonie i wspiera tryb offline.",
          "Skupiona na realnym workflow wokół arkuszy, a nie na kopiowaniu całego Excela.",
          "Ma narzędzia do inspekcji struktury, filtrów, sortowania i eksportu.",
          "Ma panel - agregacje, który zastępuje tabele przestawne i lekkie makra.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Sheet workflows"],
      },
      en: {
        tabLabel: "Excel Workbench PWA",
        kicker: "PWA / data tools",
        title: "Excel Workbench PWA",
        description:
          "An offline-first app for browsing, filtering, analyzing Excel files without a backend and without sending data off the device.",
        meta: [
          "It runs locally in a browser, on a tablet, computer or even phone and supports offline mode.",
          "Focused on real spreadsheet workflows instead of copying all of Excel.",
          "Includes tools for structure inspection, filtering, sorting, and export.",
          "It has an aggregations panel that replaces pivot tables and lightweight macros.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Sheet workflows"],
      },
    },
  }),
  "calc-pwa": makeProject({
    accent: "#4088F4",
    accentDeep: "#2463EB",
    glow: "rgba(36, 99, 235, 0.30)",
    glowSoft: "rgba(36, 99, 235, 0.15)",
    repoTheme: {
      fillStrength: "18%",
      borderStrength: "28%",
      shadowStrength: "24%",
      softGlowSize: "52%",
    },
    image: "./assets/smart-kalkulator-pwa.png",
    imageAlt: {
      pl: "Zrzut ekranu Smart Kalkulator PWA",
      en: "Screenshot of Smart Calculator PWA",
    },
    actions: [
      { type: "live", href: "https://kalkulator-by-matm0.vercel.app" },
      { type: "repo", href: "https://github.com/mzmuda101-prog/smart-kalkulator-pwa" },
    ],
    copy: {
      pl: {
        tabLabel: "Smart Kalkulator PWA",
        kicker: "PWA / calc-tools",
        title: "Smart Kalkulator PWA",
        description:
          "Offline-first aplikacja do liczenia liczb, przeliczania walut oraz innych smart komend bez wysyłania danych poza urządzenie.",
        meta: [
          "Działa lokalnie w przeglądarce, na tablecie, komputerze czy nawet telefonie i działa również offline.",
          "Kalkulator z historią i przeliczaniem walut (NBP/Frankfurter), moduł inżynieryjny do podziału osi i siatek, rysowanie wykresów f(x) i geometrii 2D oraz Warsztat z narzędziami budowlano-elektrycznymi.",
          "Notatnik z wieloma notatkami, zmiennymi globalnymi (@nazwa) i trybem fold — każda linia to wyrażenie obliczane na żywo.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Service Worker", "Canvas API", "NBP API"],
      },
      en: {
        tabLabel: "Smart Calculator PWA",
        kicker: "PWA / calc-tools",
        title: "Smart Calculator PWA",
        description:
          "An offline-first app for calculating numbers, converting currencies and other smart commands without sending data off the device.",
        meta: [
          "Runs locally in a browser, on a tablet, computer or even phone and supports full offline mode via Service Worker cache.",
          "Calculator with history and live currency conversion (NBP/Frankfurter), engineering module for axis divisions and grids, f(x) graph plotting, 2D geometry drawing, and a Workshop with construction and electrical tools.",
          "Multi-note notepad with shared global variables (@name) and fold mode — every line is a live-evaluated expression.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Service Worker", "Canvas API", "NBP API"],
      },
    },
  }),
  "documents-workbench-pwa": makeProject({
    accent: "#4088F4",
    accentDeep: "#2463EB",
    glow: "rgba(36, 99, 235, 0.30)",
    glowSoft: "rgba(36, 99, 235, 0.15)",
    repoTheme: {
      fillStrength: "18%",
      borderStrength: "28%",
      shadowStrength: "24%",
      softGlowSize: "52%",
    },
    image: "./assets/documents-workbench-pwa-1.png",
    imageAlt: {
      pl: "Zrzut ekranu Documents Workbench PWA",
      en: "Screenshot of Documents Workbench PWA",
    },
    actions: [
      { type: "live", href: "https://documents-workbench-pwa.vercel.app" },
      { type: "repo", href: "https://github.com/mzmuda101-prog/documents-workbench-pwa" },
    ],
    copy: {
      pl: {
        tabLabel: "Documents Workbench PWA",
        kicker: "PWA / documents-tools",
        title: "Documents Workbench PWA",
        description:
          "Offline-first aplikacja do przeglądania, filtrowania, analizowania plików dokumentów bez backendu i bez wysyłania danych poza urządzenie.",
        meta: [
          "Działa lokalnie w przeglądarce, na tablecie, komputerze czy nawet telefonie i wspiera tryb offline.",
          "Skupiona na realnym workflow wokół dokumentów, a nie na kopiowaniu całego dokumentu.",
          "Ma narzędzia do inspekcji struktury, filtrów, sortowania i eksportu.",
          "Ma panel - agregacje, który zastępuje tabele przestawne i lekkie makra.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Documents workflows"],
      },
      en: {
        tabLabel: "Documents Workbench PWA",
        kicker: "PWA / documents-tools",
        title: "Documents Workbench PWA",
        description:
          "An offline-first app for browsing, filtering, analyzing documents files without a backend and without sending data off the device.",
        meta: [
          "It runs locally in a browser, on a tablet, computer or even phone and supports offline mode.",
          "Focused on real documents workflows instead of copying all of documents.",
          "Includes tools for structure inspection, filtering, sorting, and export.",
          "It has an aggregations panel that replaces pivot tables and lightweight macros.",
        ],
        stack: ["HTML", "CSS", "JavaScript", "PWA", "Documents workflows"],
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
