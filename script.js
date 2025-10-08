// Theme toggle
(function initThemeToggle() {
  const themeToggleButton = document.getElementById('themeToggle');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || (!saved && prefersLight)) {
    document.documentElement.classList.add('light');
  }
  updateIcon();

  themeToggleButton?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon();
  });

  function updateIcon() {
    const isLight = document.documentElement.classList.contains('light');
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.textContent = isLight ? '🌞' : '🌓';
    btn.setAttribute('aria-pressed', String(isLight));
  }
})();

// Smooth scroll for in-page anchors
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.getAttribute('href')?.startsWith('#')) {
    const id = target.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Inject sample projects
const projects = [
  { title: 'Fast Static Site', desc: 'A minimal static site optimized for speed.' },
  { title: 'UI Components', desc: 'A small library of accessible UI components.' },
  { title: 'Data Viz', desc: 'Charts and visualizations with vanilla JS and SVG.' }
];

const grid = document.getElementById('projectGrid');
if (grid) {
  projects.forEach(({ title, desc }) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<h3>${title}</h3><p>${desc}</p><a class="button secondary" href="#contact">Learn more</a>`;
    grid.appendChild(card);
  });
}

// Contact form handling (fake submit)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();
  if (!name || !email || !message) {
    setStatus('Please fill out all fields.');
    return;
  }
  setStatus('Sending...');
  setTimeout(() => {
    setStatus('Thanks! I will get back to you soon.');
    form.reset();
  }, 700);
});

function setStatus(text) {
  if (statusEl) statusEl.textContent = text;
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());


