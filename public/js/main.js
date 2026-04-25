/* ============================================================================
   SHAHI GROUP — motion & interaction
   Lenis smooth scroll + GSAP ScrollTrigger + IntersectionObserver
   ============================================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Wait for Lenis + GSAP to hydrate from CDN (defer attribute already used).
  document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion) initSmoothScroll();
    initNavScrollState();
    initMobileMenu();
    initRevealObserver();
    initCounters();
    initContactForm();

    if (!prefersReducedMotion) {
      // Wait a tick so Lenis has registered with ScrollTrigger before we add triggers.
      requestAnimationFrame(() => {
        initHeroMotion();
        initAboutParallax();
      });
      animateHeroIn();
    } else {
      // No motion: still ensure hero text is visible.
      document.querySelectorAll('.hero [data-line] > span, .hero__sub, .hero__cta').forEach((el) => {
        el.style.transform = 'none';
        el.style.opacity = '1';
      });
    }
  });

  /* --------------------------------------------------------------------------
     Smooth scroll (Lenis) + GSAP/ScrollTrigger sync
     -------------------------------------------------------------------------- */
  let lenis = null;

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Bridge to GSAP ScrollTrigger if available.
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Anchor link interception → smooth-scroll via Lenis.
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -60 });
      // Close mobile menu if open
      document.getElementById('mobile-menu')?.classList.remove('is-open');
      document.querySelector('.nav__burger')?.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  /* --------------------------------------------------------------------------
     Hero motion — parallax, Ken Burns scale, text stagger
     -------------------------------------------------------------------------- */
  function initHeroMotion() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const hero = document.querySelector('.hero');
    const media = document.querySelector('[data-hero-media]');
    if (!hero || !media) return;

    // Parallax + scale tied to hero scroll progress
    gsap.to(media, {
      yPercent: -18,
      scale: 1.18,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    // Vignette fade as you scroll past
    const vignette = hero.querySelector('.hero__vignette');
    if (vignette) {
      gsap.to(vignette, {
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }

  function animateHeroIn() {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero [data-line] > span',
      { y: 0, duration: 1.05, stagger: 0.12, delay: 0.2 }
    )
    .to('.hero__sub',
      { y: 0, opacity: 1, duration: 0.9 }, '-=0.6'
    )
    .to('.hero__cta',
      { y: 0, opacity: 1, duration: 0.85 }, '-=0.55'
    );
  }

  /* --------------------------------------------------------------------------
     About — subtle parallax on portrait + band image
     -------------------------------------------------------------------------- */
  function initAboutParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const strength = parseFloat(el.dataset.parallax) || 0.1;
      const img = el.querySelector('img') || el;
      gsap.fromTo(img,
        { yPercent: -strength * 100 },
        {
          yPercent: strength * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    });

    const bandImg = document.querySelector('.about__band img');
    if (bandImg) {
      gsap.fromTo(bandImg,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about__band',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }
  }

  /* --------------------------------------------------------------------------
     Reveal-on-scroll for [data-reveal] elements (vanilla observer)
     -------------------------------------------------------------------------- */
  function initRevealObserver() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------------------------
     Animated counters
     -------------------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const fmt = (n) => n.toLocaleString('en-IN');

    const animate = (el) => {
      const target = parseFloat(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const t0 = performance.now();

      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(eased * target);
        el.textContent = fmt(value) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target) + suffix;
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------------------------
     Nav — scrolled state
     -------------------------------------------------------------------------- */
  function initNavScrollState() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 24);
      lastY = y;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* --------------------------------------------------------------------------
     Mobile menu
     -------------------------------------------------------------------------- */
  function initMobileMenu() {
    const burger = document.querySelector('.nav__burger');
    const menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    const close = () => {
      burger.classList.remove('is-open');
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lenis?.start();
    };

    const toggle = () => {
      const open = !menu.classList.contains('is-open');
      burger.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) lenis?.stop(); else lenis?.start();
    };

    burger.addEventListener('click', toggle);
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });
  }

  /* --------------------------------------------------------------------------
     Contact form — fetch POST → status feedback
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = form.querySelector('.contact__status');
    const submit = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Native validation
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in the required fields.';
        status.classList.remove('is-ok');
        status.classList.add('is-err');
        form.reportValidity();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      status.textContent = 'Sending…';
      status.classList.remove('is-ok', 'is-err');
      submit.disabled = true;

      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const out = await res.json();
        if (res.ok && out.ok) {
          status.textContent = out.message || 'Thanks — we will be in touch shortly.';
          status.classList.add('is-ok');
          form.reset();
        } else {
          status.textContent = out.message || 'Something went wrong. Please try again.';
          status.classList.add('is-err');
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again or email us directly.';
        status.classList.add('is-err');
      } finally {
        submit.disabled = false;
      }
    });
  }
})();
