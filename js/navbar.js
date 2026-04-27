/* ══════════════════════════════════════
   StudentHub — Navbar Active Link
   navbar.js

   Automatically marks the correct nav
   link as active based on the current
   page filename.
══════════════════════════════════════ */

(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const map = {
    'index.html':       'nav-home',
    '':                 'nav-home',
    'add-student.html': 'nav-add',
    'view-students.html':'nav-view',
  };

  const targetId = map[page];
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');
  }
})();
