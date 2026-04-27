/* ══════════════════════════════════════
   StudentHub — Add Student Logic
   add-student.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('addStudentForm');

  /* ── Field references ── */
  const fields = {
    id:     document.getElementById('studentId'),
    name:   document.getElementById('studentName'),
    email:  document.getElementById('studentEmail'),
    phone:  document.getElementById('studentPhone'),
    course: document.getElementById('studentCourse'),
  };

  /* ── Bootstrap modal reference ── */
  const successModalEl = document.getElementById('successModal');
  const successModal   = new bootstrap.Modal(successModalEl);

  /* ── "View Students" button inside modal ── */
  document.getElementById('modalViewBtn').addEventListener('click', function () {
    successModal.hide();
    window.location.href = 'view-students.html';
  });

  /* ── "Add Another" button inside modal ── */
  document.getElementById('modalAddBtn').addEventListener('click', function () {
    successModal.hide();
  });

  /* ── Clear button ── */
  document.getElementById('clearBtn').addEventListener('click', clearForm);

  /* ── Form submission ── */
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);

  /* ────────────────────────────────────
     VALIDATION
  ──────────────────────────────────── */
  function validate() {
    let valid = true;

    // Reset previous errors
    Object.values(fields).forEach(f => {
      f.classList.remove('is-invalid');
      const fb = f.nextElementSibling;
      if (fb && fb.classList.contains('invalid-feedback')) fb.textContent = '';
    });

    // Student ID
    if (!fields.id.value.trim()) {
      setError(fields.id, 'Student ID is required.');
      valid = false;
    }

    // Name
    if (!fields.name.value.trim()) {
      setError(fields.name, 'Full name is required.');
      valid = false;
    }

    // Email
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.value.trim()) {
      setError(fields.email, 'Email address is required.');
      valid = false;
    } else if (!emailRx.test(fields.email.value.trim())) {
      setError(fields.email, 'Enter a valid email address.');
      valid = false;
    }

    // Phone
    if (!fields.phone.value.trim()) {
      setError(fields.phone, 'Phone number is required.');
      valid = false;
    }

    // Course
    if (!fields.course.value) {
      setError(fields.course, 'Please select a course.');
      valid = false;
    }

    return valid;
  }

  function setError(el, msg) {
    el.classList.add('is-invalid');
    const fb = el.nextElementSibling;
    if (fb && fb.classList.contains('invalid-feedback')) fb.textContent = msg;
  }

  /* ────────────────────────────────────
     SUBMIT HANDLER
  ──────────────────────────────────── */
  function handleSubmit() {
    if (!validate()) return;

    const student = {
      id:     fields.id.value.trim(),
      name:   fields.name.value.trim(),
      email:  fields.email.value.trim(),
      phone:  fields.phone.value.trim(),
      course: fields.course.value,
    };

    // Append to localStorage (defined in storage.js)
    appendStudent(student);

    // Clear form
    clearForm();

    // Show thank-you modal
    successModal.show();
  }

  /* ────────────────────────────────────
     CLEAR FORM
  ──────────────────────────────────── */
  function clearForm() {
    Object.values(fields).forEach(f => {
      f.value = f.tagName === 'SELECT' ? '' : '';
      f.classList.remove('is-invalid');
    });
    // Reset select to placeholder
    fields.course.selectedIndex = 0;
  }

});
