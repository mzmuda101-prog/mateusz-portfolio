window.PortfolioLanguage = (() => {
  function setText(getEl, id, value) {
    const element = getEl(id);
    if (element) element.textContent = value;
  }

  function setHTML(getEl, id, value) {
    const element = getEl(id);
    if (element) {
      element.replaceChildren();
      element.appendChild(document.createTextNode(value));
    }
  }

  function createLanguageController({
    storageKey,
    copy,
    getEl,
    langButtons,
    getActiveProjectKey,
    getCurrentRepos,
    getGithubStatusText,
    renderSpotlight,
    renderRepos,
    setGithubStatusText,
    setCurrentLang,
  }) {
    let currentLang = localStorage.getItem(storageKey) === "en" ? "en" : "pl";

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
      setCurrentLang(lang);
      localStorage.setItem(storageKey, lang);
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

      const heroTitle = getEl("hero-title");
      if (heroTitle) heroTitle.dataset.hint = copy[lang].heroTitleHint;

      const contactEmail = getEl("contact-email-heading");
      if (contactEmail) contactEmail.dataset.hint = copy[lang].contactEmailHint;

      setText(getEl, "hero-eyebrow-top", copy[lang].heroEyebrowTop);
      setText(getEl, "hero-eyebrow-bottom", copy[lang].heroEyebrowBottom);
      setText(getEl, "hero-title-main", copy[lang].heroTitleMain);
      setText(getEl, "hero-title-accent", copy[lang].heroTitleAccent);
      setText(getEl, "hero-lead", copy[lang].heroLead);
      setText(getEl, "hero-metric-1", copy[lang].heroMetric1);
      setText(getEl, "hero-metric-2", copy[lang].heroMetric2);
      setText(getEl, "hero-metric-3", copy[lang].heroMetric3);
      setText(getEl, "hero-panel-main-label", copy[lang].heroPanelMainLabel);
      setText(getEl, "hero-panel-main-item-1", copy[lang].heroPanelMain1);
      setText(getEl, "hero-panel-main-item-2", copy[lang].heroPanelMain2);
      setText(getEl, "hero-panel-main-item-3", copy[lang].heroPanelMain3);
      setText(getEl, "hero-panel-side-label", copy[lang].heroPanelSideLabel);
      setText(getEl, "hero-panel-side-title", copy[lang].heroPanelSideTitle);
      setText(getEl, "hero-panel-side-content", copy[lang].heroPanelSideText);
      setText(getEl, "intro-strip-text", copy[lang].introStrip);
      setText(getEl, "projects-eyebrow", copy[lang].projectsEyebrow);
      setText(getEl, "projects-title", copy[lang].projectsTitle);
      setText(getEl, "process-eyebrow", copy[lang].processEyebrow);
      setText(getEl, "process-title", copy[lang].processTitle);
      setText(getEl, "process-step-1-title", copy[lang].processStep1Title);
      setText(getEl, "process-step-1-text", copy[lang].processStep1Text);
      setText(getEl, "process-step-2-title", copy[lang].processStep2Title);
      setText(getEl, "process-step-2-text", copy[lang].processStep2Text);
      setText(getEl, "process-step-3-title", copy[lang].processStep3Title);
      setText(getEl, "process-step-3-text", copy[lang].processStep3Text);
      setText(getEl, "about-eyebrow", copy[lang].aboutEyebrow);
      setText(getEl, "about-title", copy[lang].aboutTitle);
      setText(getEl, "about-block-1-title", copy[lang].about1Title);
      setText(getEl, "about-block-1-text", copy[lang].about1Text);
      setText(getEl, "about-block-2-title", copy[lang].about2Title);
      setText(getEl, "about-block-2-text", copy[lang].about2Text);
      setText(getEl, "about-block-3-title", copy[lang].about3Title);
      setText(getEl, "about-block-3-text", copy[lang].about3Text);
      setText(getEl, "github-eyebrow", copy[lang].githubEyebrow);
      setText(getEl, "github-title", copy[lang].githubTitle);
      setText(getEl, "github-profile-label", copy[lang].githubProfileLabel);
      setText(getEl, "contact-eyebrow", copy[lang].contactEyebrow);
      setHTML(getEl, "contact-title", copy[lang].contactTitle);
      setText(getEl, "cursor-hint-text", copy[lang].clickHint);

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
      renderSpotlight(getActiveProjectKey());

      const repos = getCurrentRepos();
      if (repos.length) {
        renderRepos(repos);
      } else {
        setGithubStatusText(getGithubStatusText());
      }
    }

    function init() {
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
    }

    return {
      applyLanguage,
      getCurrentLang: () => currentLang,
      init,
      updateLangSwitchIndicator,
    };
  }

  return { createLanguageController };
})();
