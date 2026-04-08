/* mCloud — app.js — Shared Utilities */

// ─── Dark Mode ───────────────────────────────────────────────
function initDarkMode() {
  const html = document.documentElement;
  // Theme persisted in window.__mCloudTheme (no localStorage in iframe)
  if (window.__mCloudTheme) html.setAttribute('data-theme', window.__mCloudTheme);

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    updateToggleIcon(btn, html.getAttribute('data-theme'));
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      window.__mCloudTheme = next;
      updateToggleIcon(btn, next);
      // Sync appearance radio if on settings page
      const radio = document.querySelector(`input[name="theme-radio"][value="${next}"]`);
      if (radio) radio.checked = true;
    });
  });
}

function updateToggleIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    btn.title = 'Switch to Light Mode';
  } else {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.title = 'Switch to Dark Mode';
  }
}

// ─── Toast ────────────────────────────────────────────────────
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ─── Modal helpers ────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// Close modals on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// Escape closes any open modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    // Also exit present mode if active
    const presentOverlay = document.getElementById('present-overlay');
    if (presentOverlay && presentOverlay.style.display !== 'none') {
      presentOverlay.style.display = 'none';
    }
  }
});

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
});

// ─── Logout ───────────────────────────────────────────────
async function logout() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.error('Logout failed:', err);
  }
  // Navigate to login regardless
  window.location.href = '/';
}
