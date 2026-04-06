document.addEventListener('DOMContentLoaded', function () {

  // Enable sidebar/main-wrap transitions only after initial render to prevent
  // animation flash on page load. Use requestAnimationFrame to defer one frame.
  requestAnimationFrame(function () {
    document.body.classList.add('sidebar-ready');
  });

  // ── Sidebar: desktop collapse ──────────────────────────────────────────────
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var COLLAPSED_KEY = 'tk-sidebar-collapsed';

  if (sidebarToggle) {
    // Initialise aria-label and title to match restored state
    if (document.body.classList.contains('sidebar-collapsed')) {
      sidebarToggle.setAttribute('aria-label', 'Expand sidebar');
      sidebarToggle.setAttribute('title', 'Expand sidebar');
    }

    sidebarToggle.addEventListener('click', function () {
      var isCollapsed = document.body.classList.toggle('sidebar-collapsed');
      var label = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
      localStorage.setItem(COLLAPSED_KEY, isCollapsed);
      sidebarToggle.setAttribute('aria-label', label);
      sidebarToggle.setAttribute('title', label);
    });
  }

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

    var maxScroll = document.body.scrollHeight - window.innerHeight;
    var pct       = maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0;

    progressFill.style.height = pct + '%';
  }

  var pageHeader = document.getElementById('page-header');

  function onScroll() {
    updateProgress();
    if (pageHeader) {
      pageHeader.classList.toggle('is-pinned', window.scrollY > 60);
    }
  }

  function checkAndUpdate() {
    showProgress(isScrollable());
    updateProgress();
  }

  checkAndUpdate();
  window.addEventListener('load', checkAndUpdate, { once: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', checkAndUpdate, { passive: true });

});
