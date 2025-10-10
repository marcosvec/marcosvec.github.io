// ===============================================
// SIDEBAR FUNCTIONALITY
// ===============================================

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

// Create hamburger animation for sidebar toggle
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

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (sidebar && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

// Close sidebar when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  });
});

// ===============================================
// THEME TOGGLE (Both Sidebar and Persistent) - FIXED CROSS-PAGE
// ===============================================

// Apply theme immediately on script load (before DOM ready)
(function applyThemeImmediately() {
  const saved = localStorage.getItem('theme');
  const currentClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  console.log('🔍 Theme Debug - Script Load:');
  console.log('  - localStorage theme:', saved);
  console.log('  - Current DOM class:', currentClass);
  console.log('  - Page URL:', window.location.href);
  console.log('  - Protocol:', window.location.protocol);
  
  // Check if we're using file:// protocol (localStorage may not work)
  const isFileProtocol = window.location.protocol === 'file:';
  if (isFileProtocol) {
    console.log('⚠️ Using file:// protocol - localStorage may not persist between pages');
  }
  
  // Fallback: Check URL parameters for theme
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark')) {
    console.log('🔗 Found theme in URL parameters:', urlTheme);
    if (urlTheme === 'light') {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light'); // Sync localStorage with URL
      console.log('✅ Applied light theme from URL');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark'); // Sync localStorage with URL
      console.log('✅ Applied dark theme from URL');
    }
  } else if (saved === 'light') {
    document.documentElement.classList.add('light');
    console.log('✅ Applied light theme from localStorage');
  } else if (saved === 'dark') {
    document.documentElement.classList.remove('light');
    console.log('✅ Applied dark theme from localStorage');
  } else {
    // Only use device preference if no manual setting exists
    console.log('⚠️ No saved theme found, using device preference');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light'); // Save device preference
      console.log('⚠️ Applied light theme from device preference (no saved theme)');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark'); // Save device preference
      console.log('⚠️ Applied dark theme from device preference (no saved theme)');
    }
  }
  
  const finalClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  console.log('  - Final DOM class:', finalClass);
  console.log('  - localStorage after:', localStorage.getItem('theme'));
})();

// Also apply theme when DOM is ready (backup) - but don't override URL parameters
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme');
  const currentClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  console.log('🔍 Theme Debug - DOM Ready:');
  console.log('  - localStorage theme:', saved);
  console.log('  - Current DOM class:', currentClass);
  console.log('  - Page URL:', window.location.href);
  
  // Check if URL parameters already applied a theme
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  
  if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark')) {
    console.log('🔗 DOM Ready: URL parameter already applied theme, skipping localStorage');
  } else {
    // Only apply localStorage theme if no URL parameter
    if (saved === 'light') {
      document.documentElement.classList.add('light');
      console.log('✅ DOM Ready: Applied light theme from localStorage');
    } else if (saved === 'dark') {
      document.documentElement.classList.remove('light');
      console.log('✅ DOM Ready: Applied dark theme from localStorage');
    }
  }
  
  const finalClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  console.log('  - Final DOM class:', finalClass);
  console.log('  - localStorage after:', localStorage.getItem('theme'));
});

