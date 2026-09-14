/* ==========================================================================
   Himanshu Chandrakar — Portfolio interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add('loaded');
    }, 350);
  });
  // fallback in case 'load' already fired / is slow
  setTimeout(function () {
    if (preloader) preloader.classList.add('loaded');
  }, 2500);

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Navbar scroll state ---------- */
  var nav = document.querySelector('.site-nav');
  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Auto-collapse mobile nav on link click ---------- */
  var navCollapseEl = document.getElementById('navMenu');
  if (navCollapseEl && window.bootstrap) {
    var bsCollapse = new bootstrap.Collapse(navCollapseEl, { toggle: false });
    navCollapseEl.querySelectorAll('.nav-link-custom').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapseEl.classList.contains('show')) bsCollapse.hide();
      });
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Typed.js hero role ---------- */
  var typedEl = document.getElementById('typedRole');
  if (typedEl && window.Typed) {
    new Typed('#typedRole', {
      strings: [
        'Aspiring AI / ML Engineer',
        'Generative AI Explorer',
        'Deep Learning Practitioner',
        'Building LLM Applications',
        'RAG &amp; Agentic Systems'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1400,
      startDelay: 300,
      loop: true,
      smartBackspace: true
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var start = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var val = target < 100 && target % 1 !== 0
            ? (target * eased).toFixed(1)
            : Math.floor(target * eased);
          el.textContent = val + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Skill bar fill on scroll ---------- */
  var skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target.getAttribute('data-width') || '0%';
          entry.target.style.width = target;
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach(function (el) { skillObserver.observe(el); });
  }

  /* ---------- Project filter ---------- */
  var filterPills = document.querySelectorAll('.filter-pill');
  var projectCards = document.querySelectorAll('[data-category]');
  if (filterPills.length && projectCards.length) {
    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        filterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var filter = pill.getAttribute('data-filter');

        projectCards.forEach(function (card) {
          var cats = (card.getAttribute('data-category') || '').split(' ');
          var show = filter === 'all' || cats.indexOf(filter) !== -1;
          card.style.transition = 'opacity .35s ease, transform .35s ease';
          if (show) {
            card.style.display = '';
            requestAnimationFrame(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px) scale(.97)';
            setTimeout(function () { card.style.display = 'none'; }, 350);
          }
        });
      });
    });
  }

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('cf-name');
      var email = document.getElementById('cf-email');
      var subject = document.getElementById('cf-subject');
      var message = document.getElementById('cf-message');
      var valid = true;

      [name, email, message].forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() && !emailPattern.test(email.value.trim())) {
        email.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) return;

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loader-ring" style="display:inline-block;width:14px;height:14px;border:2px solid rgba(10,15,28,.35);border-top-color:var(--ink);border-radius:50%;margin-right:.5rem;"></span> Sending…';

      var mailBody = encodeURIComponent(
        message.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')'
      );
      var mailSubject = encodeURIComponent(subject.value.trim() || 'Portfolio contact from ' + name.value.trim());
      var mailtoLink = 'mailto:himanshuchandrakar465@gmail.com?subject=' + mailSubject + '&body=' + mailBody;

      setTimeout(function () {
        window.location.href = mailtoLink;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
        contactForm.style.display = 'none';
        var successPanel = document.getElementById('formSuccess');
        if (successPanel) successPanel.style.display = 'block';
      }, 900);
    });

    ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
      var field = document.getElementById(id);
      if (field) field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
      });
    });
  }

});
