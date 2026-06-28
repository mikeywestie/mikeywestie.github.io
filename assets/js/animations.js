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
