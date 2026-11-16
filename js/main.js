document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const navToggle = document.querySelector('.nav-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');

  if (navToggle && primaryNavigation) {
    const closeNavigation = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
      primaryNavigation.classList.remove('is-open');
    };

    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
      primaryNavigation.classList.toggle('is-open', !isExpanded);
    });

    primaryNavigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        closeNavigation();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNavigation();
        navToggle.focus();
      }
    });

    window.matchMedia('(min-width: 981px)').addEventListener('change', (event) => {
      if (event.matches) {
        closeNavigation();
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formStatus.style.color = '#2d6a4f';
      formStatus.textContent = 'Submitting inquiry...';

      // Capture Form Data
      const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        category: document.getElementById('category').value,
        productInterest: document.getElementById('productInterest') ? document.getElementById('productInterest').value : '',
        message: document.getElementById('message').value,
        submittedAt: new Date().toISOString()
      };

      try {
        /*
         * Integration Note:
         * To submit leads directly into HubSpot CRM, replace the webhook Endpoint below
         * with your HubSpot Form API Endpoint URL:
         * https://api.hsforms.com/submissions/v3/integration/submit/PORTAL_ID/FORM_GUID
        */

        // Simulating API POST Request
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // Success state
        formStatus.style.color = '#1b4332';
        formStatus.textContent = 'Thank you! Your inquiry has been received. Our sales team will reach out shortly.';
        contactForm.reset();

      } catch (error) {
        console.error('Submission error:', error);
        formStatus.style.color = '#d90429';
        formStatus.textContent = 'Submission failed. Please email sales@evolexfoods.com directly.';
      }
    });
  }

  // Dynamic copyright year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Scroll reveal animation observer
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  // Navbar scroll shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onNavScroll = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  // Back-to-top button (injected dynamically)
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  // Re-run lucide to render the dynamically added arrow-up icon
  if (window.lucide) window.lucide.createIcons();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

});