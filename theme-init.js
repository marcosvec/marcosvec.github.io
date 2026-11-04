(function() {
  const saved = localStorage.getItem('theme');
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');

  if (urlTheme === 'light' || urlTheme === 'dark') {
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
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
})();
