document.addEventListener('DOMContentLoaded', () => {
    // Set the current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  
    // Responsive nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    navToggle && navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (mainNav) {
        if (expanded) {
          mainNav.style.display = 'none';
        } else {
          mainNav.style.display = 'flex';
        }
      }
    });
  
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close nav on mobile
          if (window.innerWidth <= 640 && mainNav) {
            mainNav.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  
    // Form submit (using Formspree or similar)
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        note.textContent = 'Sending…';
        const data = new FormData(form);
        try {
          const resp = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
          });
          if (resp.ok) {
            note.textContent = 'Thank you — your message was sent!';
            form.reset();
          } else {
            const result = await resp.json().catch(() => ({}));
            note.textContent = result.error || 'Oops! Something went wrong.';
          }
        } catch (error) {
          note.textContent = 'Network error — please try again later.';
        }
      });
    }
  });
  