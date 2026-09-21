/* Figura Lab — site.js
   Vanilla, no dependencies. Every enhancement degrades to readable content:
   the page is fully usable with JS disabled or prefers-reduced-motion on. */
"use strict";

(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Motion opt-in class. Runs before first paint (script sits at end of body),
     so there is no flash between the static and the animated state. */
  function syncMotionFlag() {
    root.classList.toggle("motion", !reduceMotion.matches);
  }
  syncMotionFlag();
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", syncMotionFlag);
  }

  function headerOffset() {
    var header = document.querySelector(".site-header");
    return header ? Math.round(header.getBoundingClientRect().height) : 80;
  }

  function prefersReduce() {
    return reduceMotion.matches;
  }

  function settleScene(el) {
    if (!el || !el.hasAttribute) return;
    if (el.hasAttribute("data-scene")) el.classList.add("is-in");
    if (el.hasAttribute("data-scene-expand")) el.style.setProperty("--p", "1");
  }

  /* Land on the element itself (chapter container on the homepage). */
  function scrollToEntry(el, behavior) {
    if (!el) return;
    var top = window.scrollY + el.getBoundingClientRect().top - headerOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: behavior || "auto" });
    settleScene(el);
  }

  /* ------------------------------------------------------------------------
     Mobile navigation — accessible disclosure
     aria-expanded · Escape closes and returns focus · focus trap · scroll lock
     ------------------------------------------------------------------------ */
  (function mobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    var isOpen = false;

    function focusables() {
      return Array.prototype.filter.call(
        nav.querySelectorAll("a[href], button:not([disabled])"),
        function (el) { return el.offsetParent !== null; }
      );
    }

    function open() {
      isOpen = true;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Закрыть меню навигации");
      nav.classList.add("is-open");
      document.body.classList.add("nav-locked");
      var first = focusables()[0];
      if (first) first.focus();
    }

    function close(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню навигации");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-locked");
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      if (isOpen) close(true); else open();
    });

    document.addEventListener("keydown", function (e) {
      if (!isOpen) return;

      if (e.key === "Escape") {
        close(true);
        return;
      }

      if (e.key === "Tab") {
        var items = focusables();
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    document.addEventListener("click", function (e) {
      if (!isOpen) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) close(false);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close(false);
    });

    /* Leaving the mobile layout must not leave the menu in an open state */
    var desktop = window.matchMedia("(min-width: 64em)");
    var onBreakpoint = function () { if (desktop.matches) close(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
  })();

  /* ------------------------------------------------------------------------
     Header — subtle border once the page has been scrolled
     ------------------------------------------------------------------------ */
  (function header() {
    var el = document.querySelector(".site-header");
    if (!el) return;
    var update = function () { el.classList.toggle("is-scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();

  /* ------------------------------------------------------------------------
     In-page anchors — homepage rail lands on chapter containers
     ------------------------------------------------------------------------ */
  (function inPageAnchors() {
    function resolveTarget(hash) {
      if (!hash || hash.charAt(0) !== "#") return null;
      var id = hash.slice(1);
      if (!id) return null;
      var target = document.getElementById(id);
      // Heading fragments share the enclosing editorial section's entry edge.
      if (target && document.body.classList.contains("editorial-page")) {
        return target.closest(".program-detail, .chapter") || target;
      }
      return target;
    }

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var target = resolveTarget(href);
      if (!target) return;
      e.preventDefault();
      if (history.pushState) history.pushState(null, "", href);
      scrollToEntry(target, prefersReduce() ? "auto" : "smooth");
      if (document.body.classList.contains("editorial-page") && !target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      if (target.hasAttribute("tabindex") && typeof target.focus === "function") {
        try { target.focus({ preventScroll: true }); } catch (err) { target.focus(); }
      }
    });

    // Native history traversal and changed fragments use the same section edge.
    if (document.body.classList.contains("editorial-page")) {
      window.addEventListener("hashchange", function () {
        var target = resolveTarget(location.hash);
        if (target) requestAnimationFrame(function () { scrollToEntry(target, "auto"); });
      });
    }

    if (location.hash.length > 1) {
      var initial = resolveTarget(location.hash);
      if (initial) {
        requestAnimationFrame(function () { scrollToEntry(initial, "auto"); });
        if (document.body.classList.contains("editorial-page")) {
          var initialHash = location.hash;
          function settleInitialEntry() {
            requestAnimationFrame(function () {
              if (location.hash === initialHash) scrollToEntry(initial, "auto");
            });
          }
          // Native fragment restoration can run after the first font-ready frame.
          // Settle once after page load as well, using the same section boundary.
          window.addEventListener("load", settleInitialEntry, { once: true });
          if (document.fonts) document.fonts.ready.then(settleInitialEntry);
        }
      }
    }
  })();

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */
  (function reveal() {
    var items = document.querySelectorAll(".reveal, .reveal-group");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ------------------------------------------------------------------------
     Signature scenes — reversible in/out (rise, portrait)
     ------------------------------------------------------------------------ */
  (function scenes() {
    var nodes = document.querySelectorAll("[data-scene]");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window) || prefersReduce()) {
      nodes.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-in", entry.isIntersecting);
      });
    }, { rootMargin: "-38% 0px -42% 0px", threshold: 0.28 });

    nodes.forEach(function (el) { observer.observe(el); });
  })();

  /* ------------------------------------------------------------------------
     Chapter rail — active chapter follows the reading line under the header
     ------------------------------------------------------------------------ */
  (function chapterRail() {
    var rail = document.querySelector("[data-chapter-rail]");
    if (!rail) return;

    var links = Array.prototype.slice.call(rail.querySelectorAll("[data-chapter-link]"));
    var sections = links
      .map(function (link) {
        return document.getElementById(link.getAttribute("data-chapter-link"));
      })
      .filter(Boolean);
    if (!sections.length) return;

    var proxies = Array.prototype.slice.call(document.querySelectorAll("[data-chapter-proxy]"));
    var activeId = null;

    function setActive(id) {
      if (!id || id === activeId) return;
      activeId = id;
      links.forEach(function (link) {
        if (link.getAttribute("data-chapter-link") === id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var ticking = false;
    function update() {
      ticking = false;
      var line = headerOffset() + 8;
      var current = sections[0];

      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= line) current = section;
      });

      proxies.forEach(function (proxy) {
        var rect = proxy.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          var proxyId = proxy.getAttribute("data-chapter-proxy");
          if (proxyId) {
            var mapped = document.getElementById(proxyId);
            if (mapped) current = mapped;
          }
        }
      });

      if (current) setActive(current.id);
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  })();

  /* ------------------------------------------------------------------------
     Pinned storytelling — «Как работает метод»
     Highlights the stage currently in the reading zone.
     ------------------------------------------------------------------------ */
  (function processStages() {
    var list = document.querySelector("[data-process-stages]");
    if (!list || !("IntersectionObserver" in window)) return;

    var stages = Array.prototype.slice.call(list.querySelectorAll("[data-process-stage]"));
    if (!stages.length) return;

    /* Without motion every stage stays fully legible — nothing to do */
    if (prefersReduce()) {
      stages.forEach(function (s) { s.classList.add("is-active"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    }, { rootMargin: "-28% 0px -38% 0px", threshold: 0 });

    stages.forEach(function (s) { observer.observe(s); });

    /* Make sure the first stage is lit before it reaches the reading zone */
    stages[0].classList.add("is-active");
  })();

  /* ------------------------------------------------------------------------
     Scene progress — writes --p (0 → 1) for immersive / expanding worlds
     ------------------------------------------------------------------------ */
  (function sceneProgress() {
    var immersive = document.querySelector("[data-immersive]");
    var expanders = Array.prototype.slice.call(document.querySelectorAll("[data-scene-expand]"));
    if (!immersive && !expanders.length) return;

    var canPin = window.matchMedia("(min-width: 64em)");
    var enabled = false;
    var ticking = false;

    function clamp01(n) {
      return Math.min(1, Math.max(0, n));
    }

    function trackProgress(track) {
      var rect = track.getBoundingClientRect();
      var travel = rect.height - window.innerHeight;
      if (travel <= 0) return 1;
      return clamp01(-rect.top / travel);
    }

    /* Maps section entry: 0 when approaching from below, 1 when heading is at the header. */
    function entryProgress(section) {
      var rect = section.getBoundingClientRect();
      var start = window.innerHeight * 0.88;
      var end = headerOffset();
      var span = start - end;
      if (span <= 0) return 1;
      return clamp01((start - rect.top) / span);
    }

    function update() {
      ticking = false;
      if (immersive) {
        var track = immersive.querySelector("[data-scene-track]");
        if (track) immersive.style.setProperty("--p", trackProgress(track).toFixed(4));
      }
      expanders.forEach(function (section) {
        section.style.setProperty("--p", entryProgress(section).toFixed(4));
      });
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    function sync() {
      var next = canPin.matches && !prefersReduce();
      if (next === enabled) {
        if (enabled) request();
        return;
      }
      enabled = next;

      if (enabled) {
        window.addEventListener("scroll", request, { passive: true });
        window.addEventListener("resize", request);
        update();
      } else {
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
        if (immersive) immersive.style.removeProperty("--p");
        expanders.forEach(function (section) { section.style.removeProperty("--p"); });
      }
    }

    sync();
    if (canPin.addEventListener) canPin.addEventListener("change", sync);
    if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", sync);
  })();
})();
