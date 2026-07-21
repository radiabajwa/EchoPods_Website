(() => {
  "use strict";

  const root = document.body;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     Theme toggle
     ---------------------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "halcyon-theme";

  function applyTheme(theme){
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){ /* storage unavailable, ignore */ }
  }

  (function initTheme(){
    let stored = null;
    try{ stored = localStorage.getItem(THEME_KEY); }catch(e){ /* ignore */ }
    if(stored === "light" || stored === "dark"){
      applyTheme(stored);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      applyTheme(prefersLight ? "light" : "dark");
    }
  })();

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
  });

  /* ----------------------------------------------------------------------
     Sticky nav background on scroll
     ---------------------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const toTopBtn = document.getElementById("toTop");

  function onScroll(){
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 12);
    toTopBtn.toggleAttribute("hidden", y < 600);
    toTopBtn.classList.toggle("is-visible", y >= 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });

  /* ----------------------------------------------------------------------
     Mobile menu
     ---------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu(){
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("is-open");
    mobileMenu.hidden = true;
  }
  function openMenu(){
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileMenu.hidden = false;
    mobileMenu.classList.add("is-open");
  }
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if(window.innerWidth > 980){ closeMenu(); }
  });

  /* ----------------------------------------------------------------------
     Scroll-reveal
     ---------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !prefersReduced){
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if(entry.isIntersecting){
          entry.target.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

  /* ----------------------------------------------------------------------
     Waveform — generated bars, subtle scroll-linked motion
     ---------------------------------------------------------------------- */
  const waveform = document.getElementById("waveform");
  if(waveform){
    const BAR_COUNT = 64;
    const bars = [];
    const heights = [];
    for(let i = 0; i < BAR_COUNT; i++){
      // deterministic pseudo-waveform shape rather than pure noise
      const base = Math.sin(i * 0.35) * 0.35 + Math.sin(i * 0.11) * 0.4 + 0.5;
      const h = Math.max(0.08, Math.min(1, base + (Math.sin(i * 1.7) * 0.12)));
      heights.push(h);
      const bar = document.createElement("div");
      bar.className = "waveform__bar";
      bar.style.height = `${h * 100}%`;
      waveform.appendChild(bar);
      bars.push(bar);
    }

    if(!prefersReduced){
      let ticking = false;
      function updateWave(){
        const rect = waveform.getBoundingClientRect();
        const progress = 1 - Math.min(1, Math.max(0, rect.top / window.innerHeight));
        bars.forEach((bar, i) => {
          const wobble = Math.sin((progress * 8) + i * 0.4) * 0.18 * progress;
          const scale = Math.max(0.12, heights[i] + wobble);
          bar.style.transform = `scaleY(${scale / heights[i]})`;
        });
        ticking = false;
      }
      window.addEventListener("scroll", () => {
        if(!ticking){ requestAnimationFrame(updateWave); ticking = true; }
      }, { passive: true });
      updateWave();
    }
  }

  /* ----------------------------------------------------------------------
     Colorway swatches
     ---------------------------------------------------------------------- */
  const swatches = document.querySelectorAll(".swatch");
  const palettes = {
    graphite: { c1: "#6a6f78", c2: "#26282c" },
    champagne: { c1: "#e9d9b8", c2: "#a9895b" },
    glacier:   { c1: "#dfeaf0", c2: "#8ba3ae" },
  };

  swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      swatches.forEach(s => { s.classList.remove("is-active"); s.setAttribute("aria-checked", "false"); });
      swatch.classList.add("is-active");
      swatch.setAttribute("aria-checked", "true");
      const key = swatch.dataset.color;
      const palette = palettes[key];
      if(palette){
        document.documentElement.style.setProperty("--case-color-1", palette.c1);
        document.documentElement.style.setProperty("--case-color-2", palette.c2);
      }
    });
  });

  /* ----------------------------------------------------------------------
     Film overlay
     ---------------------------------------------------------------------- */
  const watchFilmBtn = document.getElementById("watchFilm");
  const filmOverlay = document.getElementById("filmOverlay");
  const filmClose = document.getElementById("filmClose");
  let lastFocused = null;

  function openFilm(){
    lastFocused = document.activeElement;
    filmOverlay.hidden = false;
    requestAnimationFrame(() => filmOverlay.classList.add("is-open"));
    filmClose.focus();
    document.addEventListener("keydown", onFilmKeydown);
  }
  function closeFilm(){
    filmOverlay.classList.remove("is-open");
    document.removeEventListener("keydown", onFilmKeydown);
    window.setTimeout(() => { filmOverlay.hidden = true; }, prefersReduced ? 0 : 300);
    if(lastFocused){ lastFocused.focus(); }
  }
  function onFilmKeydown(e){
    if(e.key === "Escape"){ closeFilm(); }
  }

  watchFilmBtn.addEventListener("click", openFilm);
  filmClose.addEventListener("click", closeFilm);
  filmOverlay.addEventListener("click", (e) => { if(e.target === filmOverlay){ closeFilm(); } });

  /* ----------------------------------------------------------------------
     Pre-order form (demo only — no backend)
     ---------------------------------------------------------------------- */
  const form = document.getElementById("preorderForm");
  const note = document.getElementById("preorderNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const value = email.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    note.classList.remove("is-success", "is-error");
    if(!isValid){
      note.textContent = "That email doesn't look right — check it and try again.";
      note.classList.add("is-error");
      email.focus();
      return;
    }
    note.textContent = `You're on the list — we'll email ${value} when Halcyon One ships.`;
    note.classList.add("is-success");
    form.reset();
  });

})();
