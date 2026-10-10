// Client behaviour for the whole site. Plain JS, no build step.
// Every feature looks for its own data-* hooks, so it is a no-op on pages without them.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var toggleClasses = function (el, add, remove) {
    remove.forEach(function (c) { el.classList.remove(c); });
    add.forEach(function (c) { el.classList.add(c); });
  };

  // ---- Live numbers (build output is only a fallback so these never go stale)
  function liveNumbers() {
    var now = new Date();
    var birth = new Date(2010, 0, 8);
    var age = now.getFullYear() - birth.getFullYear();
    var m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    $$("[data-age]").forEach(function (el) { el.textContent = age; });
    $$("[data-year]").forEach(function (el) { el.textContent = now.getFullYear(); });
  }

  // ---- Scroll reveal
  function reveal() {
    var elements = $$(".reveal-on-scroll");
    if (!elements.length) return;
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    elements.forEach(function (el) { observer.observe(el); });
  }

  // ---- Mobile menu
  function nav() {
    var header = $("[data-nav]");
    var toggle = $("[data-menu-toggle]");
    if (!header || !toggle) return;

    function setOpen(open) {
      header.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle.addEventListener("click", function () { setOpen(header.dataset.open !== "true"); });
    $$("[data-menu-link]").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.dataset.open === "true") setOpen(false);
    });
  }

  // ---- Project carousel
  var SLIDE_ON = ["opacity-100", "scale-100"];
  var SLIDE_OFF = ["pointer-events-none", "opacity-0", "scale-[1.02]"];
  var DOT_ON = ["w-6", "bg-red"];
  var DOT_OFF = ["w-1.5", "bg-fg/40", "hover:bg-fg"];
  var THUMB_ON = ["border-red", "opacity-100"];
  var THUMB_OFF = ["border-line", "opacity-60", "hover:opacity-100"];

  function carousel(root) {
    var slides = $$("[data-slide]", root);
    var dots = $$("[data-dot]", root);
    var thumbs = $$("[data-thumb]", root);
    var region = $('[role="region"]', root);
    var interval = parseInt(root.dataset.interval || "5000", 10);
    var current = 0;
    var paused = false;
    var timer = null;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        var on = n === current;
        toggleClasses(s, on ? SLIDE_ON : SLIDE_OFF, on ? SLIDE_OFF : SLIDE_ON);
        s.setAttribute("aria-hidden", String(!on));
      });
      dots.forEach(function (d, n) {
        var on = n === current;
        toggleClasses(d, on ? DOT_ON : DOT_OFF, on ? DOT_OFF : DOT_ON);
        d.setAttribute("aria-current", String(on));
      });
      thumbs.forEach(function (t, n) {
        var on = n === current;
        toggleClasses(t, on ? THUMB_ON : THUMB_OFF, on ? THUMB_OFF : THUMB_ON);
      });
    }

    function restart() {
      clearInterval(timer);
      if (reduceMotion || slides.length < 2) return;
      timer = setInterval(function () { if (!paused) show(current + 1); }, interval);
    }

    var next = $("[data-next]", root);
    var prev = $("[data-prev]", root);
    if (next) next.addEventListener("click", function () { show(current + 1); restart(); });
    if (prev) prev.addEventListener("click", function () { show(current - 1); restart(); });
    dots.concat(thumbs).forEach(function (el, n) {
      el.addEventListener("click", function () { show(n % slides.length); restart(); });
    });
    $$("[data-open-full]", root).forEach(function (el) {
      el.addEventListener("click", function () {
        var media = $("img, video", slides[current]);
        if (media) window.open(media.getAttribute("src"), "_blank");
      });
    });

    if (region) {
      region.addEventListener("mouseenter", function () { paused = true; });
      region.addEventListener("mouseleave", function () { paused = false; });
      region.addEventListener("focusin", function () { paused = true; });
      region.addEventListener("focusout", function () { paused = false; });
      region.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { show(current + 1); restart(); }
        if (e.key === "ArrowLeft") { show(current - 1); restart(); }
      });
    }
    restart();
  }

  // ---- Projects: filter by state + search, with ?q= kept in the URL
  var FILTER_ON = ["border-fg", "bg-fg", "text-ink"];
  var FILTER_OFF = ["border-line", "text-muted", "hover:border-fg/40", "hover:text-fg"];
  var COUNT_ON = ["text-ink/60"];
  var COUNT_OFF = ["text-subtle"];

  function projectsGrid(root) {
    var cards = $$("[data-project-card]", root);
    var buttons = $$("[data-filter]", root);
    var input = $("#project_search", root);
    var counter = $("[data-visible-count]", root);
    var empty = $("[data-empty]", root);
    var grid = $("[data-cards]", root);
    var filter = "all";

    input.value = new URLSearchParams(location.search).get("q") || "";

    function apply() {
      var q = input.value.trim().toLowerCase();
      var counts = { all: 0, finished: 0, working_on: 0, suspended: 0 };
      var visible = 0;

      cards.forEach(function (card) {
        var searched = !q || card.dataset.search.indexOf(q) !== -1;
        if (searched) {
          counts.all++;
          if (card.dataset.state in counts) counts[card.dataset.state]++;
        }
        var show = searched && (filter === "all" || card.dataset.state === filter);
        card.hidden = !show;
        if (show) visible++;
      });

      buttons.forEach(function (b) {
        var on = b.dataset.filter === filter;
        var count = $("[data-filter-count]", b);
        toggleClasses(b, on ? FILTER_ON : FILTER_OFF, on ? FILTER_OFF : FILTER_ON);
        toggleClasses(count, on ? COUNT_ON : COUNT_OFF, on ? COUNT_OFF : COUNT_ON);
        count.textContent = counts[b.dataset.filter];
        b.setAttribute("aria-pressed", String(on));
      });

      counter.textContent = visible;
      grid.hidden = visible === 0;
      empty.hidden = visible !== 0;

      var url = new URL(location.href);
      if (q) url.searchParams.set("q", input.value.trim());
      else url.searchParams.delete("q");
      history.replaceState(null, "", url);
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { filter = b.dataset.filter; apply(); });
    });
    input.addEventListener("input", apply);
    var clear = $("[data-clear-filters]", root);
    if (clear) clear.addEventListener("click", function () { input.value = ""; filter = "all"; apply(); });
    apply();
  }

  // ---- Contact form (posts to a Discord webhook)
  var WEBHOOK_URL =
    "https://discord.com/api/webhooks/1292491295042048010/eaIjIrqefDTWtxOdw38yN6a_kNAknPm1s1QldWOFgI0OgOcZ-xFFuk8HypZk-kAj2Moy";
  var MIN_LENGTH = 10;
  var MAX_LENGTH = 3000;

  function contactForm(form) {
    var email = $("#contact_email", form);
    var message = $("#contact_message", form);
    var emailHelp = $("[data-email-help]", form);
    var emailError = $("[data-email-error]", form);
    var messageError = $("[data-message-error]", form);
    var counter = $("[data-counter]", form);
    var sent = $("[data-status-sent]", form);
    var failed = $("[data-status-failed]", form);
    var submit = $("#contact_send_button", form);
    var label = $("[data-send-label]", form);
    var iconIdle = $("[data-icon-idle]", form);
    var iconBusy = $("[data-icon-busy]", form);
    var sending = false;

    function showError(el, input, text) {
      el.textContent = text || "";
      el.hidden = !text;
      input.setAttribute("aria-invalid", text ? "true" : "false");
      if (!text) input.removeAttribute("aria-invalid");
    }

    function updateCounter() {
      counter.textContent = message.value.length + " / " + MAX_LENGTH;
      counter.classList.toggle("text-red", message.value.length > MAX_LENGTH);
      counter.classList.toggle("text-subtle", message.value.length <= MAX_LENGTH);
    }
    message.addEventListener("input", updateCounter);

    function validate() {
      var ok = true;
      var emailText = "";
      var messageText = "";
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailText = "This doesn't look like an email address.";
        ok = false;
      }
      if (message.value.trim().length < MIN_LENGTH) {
        messageText = "Message is too short. Write at least " + MIN_LENGTH + " characters.";
        ok = false;
      } else if (message.value.length > MAX_LENGTH) {
        messageText = "Message is too long. Keep it under " + MAX_LENGTH + " characters.";
        ok = false;
      }
      showError(emailError, email, emailText);
      emailHelp.hidden = !!emailText;
      showError(messageError, message, messageText);
      return ok;
    }

    function setSending(on) {
      sending = on;
      submit.disabled = on;
      submit.classList.toggle("opacity-60", on);
      submit.classList.toggle("cursor-not-allowed", on);
      submit.classList.toggle("pointer-events-none", on);
      label.textContent = on ? "Sending" : "Send message";
      iconIdle.hidden = on;
      iconBusy.hidden = !on;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending || !validate()) return;
      sent.hidden = true;
      failed.hidden = true;
      setSending(true);

      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "New message at " + (form.dataset.place || "contact"),
            description: message.value,
            fields: [{ name: "Email left:", value: email.value || "No email provided", inline: true }],
            color: 0xff6c6c,
            timestamp: new Date().toISOString(),
            footer: { text: "Contact Form Submission" },
          }],
        }),
      }).then(function (response) {
        if (!response.ok) throw new Error("Discord webhook failed: " + response.status + " " + response.statusText);
        email.value = "";
        message.value = "";
        updateCounter();
        sent.hidden = false;
      }).catch(function (error) {
        console.error("Error sending message:", error);
        failed.hidden = false;
      }).then(function () {
        setSending(false);
      });
    });
  }

  function init() {
    liveNumbers();
    reveal();
    nav();
    $$("[data-carousel]").forEach(carousel);
    $$("[data-projects-grid]").forEach(projectsGrid);
    $$("[data-contact-form]").forEach(contactForm);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
