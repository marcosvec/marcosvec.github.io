const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

function setSidebar(open) {
  if (!sidebar || !sidebarToggle) return;
  sidebar.classList.toggle('open', open);
  sidebar.toggleAttribute('inert', !open);
  sidebarToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  sidebarToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('nav-open', open);
}

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    setSidebar(!sidebar.classList.contains('open'));
  });
}

document.addEventListener('click', (e) => {
  if (!sidebar || !sidebar.classList.contains('open') || !sidebarToggle) return;
  if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
    setSidebar(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
    setSidebar(false);
    sidebarToggle.focus();
  }
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    setSidebar(false);
  });
});

(function applyThemeImmediately() {
  const saved = localStorage.getItem('theme');
  const currentClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  
  const isFileProtocol = window.location.protocol === 'file:';
  if (isFileProtocol) {
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark')) {
    if (urlTheme === 'light') {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  } else if (saved === 'light') {
    document.documentElement.classList.add('light');
  } else if (saved === 'dark') {
    document.documentElement.classList.remove('light');
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  const finalClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
})();

document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme');
  const currentClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  
  if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark')) {
  } else {
    if (saved === 'light') {
      document.documentElement.classList.add('light');
    } else if (saved === 'dark') {
      document.documentElement.classList.remove('light');
    }
  }
  
  const finalClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});

(function initThemeToggle() {
  const themeToggleButton = document.getElementById('themeToggle');
  const persistentThemeToggle = document.getElementById('persistentThemeToggle');
  
  if (!themeToggleButton && !persistentThemeToggle) return;

  const moonIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.4 2.4a9 9 0 1 0 7.2 12.8A7.4 7.4 0 0 1 14.4 2.4z"/></svg>';
  const sunIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" fill="currentColor"/><path fill="currentColor" d="M11 1h2v3h-2zm0 19h2v3h-2zM1 11h3v2H1zm19 0h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4zM4.2 18.4l2.1-2.1 1.4 1.4-2.1 2.1zm12.1-12.1 2.1-2.1 1.4 1.4-2.1 2.1z"/></svg>';

  function updateIcons() {
    const isLight = document.documentElement.classList.contains('light');
    const icon = isLight ? sunIcon : moonIcon;
    const label = isLight ? 'Switch to dark theme' : 'Switch to light theme';

    [themeToggleButton, persistentThemeToggle].forEach(button => {
      if (!button) return;
      button.innerHTML = icon;
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });
  }

  updateIcons();

  [themeToggleButton, persistentThemeToggle].forEach(button => {
    if (button) {
      button.addEventListener('click', () => {
        const beforeClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        const themeValue = isLight ? 'light' : 'dark';
        const afterClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        
        localStorage.setItem('theme', themeValue);
        
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
          const url = new URL(window.location.href);
          url.searchParams.set('theme', themeValue);
          window.history.replaceState(null, null, url.href);
        }
        
        updateIcons();
        updateNavigationLinks(themeValue);
      });
    }
  });
  
  function updateNavigationLinks(themeValue) {
    const isFileProtocol = window.location.protocol === 'file:';
    if (isFileProtocol) {
      const links = document.querySelectorAll('a[href$=".html"]');
      links.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('theme', themeValue);
        link.href = url.href;
      });
      
      const homeLink = document.getElementById('homeLink');
      if (homeLink && homeLink.href.includes('index.html')) {
        const url = new URL(homeLink.href);
        url.searchParams.set('theme', themeValue);
        homeLink.href = url.href;
      }
    }
  }

})();

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.getAttribute('href')?.startsWith('#')) {
    const href = target.getAttribute('href');
    if (href !== '#contact') {
      const id = href.slice(1);
      const section = document.getElementById(id);
      if (section) {
        e.preventDefault();
        const offset = id === 'about' ? -100 : 0;
        const targetPosition = section.offsetTop + offset;
        
        window.history.pushState(null, null, href);
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
});

const cardIcons = {
  info: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
  external: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 3h7v7h-2.2V6.6l-9.1 9.1-1.6-1.6 9.1-9.1H14V3zM5.2 5H11v2.2H7.2v9.6h9.6V13H19v5.8c0 .7-.5 1.2-1.2 1.2H5.2C4.5 20 4 19.5 4 18.8V6.2C4 5.5 4.5 5 5.2 5z"/></svg>',
  github: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .5C5.37.5.5 5.37.5 12a11.5 11.5 0 0 0 7.86 10.91c.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.17-3.09-.12-.29-.5-1.46.12-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.37 18.63.5 12 .5z"/></svg>'
};

const projects = [
  {
    title: 'BikeSuite',
    desc: 'A browser-based demo of shop software for independent bike shops. Work orders, point of sale, inventory, and customers, using seeded data in the browser.',
    links: [
      { text: 'Live demo', href: 'https://bikesuite.marcosvec.com', icon: 'external', external: true },
      { text: 'Source', href: 'https://github.com/marcosvec/bikesuite', icon: 'github', external: true },
      { text: 'BikeSuite details', href: 'projects.html#bikesuite', icon: 'info' }
    ]
  },
  {
    title: 'Autonomous Boat: Propulsion Lead',
    desc: 'Introduction to Engineering Design team project at RPI, Spring 2026. Led propulsion and steering and designed a custom thruster mount in Siemens NX.',
    links: [
      { text: 'Boat project details', href: 'projects.html#autonomous-boat', icon: 'info' }
    ]
  },
  {
    title: 'CertBuddy',
    desc: 'A cannabis COA lookup app. Still in progress, with no public demo yet.',
    status: 'In progress',
    links: [
      { text: 'CertBuddy details', href: 'projects.html#certbuddy', icon: 'info' }
    ]
  }
];

const grid = document.getElementById('projectGrid');
if (grid) {
  projects.forEach(({ title, desc, links, status }) => {
    const card = document.createElement('article');
    card.className = 'card';

    const statusHTML = status ? `<p class="status-pill">${status}</p>` : '';
    const linksHTML = (links || []).map(link => {
      const external = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const hint = link.external ? '<span class="sr-only"> (opens in a new tab)</span>' : '';
      return `<a class="button secondary" href="${link.href}"${external}>${cardIcons[link.icon] || ''}${link.text}${hint}</a>`;
    }).join('');
    const actionsHTML = linksHTML ? `<div class="card-actions">${linksHTML}</div>` : '';

    card.innerHTML = `
      <h3>${title}</h3>
      ${statusHTML}
      <p>${desc}</p>
      ${actionsHTML}
    `;
    grid.appendChild(card);
  });
}



const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      if (entry.target.classList.contains('about-content')) {
        const paragraphs = entry.target.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            p.classList.add('visible');
          }, index * 200);
        });
      }
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');
  const aboutCards = document.querySelectorAll('.about-card');
  
  sections.forEach(section => observer.observe(section));
  cards.forEach(card => observer.observe(card));
  aboutCards.forEach(card => observer.observe(card));
});

