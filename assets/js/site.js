/* Figura Lab — site.js — Stage 3 Production Foundation */
"use strict";

/* --------------------------------------------------------------------------
   Mobile navigation — accessible toggle
   - ARIA: aria-expanded, aria-controls
   - Keyboard: Escape closes, focus returns to trigger
   - Scroll lock: body.nav-locked
   -------------------------------------------------------------------------- */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav    = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  let isOpen = false;

  function openNav() {
    isOpen = true;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню навигации");
    nav.classList.add("is-open");
    document.body.classList.add("nav-locked");
    // Move focus to first nav link
    const firstLink = nav.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }

  function closeNav(returnFocus) {
    if (!isOpen) return;
    isOpen = false;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню навигации");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-locked");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (isOpen) closeNav(true);
    else openNav();
  });

  // Escape closes from anywhere
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) closeNav(true);
  });

  // Click outside nav or toggle closes
  document.addEventListener("click", function (e) {
    if (!isOpen) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav(false);
  });

  // Close on nav link click (mobile: page navigation)
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { closeNav(false); });
  });
})();

/* --------------------------------------------------------------------------
   Header: add .is-scrolled class after user scrolls past 60px
   -------------------------------------------------------------------------- */
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function updateHeader() {
    const scrolled = window.scrollY > 60;
    header.classList.toggle("is-scrolled", scrolled);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();

/* --------------------------------------------------------------------------
   Reveal: light fade-in for .reveal elements via IntersectionObserver
   Respects prefers-reduced-motion
   -------------------------------------------------------------------------- */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

  items.forEach(function (el) { observer.observe(el); });
})();
