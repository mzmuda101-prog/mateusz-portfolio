const projects = {
  "excel-workbench-pwa": {
    kicker: "PWA / data tools",
    title: "Excel Workbench PWA",
    accent: "#2f6f5c",
    accentDeep: "#245849",
    glow: "rgba(47, 111, 92, 0.22)",
    glowSoft: "rgba(168, 217, 184, 0.18)",
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
  },
  "excel-workbench": {
    kicker: "Desktop app / Excel tooling",
    title: "Excel Workbench",
    accent: "#3f6db5",
    accentDeep: "#294676",
    glow: "rgba(63, 109, 181, 0.2)",
    glowSoft: "rgba(122, 162, 224, 0.18)",
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
  },
  "portal-ogloszeniowy": {
    kicker: "Marketplace / cloud integrations",
    title: "Portal Ogłoszeniowy",
    accent: "#e67e22",
    accentDeep: "#9a4e0f",
    glow: "rgba(230, 126, 34, 0.22)",
    glowSoft: "rgba(241, 196, 15, 0.18)",
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
  },
  "data-collector": {
    kicker: "Frontend / Excel export",
    title: "Data Collector & Excel Export",
    accent: "#e94560",
    accentDeep: "#a5283f",
    glow: "rgba(233, 69, 96, 0.24)",
    glowSoft: "rgba(255, 107, 107, 0.18)",
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
  },
  "code-learning-analyzer": {
    kicker: "CLI / reports / learning tool",
    title: "Code Learning Analyzer",
    accent: "#6f54d9",
    accentDeep: "#48309f",
    glow: "rgba(111, 84, 217, 0.2)",
    glowSoft: "rgba(166, 144, 255, 0.18)",
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
  },
};

const repoFallback = [
  {
    name: "excel-workbench-pwa",
    description: "Offline-first workbench do pracy z plikami Excel w przeglądarce.",
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/excel-workbench-pwa",
    homepage: "https://excel-workbench-pwa.vercel.app",
  },
  {
    name: "Portal-Ogloszeniowy",
    description: "Marketplace z panelem administratora i integracjami chmurowymi.",
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/Portal-Ogloszeniowy",
    homepage: "https://portal-ogloszeniowy.vercel.app",
  },
  {
    name: "Data-Collector-Excel-App",
    description: "Interaktywny frontend z eksportem danych do Excela.",
    language: "JavaScript",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/Data-Collector-Excel-App",
    homepage: "https://strona-6.vercel.app",
  },
  {
    name: "code-learning-analyzer",
    description: "Analizator jakości kodu z raportami i trybem nauki.",
    language: "Python",
    updated_at: "2026-04-22T00:00:00Z",
    html_url: "https://github.com/mzmuda101-prog/code-learning-analyzer",
    homepage: "",
  },
];

const spotlight = {
  kicker: document.getElementById("spotlight-kicker"),
  title: document.getElementById("spotlight-title"),
  description: document.getElementById("spotlight-description"),
  image: document.getElementById("spotlight-image"),
  meta: document.getElementById("spotlight-meta"),
  stack: document.getElementById("spotlight-stack"),
  actions: document.getElementById("spotlight-actions"),
  root: document.getElementById("project-spotlight"),
};

const tabs = Array.from(document.querySelectorAll(".project-tab"));
const repoGrid = document.getElementById("repo-grid");
const githubStatus = document.getElementById("github-status");
const revealTargets = document.querySelectorAll(".reveal");
const heroStage = document.querySelector(".hero-stage");
const heroShot = document.querySelector(".hero-shot");
const magneticButtons = document.querySelectorAll(".button-magnetic");
const heroPanels = Array.from(document.querySelectorAll(".hero-panel-trigger"));
const cursorHint = document.getElementById("cursor-hint");
let activeProjectKey = "excel-workbench-pwa";
let activeHeroPanel = null;
let cursorHintX = -999;
let cursorHintY = -999;
let cursorHintTargetX = -999;
let cursorHintTargetY = -999;
let cursorHintFrame = null;

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

  spotlight.meta.innerHTML = project.meta.map((item) => `<li>${item}</li>`).join("");
  spotlight.stack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");
  spotlight.actions.innerHTML = project.actions.length
    ? project.actions
        .map(
          (action, index) => `
            <a
              class="button ${index === 0 ? "button-primary" : "button-secondary"}"
              href="${action.href}"
              target="_blank"
              rel="noreferrer"
            >${action.label}</a>
          `
        )
        .join("")
    : `<span class="button button-secondary" aria-disabled="true">Projekt lokalny / bez publicznego linku</span>`;

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
  repoGrid.innerHTML = repos
    .map((repo) => {
      const homepageLink = repo.homepage
        ? `<a class="button button-secondary" href="${repo.homepage}" target="_blank" rel="noreferrer">Live</a>`
        : "";

      return `
        <article class="repo-card">
          <div class="repo-meta">
            <span>${repo.language || "Mixed stack"}</span>
            <span>Update: ${formatDate(repo.updated_at)}</span>
          </div>
          <h3>${repo.name}</h3>
          <p>${repo.description || "Repozytorium bez opisu, ale dostępne publicznie na GitHubie."}</p>
          <div class="project-actions">
            <a class="button button-primary" href="${repo.html_url}" target="_blank" rel="noreferrer">Repo</a>
            ${homepageLink}
          </div>
        </article>
      `;
    })
    .join("");
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

heroPanels.forEach((panel) => {
  panel.addEventListener("pointerenter", (event) => {
    if (!cursorHint || prefersReducedMotion) return;
    cursorHint.classList.add("is-visible");
    moveCursorHint(event.clientX, event.clientY);
  });

  panel.addEventListener("pointermove", (event) => {
    if (!cursorHint || prefersReducedMotion) return;
    moveCursorHint(event.clientX, event.clientY);
  });

  panel.addEventListener("pointerleave", () => {
    if (!cursorHint) return;
    cursorHint.classList.remove("is-visible");
    cursorHintTargetX = -999;
    cursorHintTargetY = -999;
    moveCursorHint(-999, -999);
  });

  panel.addEventListener("click", () => {
    const isAlreadyFocused = panel.classList.contains("is-focused");
    setPanelFocus(isAlreadyFocused ? null : panel);
  });
});

document.addEventListener("click", (event) => {
  const clickedPanel = event.target.closest(".hero-panel-trigger");
  if (!clickedPanel) {
    setPanelFocus(null);
  }
});

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
