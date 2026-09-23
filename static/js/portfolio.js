/*
  Shared portfolio behaviour
  --------------------------
  This file intentionally handles only small quality-of-life enhancements.
  The navigation, content, and contact details still work without JavaScript.
*/

document.addEventListener("DOMContentLoaded", function () {
  var page = document.documentElement;
  var themeButton = document.querySelector("[data-theme-toggle]");

  function preferredTheme() {
    var savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    page.dataset.theme = theme;

    if (!themeButton) return;
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    themeButton.innerHTML = isDark
      ? '<i class="bi bi-sun-fill" aria-hidden="true"></i><span>Light</span>'
      : '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i><span>Dark</span>';
  }

  applyTheme(preferredTheme());

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var nextTheme = page.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Adds a subtle visual separation once the page has been scrolled.
  var header = document.querySelector(".site-header");
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Close Bootstrap's mobile menu after choosing a page.
  var navigation = document.getElementById("siteNavigation");
  if (navigation && window.bootstrap) {
    navigation.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navigation.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(navigation).hide();
        }
      });
    });
  }

  // Reveal sections only when the browser supports the efficient observer API.
  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  // Project filters use real data attributes so categories remain easy to edit.
  var filters = document.querySelectorAll("[data-project-filter]");
  var projects = document.querySelectorAll("[data-project-category]");
  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      var category = filter.dataset.projectFilter;
      filters.forEach(function (button) { button.classList.remove("active"); });
      filter.classList.add("active");

      projects.forEach(function (project) {
        var categories = project.dataset.projectCategory.split(" ");
        var shouldShow = category === "all" || categories.includes(category);
        project.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  // The form prepares an email in the visitor's mail client. No message data is
  // silently sent to a third-party service.
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var subject = form.elements.subject.value.trim() || "Portfolio enquiry";
      var message = form.elements.message.value.trim();
      var body = message + "\n\nFrom: " + name + "\nReply to: " + email;
      var mailto = "mailto:himanshuchandrakar465@gmail.com?subject="
        + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
      document.querySelector("[data-form-success]").classList.add("is-visible");
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (year) {
    year.textContent = new Date().getFullYear();
  });
});
