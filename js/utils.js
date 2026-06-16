/* ═══════════════════════════════════════
   UTILS — Modals, Toasts, Helpers
═══════════════════════════════════════ */

/* ── Toast ── */
function toast(msg) {
  const el = document.getElementById('toast-el');
  el.textContent = msg;
  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 2000);
}

/* ── Modals ── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

/* ── Avatar helper ── */
function getAvatar(i) {
  return AVATARS[i % AVATARS.length];
}

/* ── Get employee by ID ── */
function getEmp(id) {
  return employees.find(e => e.id === id);
}

/* ── Format priority badge ── */
function getPriorityClass(p) {
  if (p === 'High') return 'ph';
  if (p === 'Medium') return 'pm';
  return 'pl';
}

/* ── Format status badge ── */
function getStatusClass(s) {
  if (s === 'Completed') return 'sc';
  if (s === 'In Progress') return 'si';
  return 'sn';
}
