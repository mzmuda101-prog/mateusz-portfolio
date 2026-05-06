window.PortfolioLanguage = (() => {
  const translatedAttributes = [
    ["data-i18n", "textContent"],
    ["data-i18n-hint", "data-hint"],
    ["data-i18n-aria-label", "aria-label"],
    ["data-i18n-alt", "alt"],
    ["data-i18n-content", "content"],
  ];

  function getCopyValue(copy, lang, key) {
    const getValue = (source) =>
      key.split(".").reduce((value, part) => {
        if (value && Object.prototype.hasOwnProperty.call(value, part)) {
          return value[part];
        }
        return undefined;
      }, source);

    return getValue(copy[lang]) ?? getValue(copy.pl);
  }

  function setTranslatedValue(element, target, value) {
    if (target === "textContent") {
      element.textContent = value;
      return;
    }

    if (target === "data-hint") {
      element.dataset.hint = value;
      return;
    }

    element.setAttribute(target, value);
  }

  function applyTranslatedAttributes(copy, lang) {
    translatedAttributes.forEach(([sourceAttribute, target]) => {
      document.querySelectorAll(`[${sourceAttribute}]`).forEach((element) => {
        const key = element.getAttribute(sourceAttribute);
        if (!key) return;

        const value = getCopyValue(copy, lang, key);
        if (value === undefined) return;

        setTranslatedValue(element, target, value);
      });
    });
  }

  function createLanguageController({
    storageKey,
    copy,
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
      applyTranslatedAttributes(copy, lang);

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
