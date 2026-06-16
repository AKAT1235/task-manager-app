/* ═══════════════════════════════════════
   APP — Initialization
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Default role = Manager
  switchRole('manager');

  // Populate dropdowns
  populateAssignees();

  // Initial renders
  renderMgrTasks('All');
  renderEmps('');
  renderRecogFeed();
});

/* ── Workload Tabs ── */
function switchWlTab(tab) {
  ['viz', 'alerts', 'benefits'].forEach(t => {
    document.getElementById('wlp-' + t).className =
      'snav-pill' + (t === tab ? ' active' : '');

    document.getElementById('wl-' + t).style.display =
      t === tab ? 'block' : 'none';
  });
}
