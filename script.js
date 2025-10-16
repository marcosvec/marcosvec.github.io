const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebarToggle) {
  sidebarToggle.innerHTML = `
    <div class="hamburger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  `;
}

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

document.addEventListener('click', (e) => {
  if (sidebar && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (sidebar) {
      sidebar.classList.remove('open');
    }
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

  function updateIcons() {
    const isLight = document.documentElement.classList.contains('light');
    const icon = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    if (themeToggleButton) {
      themeToggleButton.innerHTML = icon;
      themeToggleButton.setAttribute('aria-pressed', String(isLight));
    }
    
    if (persistentThemeToggle) {
      persistentThemeToggle.innerHTML = icon;
      persistentThemeToggle.setAttribute('aria-pressed', String(isLight));
    }
  }
})();

const contactModal = document.getElementById('contactModal');
const contactLinks = document.querySelectorAll('#contactLink, #contactBtn, a[href="#contact"]');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (modalClose && contactModal) {
  modalClose.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

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

const projects = [
  { 
    title: 'Interactive 3D Room', 
    desc: 'A fully interactive 3D dorm room built with Three.js featuring real-time furniture interactions and measurement tools.',
    links: [
      { text: 'Learn more', href: 'projects.html#interactive-3d-room', icon: 'fas fa-info-circle' },
      { text: 'Visit', href: 'interactive-room.html', icon: 'fas fa-external-link-alt' }
    ]
  },
  { 
    title: 'CAD Modeling Projects', 
    desc: 'Complex mechanical and aerospace engineering projects created using Siemens NX and SolidWorks.',
    links: [
      { text: 'Learn more', href: 'projects.html#cad-modeling', icon: 'fas fa-info-circle' }
    ]
  },
  { 
    title: 'Performance Optimization', 
    desc: 'Advanced web performance techniques achieving 44% faster loading times and 47% reduced memory usage.',
    links: [
      { text: 'Learn more', href: 'projects.html#performance-optimization', icon: 'fas fa-info-circle' }
    ]
  }
];

const grid = document.getElementById('projectGrid');
if (grid) {
  projects.forEach(({ title, desc, links }) => {
    const card = document.createElement('article');
    card.className = 'card';
    
    const linksHTML = links.map(link => 
      `<a class="button secondary" href="${link.href}">
        <i class="${link.icon}"></i>
        ${link.text}
      </a>`
    ).join('');
    
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${linksHTML}
      </div>
    `;
    grid.appendChild(card);
  });
}

const statusEl = document.getElementById('formStatus');

if (contactForm && statusEl) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    
    if (!name || !email || !message) {
      setStatus('Please fill out all fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }
    
    if (message.length < 10) {
      setStatus('Message must be at least 10 characters long.', 'error');
      return;
    }
    
    setStatus('Sending...', 'info');
    
    setTimeout(() => {
      setStatus('Thanks! I will get back to you soon.', 'success');
      contactForm.reset();
      
      setTimeout(() => {
        if (contactModal) {
          contactModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 2000);
    }, 700);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function setStatus(text, type = 'info') {
  if (!statusEl) return;
  
  statusEl.textContent = text;
  statusEl.className = `status-${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = '';
    }, 5000);
  }
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

let persistentIcons = document.querySelector('.persistent-icons');
let floatingName = document.getElementById('floatingName');
let lastScrollY = 0;
let momentum = 0;
let deceleration = 0;
let isInitializing = true;

function initializeScrollEffects() {
  const aboutCards = document.querySelectorAll('.about-card');
  const cards = document.querySelectorAll('.card');
  
  if (aboutCards.length === 0 && cards.length === 0) {
    setTimeout(initializeScrollEffects, 50);
    return;
  }
  
  const scrollY = window.scrollY;
  
  aboutCards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    card.style.transform = `translateY(${baseOffset}px)`;
  });
  
  cards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    card.style.transform = `translateY(${baseOffset}px)`;
  });
  
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

function animateDeceleration() {
  if (Math.abs(deceleration) > 0.1) {
    deceleration *= 0.95;
    
    const aboutCards = document.querySelectorAll('.about-card');
    const cards = document.querySelectorAll('.card');
    
    aboutCards.forEach((card, index) => {
      const currentTransform = card.style.transform || 'translateY(0px)';
      const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
      card.style.transform = `translateY(${currentY + deceleration * 0.5}px)`;
    });
    
    cards.forEach((card, index) => {
      const currentTransform = card.style.transform || 'translateY(0px)';
      const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
      card.style.transform = `translateY(${currentY + deceleration * 0.5}px)`;
    });
    
    requestAnimationFrame(animateDeceleration);
  }
}

window.addEventListener('scroll', () => {
  if (isInitializing) return;
  
  const scrollY = window.scrollY;
  const scrollDelta = scrollY - lastScrollY;
  
  momentum = momentum * 0.9 + scrollDelta * 0.1;
  deceleration = scrollDelta * 0.2;
  
  if (floatingName) {
    if (scrollY > 700) {
      floatingName.classList.add('visible');
    } else {
      floatingName.classList.remove('visible');
    }
  }
  
  const aboutCards = document.querySelectorAll('.about-card');
  const cards = document.querySelectorAll('.card');
  
  aboutCards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    const cardOffset = scrollY * 0.02 + momentum * (0.35 + index * 0.1);
    card.style.transform = `translateY(${baseOffset + cardOffset}px)`;
  });
  
  cards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    const cardOffset = scrollY * 0.02 + momentum * (0.35 + index * 0.1);
    card.style.transform = `translateY(${baseOffset + cardOffset}px)`;
  });
  
  lastScrollY = scrollY;
  
  if (Math.abs(scrollDelta) > 0) {
    requestAnimationFrame(animateDeceleration);
  }
  
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

function runInitialization() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollEffects);
  } else {
    initializeScrollEffects();
  }
}

runInitialization();
