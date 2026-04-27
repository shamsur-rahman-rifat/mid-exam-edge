/* ══════════════════════════════════════
   StudentHub — View Students Logic
   view-students.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  const tbody      = document.getElementById('studentTableBody');
  const table      = document.getElementById('studentTable');
  const emptyState = document.getElementById('emptyState');
  const countEl    = document.getElementById('studentCount');

  /* ── Initial render ── */
  renderTable();

  /* ── Clear All button ── */
  document.getElementById('clearAllBtn').addEventListener('click', function () {
    if (!confirm('⚠️ This will permanently delete ALL student records. Continue?')) return;
    clearAllStudents();   // from storage.js
    renderTable();
  });

  /* ────────────────────────────────────
     RENDER TABLE
  ──────────────────────────────────── */
  function renderTable() {
    const students = getStudents(); // from storage.js
    countEl.textContent = students.length;

    if (students.length === 0) {
      tbody.innerHTML = '';
      table.style.display  = 'none';
      emptyState.style.display = 'block';
      return;
    }

    table.style.display  = '';
    emptyState.style.display = 'none';

    tbody.innerHTML = students.map((s, i) => `
      <tr>
        <td style="color:var(--muted);font-size:.82rem;font-weight:700;">${i + 1}</td>
        <td><code style="background:#f1f5f9;padding:2px 7px;border-radius:5px;font-size:.85rem;">${escapeHtml(s.id)}</code></td>
        <td><strong>${escapeHtml(s.name)}</strong></td>
        <td style="color:var(--muted);">${escapeHtml(s.email)}</td>
        <td style="color:var(--muted);">${escapeHtml(s.phone)}</td>
        <td><span class="course-badge">${escapeHtml(s.course)}</span></td>
        <td>
          <button class="btn-delete" onclick="handleDelete(${i})">
            <i class="bi bi-trash3"></i> Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  /* ── Expose delete to inline handler ── */
  window.handleDelete = function (index) {
    if (!confirm('Delete this student record?')) return;
    deleteStudentByIndex(index); // from storage.js
    renderTable();
  };

  /* ────────────────────────────────────
     UTILITY: escape HTML to prevent XSS
  ──────────────────────────────────── */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

});
