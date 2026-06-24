/* ── SVG ANIMATION ON LOAD ── */
(function initSvgAnimation() {
  const entries = [
    { id: 'km-low',      delay: 200,  duration: 1500 },
    { id: 'km-high',     delay: 500,  duration: 1500 },
    { id: 'hr-trace',    delay: 1900, duration: 1100 },
    { id: 'spo2-trace',  delay: 2200, duration: 1100 },
  ];

  entries.forEach(({ id, delay, duration }) => {
    const el = document.getElementById(id);
    if (!el) return;

    const length = el.getTotalLength();
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;
    el.style.transition = 'none';

    setTimeout(() => {
      el.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      el.style.strokeDashoffset = '0';
    }, delay);
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${i * 80}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ── NAV HAMBURGER ── */
(function initNav() {
  const btn   = document.querySelector('.nav-hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── ACTIVE NAV LINK ON SCROLL ── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('active'));
          const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();
