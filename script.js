window.addEventListener('scroll', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const scrollPosition = window.scrollY;

    const fadeOutThreshold = 250;
    const opacity = 1 - (scrollPosition / fadeOutThreshold);

    scrollArrow.style.opacity = Math.max(0, opacity);
});

window.addEventListener("DOMContentLoaded", () => {
    const alertBox = document.getElementById("alert-box");

    setTimeout(() => {
        alertBox.classList.add("show");
    }, 200);

    setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.classList.add("hide");
    }, 5000);
});

document.getElementById("year").innerHTML = new Date().getFullYear();

const toggle = document.getElementById('mode-toggle');
const moonSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-132 77.5-238T361-868q17-5 31 5t12 27q-7 88 23.5 169.5T521-522q63 63 145 94t170 24q17-2 26.5 13t4.5 32q-40 125-145.5 202T484-80Z"/></svg>`;
const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M450-840v-50q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v50q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm0 770v-50q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v50q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q450-57.25 450-70Zm440-380h-50q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5Zm-770 0H70q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q57.25-510 70-510h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5Zm667-295-24 24q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l23-23q9-9 21.6-9 12.61 0 21.5 9 8.9 9 8.9 21.5t-9 21.5ZM240-196l-24 24q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l23-23q8.5-9 21.25-9t21.75 9q9 9 9 21.5t-9 21.5Zm504 23-24-23q-9-9-8.5-21.5T721-239q9-9 21.5-9t21.5 9l23 24q9 9 9 21.2 0 12.19-9 20.8-9 9-21.5 9t-21.5-9ZM197-722l-24-23q-9-9-8.5-21.5T174-788q9-9 21.5-9t21.5 9l23 24q9 9 9 21.1 0 12.1-9 20.9-9 9-21.5 9t-21.5-9Zm282.82 467Q386-255 320.5-320.68 255-386.35 255-480.18q0-93.82 65.68-159.32 65.67-65.5 159.5-65.5 93.82 0 159.32 65.68 65.5 65.67 65.5 159.5 0 93.82-65.68 159.32-65.67 65.5-159.5 65.5Z"/></svg>`;

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    toggle.innerHTML = sunSvg;
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    document.documentElement.classList.remove('dark');
    toggle.innerHTML = moonSvg;
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
  localStorage.setItem('theme', theme);
}

toggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});
toggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.click();
  }
});

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
})();

document.addEventListener('DOMContentLoaded', () => {
  const alertBox = document.getElementById('alert-box');
  if (!alertBox) return;

  alertBox.setAttribute('role', 'status');
  alertBox.setAttribute('aria-live', 'polite');

  function getGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 18) return 'Good afternoon';
    if (h >= 18 && h < 22) return 'Good evening';
    return 'Good night';
  }

  const greeting = getGreeting();
  alertBox.textContent = `${greeting}! Welcome to my page.`;

  function showTemporaryAlert(msg, ms = 4000) {
    alertBox.textContent = msg;
    alertBox.classList.remove('hide');
    alertBox.classList.add('show');

    setTimeout(() => {
      alertBox.classList.remove('show');
      alertBox.classList.add('hide');
    }, ms);
  }

  showTemporaryAlert(alertBox.textContent, 4000);

  let lastHiddenAt = Date.now();
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Date.now() - lastHiddenAt > 30000) {
      showTemporaryAlert(`${getGreeting()} — welcome back!`, 3000);
    }
  });
  const originalHideTimeout = 4000;
  setTimeout(() => { lastHiddenAt = Date.now(); }, originalHideTimeout + 50);
});