(function initThemeToggle() {
  const themeToggleButton = document.getElementById('themeToggle');
  const persistentThemeToggle = document.getElementById('persistentThemeToggle');
  
  if (!themeToggleButton && !persistentThemeToggle) return;
  
  // Theme is already applied by applyThemeImmediately() and DOMContentLoaded
  // Just update the icons to match current state
  updateIcons();

  // Handle both theme buttons
  [themeToggleButton, persistentThemeToggle].forEach(button => {
    if (button) {
      button.addEventListener('click', () => {
        const beforeClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        const themeValue = isLight ? 'light' : 'dark';
        const afterClass = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        
        localStorage.setItem('theme', themeValue);
        
        // Also add theme to URL parameters for file:// protocol fallback
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
          const url = new URL(window.location.href);
          url.searchParams.set('theme', themeValue);
          console.log('🔗 Added theme to URL for file:// protocol:', url.href);
          // Update the current page URL immediately
          window.history.replaceState(null, null, url.href);
          console.log('🔗 Updated current page URL:', window.location.href);
          console.log('  - Error Code: T005 - Current page URL updated with theme');
        }
        
        ConsoleWrapper.log('🔄 Theme Toggle Clicked:');
        ConsoleWrapper.log('  - Before:', beforeClass);
        ConsoleWrapper.log('  - After:', afterClass);
        ConsoleWrapper.log('  - localStorage set to:', themeValue);
        ConsoleWrapper.log('  - localStorage confirmed:', localStorage.getItem('theme'));
        ConsoleWrapper.log('  - Page URL:', window.location.href);
        ConsoleWrapper.log('  - Error Code: T001');
        
        // Check localStorage again after a short delay to see if it's being overwritten
        setTimeout(() => {
          const delayedCheck = localStorage.getItem('theme');
          console.log('🔍 Delayed localStorage check:', delayedCheck);
          if (delayedCheck !== themeValue) {
            console.error('❌ localStorage was overwritten! Expected:', themeValue, 'Got:', delayedCheck);
          }
        }, 100);
        
        updateIcons();
        updateNavigationLinks(themeValue);
        // Don't close sidebar when changing theme
      });
    }
  });
  
  // Update navigation links with theme parameter for file:// protocol
  function updateNavigationLinks(themeValue) {
    const isFileProtocol = window.location.protocol === 'file:';
    if (isFileProtocol) {
      const links = document.querySelectorAll('a[href$=".html"]');
      links.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('theme', themeValue);
        link.href = url.href;
      });
      
      // Special handling for Home button - ensure it gets theme parameter
      const homeLink = document.getElementById('homeLink');
      if (homeLink && homeLink.href.includes('index.html')) {
        const url = new URL(homeLink.href);
        url.searchParams.set('theme', themeValue);
        homeLink.href = url.href;
          ConsoleWrapper.log('🔗 Updated Home button with theme parameter:', homeLink.href);
          ConsoleWrapper.log('  - Error Code: T003');
      }
      
      ConsoleWrapper.log('🔗 Updated navigation links with theme parameter');
      ConsoleWrapper.log('  - Error Code: T004');
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

// ===============================================
// CONTACT MODAL
// ===============================================

const contactModal = document.getElementById('contactModal');
const contactLinks = document.querySelectorAll('#contactLink, #contactBtn, a[href="#contact"]');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

// Open modal
contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
if (modalClose && contactModal) {
  modalClose.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Close modal when clicking outside
if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===============================================
// SMOOTH SCROLL - FIXED ABOUT POSITION
// ===============================================

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.getAttribute('href')?.startsWith('#')) {
    const href = target.getAttribute('href');
    if (href !== '#contact') { // Skip contact links (they open modal)
      const id = href.slice(1);
      const section = document.getElementById(id);
      if (section) {
        e.preventDefault();
        // Fix About section scroll position
        const offset = id === 'about' ? -100 : 0; // Offset About section up
        const targetPosition = section.offsetTop + offset;
        
        // Update URL hash immediately
        window.history.pushState(null, null, href);
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
});

// ===============================================
// PROJECT CARDS
// ===============================================

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

// ===============================================
// CONTACT FORM HANDLING
// ===============================================

const statusEl = document.getElementById('formStatus');

if (contactForm && statusEl) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    
    // Enhanced validation
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
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('Thanks! I will get back to you soon.', 'success');
      contactForm.reset();
      
      // Close modal after successful submission
      setTimeout(() => {
        if (contactModal) {
          contactModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 2000);
    }, 700);
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced status display with different types
function setStatus(text, type = 'info') {
  if (!statusEl) return;
  
  statusEl.textContent = text;
  statusEl.className = `status-${type}`;
  
  // Clear status after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = '';
    }, 5000);
  }
}

