// ============================================
// DIVINE FASHION — Theme & Light JS
// ============================================

(function() {
  // Apply saved theme ASAP (before render)
  const savedTheme = localStorage.getItem('df-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle (Dark / Light) ---
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('title', theme === 'dark' ? 'Mode clair' : 'Mode sombre');
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Activer mode clair' : 'Activer mode sombre');
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeIcon(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('df-theme', newTheme);
      updateThemeIcon(newTheme);

      // Subtle flash transition effect
      const flash = document.createElement('div');
      flash.style.cssText = `
        position:fixed;inset:0;z-index:9998;pointer-events:none;
        background:${newTheme==='dark'?'rgba(13,11,14,0.15)':'rgba(250,246,239,0.15)'};
        animation:themeFlash 0.4s ease forwards;
      `;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 400);
    });
  }

  // --- Lighting Toggle (Spotlight Effect) ---
  const lightBtn = document.getElementById('lightToggle');
  const lightIcon = document.getElementById('lightIcon');

  const savedLight = localStorage.getItem('df-light') === 'on';
  if (savedLight) document.body.classList.add('light-on');

  function updateLightIcon(on) {
    if (!lightIcon) return;
    lightIcon.textContent = on ? '💡' : '🕯️';
    lightBtn.setAttribute('title', on ? 'Éteindre l\'éclairage' : 'Allumer l\'éclairage');
    lightBtn.setAttribute('aria-label', on ? 'Éteindre éclairage' : 'Allumer éclairage');
  }
  updateLightIcon(savedLight);

  if (lightBtn) {
    lightBtn.addEventListener('click', () => {
      const isOn = document.body.classList.toggle('light-on');
      localStorage.setItem('df-light', isOn ? 'on' : 'off');
      updateLightIcon(isOn);

      // Visual feedback ripple
      const ripple = document.createElement('div');
      const rect = lightBtn.getBoundingClientRect();
      ripple.style.cssText = `
        position:fixed;
        left:${rect.left + rect.width/2}px;
        top:${rect.top + rect.height/2}px;
        width:4px;height:4px;
        border-radius:50%;
        background:rgba(201,168,76,${isOn ? '0.6' : '0.1'});
        transform:translate(-50%,-50%);
        animation:lightRipple 0.8s ease forwards;
        pointer-events:none;z-index:9997;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    });
  }
});

// CSS keyframes injected via JS for ripple/flash
const style = document.createElement('style');
style.textContent = `
  @keyframes themeFlash {
    0%{opacity:1} 100%{opacity:0}
  }
  @keyframes lightRipple {
    0%{transform:translate(-50%,-50%) scale(1);opacity:1}
    100%{transform:translate(-50%,-50%) scale(120);opacity:0}
  }
`;
document.head.appendChild(style);
