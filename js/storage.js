/* ══════════════════════════════════════
   StudentHub — Storage Utility
   storage.js
   ══════════════════════════════════════

   Single source of truth for all
   localStorage read/write operations.
   Import this on every page that needs
   student data.
*/

const STORAGE_KEY = 'studenthub_students';

/**
 * Read all students from localStorage.
 * @returns {Array} array of student objects
 */
function getStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('StudentHub: Failed to parse localStorage', e);
    return [];
  }
}

/**
 * Overwrite all students in localStorage.
 * @param {Array} students
 */
function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('StudentHub: Failed to save to localStorage', e);
  }
}

/**
 * Append one student object to the list.
 * @param {Object} student
 */
function appendStudent(student) {
  const list = getStudents();
  list.push(student);
  saveStudents(list);
}

/**
 * Delete a student by index.
 * @param {number} index
 */
function deleteStudentByIndex(index) {
  const list = getStudents();
  list.splice(index, 1);
  saveStudents(list);
}

/**
 * Wipe all students.
 */
function clearAllStudents() {
  localStorage.removeItem(STORAGE_KEY);
}
