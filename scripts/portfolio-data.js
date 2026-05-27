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