let floatingName = document.getElementById('floatingName');
let lastScrollY = 0;
let momentum = 0;
let isInitializing = true;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initializeScrollEffects() {
  const aboutCards = document.querySelectorAll('.about-card');
  const cards = document.querySelectorAll('.card');
  
  if (aboutCards.length === 0 && cards.length === 0) {
    setTimeout(initializeScrollEffects, 50);
    return;
  }
  
  const scrollY = window.scrollY;
  
  if (!isMobile && !prefersReducedMotion) {
    aboutCards.forEach((card, index) => {
      const baseOffset = getBaseOffset(card, index);
      card.style.transform = `translateY(${baseOffset}px)`;
    });
    
    cards.forEach((card, index) => {
      const baseOffset = getBaseOffset(card, index);
      card.style.transform = `translateY(${baseOffset}px)`;
    });
  } else {
    aboutCards.forEach((card) => {
      card.style.transform = 'none';
    });
    
    cards.forEach((card) => {
      card.style.transform = 'none';
    });
  }
  
  if (floatingName) {
    if (scrollY > 700) {
      floatingName.classList.add('visible');
    } else {
      floatingName.classList.remove('visible');
    }
  }
  
  lastScrollY = scrollY;
  
  setTimeout(() => {
    isInitializing = false;
  }, 100);
}

function getBaseOffset(element, index) {
  if (element.classList.contains('about-card')) {
    return index === 0 ? 30 : index === 1 ? 0 : -30;
  } else if (element.classList.contains('card')) {
    return index === 0 ? 20 : index === 1 ? -20 : 10;
  }
  return 0;
}

function updateScrollSpy(scrollY) {
  const scrollPosition = scrollY + 100;
  let currentId = '';

  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentId = section.getAttribute('id') || '';
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return;
    const active = href === `#${currentId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function onScroll() {
  if (isInitializing) return;

  const scrollY = window.scrollY;
  const scrollDelta = scrollY - lastScrollY;

  if (floatingName) {
    floatingName.classList.toggle('visible', scrollY > 700);
  }

  if (!isMobile && !prefersReducedMotion) {
    momentum = momentum * 0.9 + scrollDelta * 0.1;

    const shiftCards = (selector) => {
      document.querySelectorAll(selector).forEach((card, index) => {
        const baseOffset = getBaseOffset(card, index);
        const cardOffset = scrollY * 0.02 + momentum * (0.35 + index * 0.1);
        card.style.transform = `translateY(${baseOffset + cardOffset}px)`;
      });
    };

    shiftCards('.about-card');
    shiftCards('.card');
  }

  lastScrollY = scrollY;
  updateScrollSpy(scrollY);
}

let scrollScheduled = false;
window.addEventListener('scroll', () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => {
    scrollScheduled = false;
    onScroll();
  });
}, { passive: true });

function runInitialization() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollEffects);
  } else {
    initializeScrollEffects();
  }
}

runInitialization();
