(function () {
  var selector = "#about > .wrap, #experience > .wrap, #contact > .wrap, #education > .wrap > h2, #testimonials > .wrap > h2, .card, .quote";

  function show(el) {
    el.classList.add("is-visible");
  }

  function showAll() {
    document.querySelectorAll(selector).forEach(show);
  }

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.querySelectorAll(".cards").forEach(function (grid) {
      grid.querySelectorAll(":scope > .card").forEach(function (card, index) {
        card.style.setProperty("--reveal-delay", (index % 3) * 70 + "ms");
      });
    });

    document.querySelectorAll(".quotes").forEach(function (grid) {
      grid.querySelectorAll(":scope > .quote").forEach(function (quote, index) {
        quote.style.setProperty("--reveal-delay", index * 80 + "ms");
      });
    });

    if (typeof window.IntersectionObserver !== "function") {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0 });

    document.querySelectorAll(selector).forEach(function (el) {
      observer.observe(el);
    });
  } catch (err) {
    showAll();
  }
})();