// ===============================================
// FOOTER YEAR
// ===============================================

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ===============================================
// SCROLL ANIMATIONS AND EFFECTS
// ===============================================

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Special handling for about content paragraphs
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

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');
  const aboutCards = document.querySelectorAll('.about-card');
  
  sections.forEach(section => observer.observe(section));
  cards.forEach(card => observer.observe(card));
  aboutCards.forEach(card => observer.observe(card));
});

// Scroll effects with deceleration and mixed layout - FIXED REFRESH ISSUE
let persistentIcons = document.querySelector('.persistent-icons');
let floatingName = document.getElementById('floatingName');
let lastScrollY = 0;
let momentum = 0;
let deceleration = 0;
let isInitializing = true;

// Initialize scroll effects on page load - ALWAYS RUN
function initializeScrollEffects() {
  // Ensure elements exist before trying to manipulate them
  const aboutCards = document.querySelectorAll('.about-card');
  const cards = document.querySelectorAll('.card');
  
  if (aboutCards.length === 0 && cards.length === 0) {
    // Elements not ready yet, try again in a moment
    setTimeout(initializeScrollEffects, 50);
    return;
  }
  
  const scrollY = window.scrollY;
  
  // Reset all transforms to base positions first
  aboutCards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    card.style.transform = `translateY(${baseOffset}px)`;
  });
  
  cards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    card.style.transform = `translateY(${baseOffset}px)`;
  });
  
  // Set floating name state immediately
  if (floatingName) {
    if (scrollY > 700) {
      floatingName.classList.add('visible');
    } else {
      floatingName.classList.remove('visible');
    }
  }
  
  lastScrollY = scrollY;
  
  // Mark initialization as complete after a short delay
  setTimeout(() => {
    isInitializing = false;
  }, 100);
}

// Get base offset for mixed layout
function getBaseOffset(element, index) {
  if (element.classList.contains('about-card')) {
    // About cards: +30px, 0px, -30px
    return index === 0 ? 30 : index === 1 ? 0 : -30;
  } else if (element.classList.contains('card')) {
    // Project cards: +20px, -20px, +10px
    return index === 0 ? 20 : index === 1 ? -20 : 10;
  }
  return 0;
}

// Deceleration animation loop
function animateDeceleration() {
  if (Math.abs(deceleration) > 0.1) {
    deceleration *= 0.95; // Gradual deceleration
    
    // Apply deceleration to all elements
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
  // Skip scroll effects during initialization
  if (isInitializing) return;
  
  const scrollY = window.scrollY;
  const scrollDelta = scrollY - lastScrollY;
  
  // Calculate momentum and deceleration
  momentum = momentum * 0.9 + scrollDelta * 0.1;
  deceleration = scrollDelta * 0.2; // Deceleration effect
  
  // Show/hide floating name with later trigger
  if (floatingName) {
    if (scrollY > 700) { // Later trigger
      floatingName.classList.add('visible');
    } else {
      floatingName.classList.remove('visible');
    }
  }
  
  // Apply effects to About cards and project cards
  const aboutCards = document.querySelectorAll('.about-card');
  const cards = document.querySelectorAll('.card');
  
  // About cards - same effects as project cards
  aboutCards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    const cardOffset = scrollY * 0.02 + momentum * (0.35 + index * 0.1);
    card.style.transform = `translateY(${baseOffset + cardOffset}px)`;
  });
  
  // Project cards - same effects
  cards.forEach((card, index) => {
    const baseOffset = getBaseOffset(card, index);
    const cardOffset = scrollY * 0.02 + momentum * (0.35 + index * 0.1);
    card.style.transform = `translateY(${baseOffset + cardOffset}px)`;
  });
  
  lastScrollY = scrollY;
  
  // Start deceleration animation
  if (Math.abs(scrollDelta) > 0) {
    requestAnimationFrame(animateDeceleration);
  }
  
  // Update active nav link based on scroll position
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

// Initialize scroll effects - SIMPLIFIED APPROACH
function runInitialization() {
  // Wait for DOM to be ready, then run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollEffects);
  } else {
    // DOM is already ready, run immediately
    initializeScrollEffects();
  }
}

// Start initialization
runInitialization();
