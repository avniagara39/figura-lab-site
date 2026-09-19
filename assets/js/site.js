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
     Reveal on scroll
     ------------------------------------------------------------------------ */
  (function reveal() {
    if (!("IntersectionObserver" in window)) return;
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ------------------------------------------------------------------------
     Chapter rail — active chapter follows the scroll position
     ------------------------------------------------------------------------ */
  (function chapterRail() {
    var rail = document.querySelector("[data-chapter-rail]");
    if (!rail || !("IntersectionObserver" in window)) return;

    var links = Array.prototype.slice.call(rail.querySelectorAll("[data-chapter-link]"));
    var sections = links
      .map(function (link) { return document.getElementById(link.getAttribute("data-chapter-link")); })
      .filter(Boolean);
    if (!sections.length) return;

    var activeId = null;
    var visible = {};

    function setActive(id) {
      if (id === activeId) return;
      activeId = id;
      links.forEach(function (link) {
        if (link.getAttribute("data-chapter-link") === id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible[entry.target.id] = true;
        else delete visible[entry.target.id];
      });

      /* Of the sections inside the reading zone, mark the topmost one */
      var best = null;
      sections.forEach(function (section) {
        if (!visible[section.id]) return;
        var distance = Math.abs(section.getBoundingClientRect().top);
        if (best === null || distance < best.distance) {
          best = { id: section.id, distance: distance };
        }
      });

      if (best) setActive(best.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
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
    if (reduceMotion.matches) {
      stages.forEach(function (s) { s.classList.add("is-active"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    }, { rootMargin: "-30% 0px -30% 0px", threshold: 0 });

    stages.forEach(function (s) { observer.observe(s); });

    /* Make sure the first stage is lit before it reaches the reading zone */
    stages[0].classList.add("is-active");
  })();

  /* ------------------------------------------------------------------------
     Immersive reveal — the framed image expands into the scene and back
     Progress 0 → 1 is written to a custom property; all sizing lives in CSS.
     ------------------------------------------------------------------------ */
  (function immersive() {
    var section = document.querySelector("[data-immersive]");
    if (!section) return;

    var track = section.querySelector("[data-immersive-track]");
    if (!track) return;

    var enabled = false;
    var ticking = false;

    function progress() {
      var rect = track.getBoundingClientRect();
      var travel = rect.height - window.innerHeight;
      if (travel <= 0) return 1;
      var p = -rect.top / travel;
      return Math.min(1, Math.max(0, p));
    }

    function update() {
      ticking = false;
      section.style.setProperty("--p", progress().toFixed(4));
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    /* Matches the CSS breakpoint that turns the sticky stage on */
    var canRun = window.matchMedia("(min-width: 64em)");

    function sync() {
      var next = canRun.matches && !reduceMotion.matches;
      if (next === enabled) return;
      enabled = next;

      if (enabled) {
        window.addEventListener("scroll", request, { passive: true });
        window.addEventListener("resize", request);
        update();
      } else {
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
        section.style.removeProperty("--p");
      }
    }

    sync();
    if (canRun.addEventListener) canRun.addEventListener("change", sync);
    if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", sync);
  })();
})();
