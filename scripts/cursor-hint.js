window.PortfolioCursorHint = (() => {
  function createCursorHintController({ cursorHint, prefersReducedMotion, getFallbackHint }) {
    let cursorHintX = -999;
    let cursorHintY = -999;
    let cursorHintTargetX = -999;
    let cursorHintTargetY = -999;
    let cursorHintFrame = null;

    function moveCursorHint(x, y) {
      if (!cursorHint) return;
      const style = getComputedStyle(cursorHint);
      const parsedOffsetX = parseInt(style.getPropertyValue("--hint-offset-x"), 10);
      const parsedOffsetY = parseInt(style.getPropertyValue("--hint-offset-y"), 10);
      const offsetX = Number.isNaN(parsedOffsetX) ? 22 : parsedOffsetX;
      const offsetY = Number.isNaN(parsedOffsetY) ? 18 : parsedOffsetY;

      cursorHintTargetX = x + offsetX;
      cursorHintTargetY = y - offsetY;
      if (cursorHintFrame !== null) return;

      const animateHint = () => {
        cursorHintX += (cursorHintTargetX - cursorHintX) * 0.24;
        cursorHintY += (cursorHintTargetY - cursorHintY) * 0.24;

        if (Math.abs(cursorHintTargetX - cursorHintX) < 0.2) cursorHintX = cursorHintTargetX;
        if (Math.abs(cursorHintTargetY - cursorHintY) < 0.2) cursorHintY = cursorHintTargetY;

        cursorHint.style.transform = `translate3d(${cursorHintX}px, ${cursorHintY}px, 0)`;

        if (cursorHintX !== cursorHintTargetX || cursorHintY !== cursorHintTargetY) {
          cursorHintFrame = window.requestAnimationFrame(animateHint);
        } else {
          cursorHintFrame = null;
        }
      };

      cursorHintFrame = window.requestAnimationFrame(animateHint);
    }

    function setHintText(hintContent) {
      const span = cursorHint.querySelector("span");
      if (!span) return;

      if (hintContent.includes("/|")) {
        const lines = hintContent.split("/|").map((line) => line.trim());
        span.textContent = "";
        lines.forEach((line, index) => {
          if (index > 0) span.appendChild(document.createElement("br"));
          span.appendChild(document.createTextNode(line));
        });
      } else {
        span.textContent = hintContent;
      }
    }

    function setupCursorHint(elements, clickCallback = null) {
      elements.forEach((el) => {
        el.addEventListener("pointerenter", (event) => {
          event.stopPropagation();
          if (!cursorHint || prefersReducedMotion) return;

          setHintText(el.dataset.hint || getFallbackHint());

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
          event.stopPropagation();
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

    return { setupCursorHint };
  }

  return { createCursorHintController };
})();
