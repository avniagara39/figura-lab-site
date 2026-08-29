(function () {
  "use strict";

  /* Порог мобильного меню совпадает с @media (max-width: 640px) в main.css */
  var MOBILE_NAV_QUERY = "(max-width: 640px)";
  var FOCUSABLE = "a[href], button:not([disabled]), [tabindex='0']";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var mobileNav = window.matchMedia(MOBILE_NAV_QUERY);
  var navIsOpen = false;

  /* Фон при открытом меню выключается из фокуса и из accessibility tree.
     Если браузер не поддерживает inert, содержание удерживает focus trap ниже. */
  var backgroundParts = document.querySelectorAll(".skip-link, .brand, main, .site-footer, .back-to-top");

  function toArray(collection) {
    return Array.prototype.slice.call(collection || []);
  }

  function visibleNavStops() {
    if (!siteNav) return [];
    var stops = navToggle ? [navToggle] : [];
    toArray(siteNav.querySelectorAll(FOCUSABLE)).forEach(function (el) {
      if (el.getClientRects().length) stops.push(el);
    });
    return stops;
  }

  function setNavOpen(open, returnFocus) {
    if (!header || !navToggle || !siteNav) return;

    navIsOpen = open;
    header.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-locked", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");

    toArray(backgroundParts).forEach(function (el) {
      if (el.toggleAttribute) el.toggleAttribute("inert", open);
    });

    if (open) {
      var firstLink = siteNav.querySelector(FOCUSABLE);
      if (firstLink) firstLink.focus();
    } else if (returnFocus) {
      navToggle.focus();
    }
  }

  function keepFocusInsideNav(e) {
    var stops = visibleNavStops();
    if (stops.length < 2) return;

    var first = stops[0];
    var last = stops[stops.length - 1];
    var index = stops.indexOf(document.activeElement);

    if (index === -1) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
      return;
    }
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (navToggle && siteNav && header) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!navIsOpen, navIsOpen);
    });

    /* Переход по якорю закрывает меню, но фокус не отбирается у целевой секции */
    toArray(siteNav.querySelectorAll("a[href^='#']")).forEach(function (link) {
      link.addEventListener("click", function () {
        if (navIsOpen) setNavOpen(false, false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (!navIsOpen) return;
      if (e.key === "Escape" || e.key === "Esc") {
        setNavOpen(false, true);
        return;
      }
      if (e.key === "Tab") keepFocusInsideNav(e);
    });

    /* Уход на desktop-раскладку не должен оставлять меню и scroll lock включёнными */
    var onBreakpointChange = function () {
      if (!mobileNav.matches && navIsOpen) setNavOpen(false, false);
    };

    if (mobileNav.addEventListener) {
      mobileNav.addEventListener("change", onBreakpointChange);
    } else if (mobileNav.addListener) {
      mobileNav.addListener(onBreakpointChange);
    }
  }

  var backToTop = document.querySelector(".back-to-top");

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 240);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var stories = toArray(document.querySelectorAll(".story"));

  function setStoryOpen(story, open) {
    var button = story.querySelector(".story-more");
    var full = story.querySelector(".story-full");
    if (!button || !full) return;

    story.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.textContent = open ? "Свернуть" : "Читать полностью";
    if (open) full.removeAttribute("hidden");
    else full.setAttribute("hidden", "");
  }

  function closeStories(except) {
    stories.forEach(function (story) {
      if (story !== except) setStoryOpen(story, false);
    });
  }

  stories.forEach(function (story) {
    var button = story.querySelector(".story-more");
    if (!button) return;
    button.addEventListener("click", function () {
      var willOpen = !story.classList.contains("is-open");
      closeStories(willOpen ? story : null);
      setStoryOpen(story, willOpen);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" && e.key !== "Esc") return;
    if (navIsOpen) return;
    var openStory = stories.filter(function (story) {
      return story.classList.contains("is-open");
    })[0];
    if (!openStory) return;
    setStoryOpen(openStory, false);
    var button = openStory.querySelector(".story-more");
    if (button) button.focus();
  });

  var revealEls = document.querySelectorAll(".reveal");
  var showAll = function () {
    toArray(revealEls).forEach(function (el) {
      el.classList.add("is-visible");
    });
  };

  if (!revealEls.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    toArray(revealEls).forEach(function (el) {
      io.observe(el);
    });

    /* Включение «уменьшить движение» на ходу не должно оставить блоки скрытыми */
    var onMotionChange = function () {
      if (!reduceMotion.matches) return;
      io.disconnect();
      showAll();
    };

    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener("change", onMotionChange);
    } else if (reduceMotion.addListener) {
      reduceMotion.addListener(onMotionChange);
    }
  }
})();
