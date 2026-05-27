window.PortfolioTranslations = (() => {
const translations = {
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
    heroTitleHint: "najedź na karty po prawej stronie /|(te lekko przykryte)",
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
    githubStatusLoaded: "Sekcja oraz niektóre palety kolorów są aktualizowane z GitHub API.",
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
    clickHint: "Kliknij aby odkryć",
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
    heroTitleHint: "hover over the slightly covered cards /|(on the right)",
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
    githubStatusLoaded: "This section and some palette colours is being updated from the GitHub API.",
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
    clickHint: "Click to reveal",
  },
};


return translations;
})();
