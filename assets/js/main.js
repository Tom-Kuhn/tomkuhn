document.addEventListener('DOMContentLoaded', function () {

  // ── Sidebar: desktop collapse ──────────────────────────────────────────────
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var COLLAPSED_KEY = 'tk-sidebar-collapsed';

  if (sidebarToggle) {
    // Restore saved state
    if (localStorage.getItem(COLLAPSED_KEY) === 'true') {
      document.body.classList.add('sidebar-collapsed');
    }

    sidebarToggle.addEventListener('click', function () {
      var isCollapsed = document.body.classList.toggle('sidebar-collapsed');
      localStorage.setItem(COLLAPSED_KEY, isCollapsed);
    });
  }

  // ── Sidebar: mobile open/close ─────────────────────────────────────────────
  var hamburger      = document.getElementById('hamburger');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  function openMobile() {
    document.body.classList.add('sidebar-mobile-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    document.body.classList.remove('sidebar-mobile-open');
    document.body.style.overflow = '';
  }

  if (hamburger)      { hamburger.addEventListener('click', openMobile); }
  if (sidebarOverlay) { sidebarOverlay.addEventListener('click', closeMobile); }

  // Close mobile sidebar when a nav link is tapped
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) { closeMobile(); }
    });
  });

  // ── Scroll progress indicator ──────────────────────────────────────────────
  var progressTrack = document.getElementById('progress-track');
  var progressFill  = document.getElementById('progress-fill');

  function isScrollable() {
    return document.body.scrollHeight > window.innerHeight + 16;
  }

  function showProgress(visible) {
    if (!progressTrack) return;
    progressTrack.style.display = visible ? 'block' : 'none';
  }

  function updateProgress() {
    if (!progressFill || !progressTrack) return;
    if (!isScrollable()) return;

    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var maxScroll  = document.body.scrollHeight - window.innerHeight;
    var pct        = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0;

    progressFill.style.height = pct + '%';
  }

  function checkAndUpdate() {
    showProgress(isScrollable());
    updateProgress();
  }

  // Initial check (after fonts/images may alter page height)
  checkAndUpdate();
  window.addEventListener('load', checkAndUpdate);

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', checkAndUpdate, { passive: true });

});
