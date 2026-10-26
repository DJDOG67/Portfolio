/* Shared header, footer and page logic. Content lives in js/data.js. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var items = S.items || [];

  var CATS = {
    "3d":        { label: "3D",        title: "3D Models" },
    "sketch":    { label: "SKETCH",    title: "Sketch" },
    "portfolio": { label: "PORTFOLIO", title: "Portfolio" },
    "etc":       { label: "ETC",       title: "Etc." },
  };
  var TYPE_LABEL = { model: "3D VIEWER", image: "IMAGE", pdf: "PDF" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function param(k) { return new URLSearchParams(location.search).get(k); }
  function findItem(id) { return items.filter(function (it) { return it.id === id; })[0]; }
  var page = document.body.getAttribute("data-page");

  /* ---------- active menu ---------- */
  function activeKey() {
    if (page === "works") return param("cat");
    if (page === "info") return "info";
    if (page === "view") { var it = findItem(param("id")); return it && it.cat; }
    return null;
  }

  /* ---------- header ---------- */
  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var key = activeKey();
    var links = Object.keys(CATS).map(function (k) {
      return { key: k, label: CATS[k].label, href: "works.html?cat=" + k };
    }).concat([{ key: "info", label: "MY INFO", href: "info.html" }]);

    el.className = "gnb";
    el.innerHTML =
      '<div class="gnb-bar glass sq">' +
        '<a class="brand" href="index.html">' + esc(S.name) + "</a>" +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="gnb-nav">MENU</button>' +
        '<nav id="gnb-nav" aria-label="Main"><ul>' +
          links.map(function (l) {
            return '<li><a class="nav-link" href="' + l.href + '"' +
              (l.key === key ? ' aria-current="page"' : "") + ">" + l.label + "</a></li>";
          }).join("") +
        "</ul></nav>" +
      "</div>";

    var btn = el.querySelector(".menu-btn");
    btn.addEventListener("click", function () {
      var open = el.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
      btn.textContent = open ? "CLOSE" : "MENU";
    });
  }

  /* ---------- footer (same on every page) ---------- */
  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var c = S.contact || {};
    var contact = [];
    if (c.email) contact.push('<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>");
    if (c.instagram) contact.push('<li><a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>');
    if (c.behance) contact.push('<li><a href="' + esc(c.behance) + '" target="_blank" rel="noopener">Behance</a></li>');

    el.className = "site-footer";
    el.innerHTML =
      '<div class="wrap foot-top">' +
        "<div>" +
          '<p class="foot-name">' + esc(S.name) + "</p>" +
          "<p>" + esc(S.eyebrow) + "</p>" +
        "</div>" +
        "<div><h3>CONTACT</h3><ul>" + contact.join("") + "</ul></div>" +
        "<div><h3>INDEX</h3><ul>" +
          Object.keys(CATS).map(function (k) {
            return '<li><a href="works.html?cat=' + k + '">' + CATS[k].label + "</a></li>";
          }).join("") +
          '<li><a href="info.html">MY INFO</a></li>' +
        "</ul></div>" +
      "</div>" +
      '<div class="wrap foot-bottom">' +
        "<span>© " + new Date().getFullYear() + " " + esc(S.name) + ". All rights reserved.</span>" +
        "<span>All works may not be reused without permission.</span>" +
      "</div>";
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- main page ---------- */
  function initHome() {
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var v = S[el.getAttribute("data-site")];
      if (v) el.textContent = v;
    });
    document.title = (S.name || "") + " — " + (S.title || "Portfolio");
    initCarousel();
  }

  function initCarousel() {
    var root = document.getElementById("carousel");
    var slides = S.carousel || [];
    if (!root || !slides.length) return;
    var INTERVAL = 5000;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.style.setProperty("--interval", INTERVAL + "ms");

    root.innerHTML =
      '<div class="car-frame sq">' +
        slides.map(function (s, i) {
          return '<figure class="slide" aria-hidden="true"><img src="' + esc(s.src) + '" alt="' +
            esc(s.caption || "Slide " + (i + 1)) + '"' + (i ? ' loading="lazy"' : "") + "></figure>";
        }).join("") +
        '<button class="car-arrow prev glass" type="button" aria-label="Previous slide">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>' +
        '<button class="car-arrow next glass" type="button" aria-label="Next slide">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>' +
      "</div>" +
      '<div class="car-ui">' +
        '<div class="car-caption"><span class="car-count"></span><span class="car-text"></span></div>' +
        '<div class="car-dots" role="tablist">' +
          slides.map(function (s, i) {
            return '<button class="car-dot" type="button" aria-label="Go to slide ' + (i + 1) + '"><span></span></button>';
          }).join("") +
        "</div>" +
      "</div>";

    var figs = root.querySelectorAll(".slide");
    var dots = root.querySelectorAll(".car-dot");
    var count = root.querySelector(".car-count");
    var text = root.querySelector(".car-text");
    var cur = -1, timer = null, paused = false;

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function go(i) {
      i = (i + slides.length) % slides.length;
      if (cur >= 0) {
        figs[cur].classList.remove("is-active"); figs[cur].setAttribute("aria-hidden", "true");
        dots[cur].classList.remove("is-active");
      }
      // restart the progress animation
      void dots[i].offsetWidth;
      figs[i].classList.add("is-active"); figs[i].removeAttribute("aria-hidden");
      dots[i].classList.add("is-active");
      count.textContent = pad(i + 1) + " / " + pad(slides.length);
      text.textContent = slides[i].caption || "";
      cur = i;
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (!paused && !reduce && slides.length > 1) timer = setTimeout(function () { go(cur + 1); }, INTERVAL);
    }
    function setPaused(p) {
      paused = p;
      root.classList.toggle("is-paused", p);
      if (p) clearTimeout(timer); else schedule();
    }

    root.querySelector(".prev").addEventListener("click", function () { go(cur - 1); });
    root.querySelector(".next").addEventListener("click", function () { go(cur + 1); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    root.addEventListener("mouseenter", function () { setPaused(true); });
    root.addEventListener("mouseleave", function () { setPaused(false); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
    });
    document.addEventListener("visibilitychange", function () { setPaused(document.hidden); });

    // swipe on touch screens
    var x0 = null;
    root.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    go(0);
  }

  /* ---------- category grid ---------- */
  function initWorks() {
    var cat = param("cat");
    if (!CATS[cat]) cat = "3d";
    var list = items.filter(function (it) { return it.cat === cat; });
    document.title = CATS[cat].title + " — " + (S.name || "Portfolio");
    document.getElementById("page-eyebrow").textContent = "Index / " + CATS[cat].label;
    document.getElementById("page-title").textContent = CATS[cat].title;
    document.getElementById("page-meta").textContent = list.length + (list.length === 1 ? " work" : " works");

    var grid = document.getElementById("grid");
    if (!list.length) {
      grid.outerHTML = '<div class="wrap"><p class="empty sq">Works will be added soon.</p></div>';
      return;
    }
    grid.innerHTML = list.map(function (it, i) {
      return '<a class="card reveal" style="--i:' + (i % 3) + '" href="view.html?id=' + encodeURIComponent(it.id) + '">' +
        '<div class="card-thumb sq">' +
          (it.thumb ? '<img src="' + esc(it.thumb) + '" alt="" loading="lazy">' : "") +
          '<span class="badge glass">' + (TYPE_LABEL[it.type] || "") + "</span>" +
        "</div>" +
        '<div class="card-meta">' +
          '<h2 class="card-title">' + esc(it.title) + ' <span class="card-arrow" aria-hidden="true">→</span></h2>' +
          '<span class="card-year">' + esc(it.year) + "</span>" +
        "</div>" +
      "</a>";
    }).join("");
  }

  /* ---------- detail view ---------- */
  function initView() {
    var it = findItem(param("id"));
    var head = document.getElementById("view-head");
    var stage = document.getElementById("view-stage");
    var desc = document.getElementById("view-desc");

    if (!it) {
      document.getElementById("view-title").textContent = "Not found";
      stage.innerHTML = '<p class="stage-note sq">This work does not exist.</p>';
      return;
    }
    var c = CATS[it.cat] || { label: "", title: "" };
    document.title = it.title + " — " + (S.name || "Portfolio");
    head.querySelector(".back-link").setAttribute("href", "works.html?cat=" + it.cat);
    head.querySelector(".back-link").textContent = "← " + c.label;
    document.getElementById("view-title").textContent = it.title;
    document.getElementById("view-meta").textContent = [it.year, TYPE_LABEL[it.type]].filter(Boolean).join(" · ");
    desc.textContent = it.description || "";

    var html = "";
    if (it.type === "model") {
      if (it.src) {
        loadModelViewer();
        html = '<model-viewer class="sq" src="' + esc(it.src) + '"' +
          (it.thumb ? ' poster="' + esc(it.thumb) + '"' : "") +
          ' alt="' + esc(it.title) + '" camera-controls auto-rotate auto-rotate-delay="1500"' +
          ' rotation-per-second="18deg" shadow-intensity="1" exposure="1" environment-image="neutral"' +
          ' interaction-prompt="auto" touch-action="pan-y"></model-viewer>';
      } else {
        html = '<p class="stage-note sq">3D model will be added soon.<br>Drag to rotate · Scroll to zoom</p>';
      }
    } else if (it.type === "pdf") {
      if (it.src) {
        html = '<iframe class="pdf-frame sq" src="' + esc(it.src) + '#view=FitH" title="' + esc(it.title) + '"></iframe>' +
          '<div class="stage-actions"><a class="btn" href="' + esc(it.src) + '" target="_blank" rel="noopener">OPEN PDF ↗</a></div>';
      } else {
        html = '<p class="stage-note sq">PDF will be added soon.</p>';
      }
    } else {
      var srcs = [].concat(it.src || []);
      html = srcs.length
        ? '<div class="image-stack">' + srcs.map(function (s, i) {
            return '<img class="sq reveal" src="' + esc(s) + '" alt="' + esc(it.title) + " " + (i + 1) + '"' + (i ? ' loading="lazy"' : "") + ">";
          }).join("") + "</div>"
        : '<p class="stage-note sq">Images will be added soon.</p>';
    }
    stage.innerHTML = html;
  }

  function loadModelViewer() {
    if (customElements.get("model-viewer")) return;
    var s = document.createElement("script");
    s.type = "module";
    s.src = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.4.0/dist/model-viewer.min.js";
    document.head.appendChild(s);
  }

  /* ---------- MY INFO ---------- */
  function initInfo() {
    var p = S.profile || {};
    var c = S.contact || {};
    document.title = "My Info — " + (S.name || "Portfolio");
    document.getElementById("page-title").textContent = S.name || "My Info";

    var portrait = document.getElementById("portrait");
    if (p.photo) portrait.innerHTML = '<img src="' + esc(p.photo) + '" alt="' + esc(S.name) + '">';

    function rows(list) {
      return (list || []).map(function (r) {
        return '<div class="info-row"><span>' + esc(r.period) + "</span><span>" + esc(r.text) + "</span></div>";
      }).join("");
    }
    var contact = [];
    if (c.email) contact.push({ period: "Email", html: '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" });
    if (c.instagram) contact.push({ period: "Instagram", html: '<a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">' + esc(c.instagram.replace(/^https?:\/\//, "")) + "</a>" });
    if (c.behance) contact.push({ period: "Behance", html: '<a href="' + esc(c.behance) + '" target="_blank" rel="noopener">' + esc(c.behance.replace(/^https?:\/\//, "")) + "</a>" });

    document.getElementById("info-body").innerHTML =
      (p.statement ? '<p class="statement reveal">' + esc(p.statement) + "</p>" : "") +
      (p.education && p.education.length ? '<section class="info-block reveal"><h2>EDUCATION</h2>' + rows(p.education) + "</section>" : "") +
      (p.experience && p.experience.length ? '<section class="info-block reveal"><h2>EXPERIENCE</h2>' + rows(p.experience) + "</section>" : "") +
      (p.skills && p.skills.length ? '<section class="info-block reveal"><h2>TOOLS &amp; SKILLS</h2><div class="tags">' +
        p.skills.map(function (s) { return '<span class="tag">' + esc(s) + "</span>"; }).join("") + "</div></section>" : "") +
      (contact.length ? '<section class="info-block reveal"><h2>CONTACT</h2>' + contact.map(function (r) {
        return '<div class="info-row"><span>' + r.period + "</span><span>" + r.html + "</span></div>";
      }).join("") + "</section>" : "");
  }

  /* ---------- boot ---------- */
  renderHeader();
  renderFooter();
  if (page === "home") initHome();
  if (page === "works") initWorks();
  if (page === "view") initView();
  if (page === "info") initInfo();
  initReveal();
})();
