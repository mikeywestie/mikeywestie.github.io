/* Scroll-reveal + monitor-bar fill.
   Adds `.reveal` to below-the-fold blocks and toggles `.in-view` as they enter
   the viewport (with a small per-group stagger). All visual states live in the
   stylesheet behind a prefers-reduced-motion guard; this script bails out
   entirely when the user prefers reduced motion, leaving content fully visible. */
(function () {
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  var root = document.documentElement;
  root.classList.add("js-reveal");

  var SELECTOR =
    ".workbench-card, .mini-card, .note-card, .section-header, .journey-step, .thought-slide, .cert-card";
  var items = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
  if (!items.length) return;

  // Tag each target and stagger siblings that share a parent.
  var counts = new Map();
  items.forEach(function (el) {
    el.classList.add("reveal");
    var parent = el.parentElement;
    var n = counts.get(parent) || 0;
    el.style.transitionDelay = Math.min(n * 70, 280) + "ms";
    counts.set(parent, n + 1);
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---------------------------------------------------------------------------
   Hamburger / mobile nav toggle
   --------------------------------------------------------------------------- */
(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  function close() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }

  toggle.addEventListener("click", function () {
    var opening = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", opening ? "true" : "false");
    toggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") close();
  });

  document.addEventListener("click", function (e) {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) close();
  });
})();

/* ---------------------------------------------------------------------------
   Thoughts carousel — prev / next arrow buttons
   --------------------------------------------------------------------------- */
(function () {
  var carousels = document.querySelectorAll(".thoughts-carousel");
  carousels.forEach(function (carousel) {
    var wrap = carousel.closest(".thoughts-carousel-wrap");
    if (!wrap) return;
    var prev = wrap.querySelector(".carousel-prev");
    var next = wrap.querySelector(".carousel-next");
    function scrollAmt() {
      var slide = carousel.querySelector(".thought-slide");
      return slide ? slide.offsetWidth + 16 : 300;
    }
    if (prev) prev.addEventListener("click", function () { carousel.scrollBy({ left: -scrollAmt(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { carousel.scrollBy({ left: scrollAmt(), behavior: "smooth" }); });
  });
})();

/* ---------------------------------------------------------------------------
   Back-to-top button
   --------------------------------------------------------------------------- */
(function () {
  var btn = document.getElementById("btnTop");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

/* Contact form — mailto bridge */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("cName") || {}).value || "";
      var email = (document.getElementById("cEmail") || {}).value || "";
      var subject = (document.getElementById("cSubject") || {}).value || "Portfolio Contact";
      var message = (document.getElementById("cMessage") || {}).value || "";
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
      window.location.href =
        "mailto:michaelwestman43@yahoo.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }
})();
