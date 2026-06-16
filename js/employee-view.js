/* ═══════════════════════════════════════
   EMPLOYEE VIEW — Alerts & Notifications
═══════════════════════════════════════ */

/* ── Render Alerts List ── */
function renderAlerts() {
  const list = document.getElementById('alerts-list');
  list.innerHTML = '';

  ALERTS.forEach(a => {
    const row = document.createElement('div');
    row.className = 'alert-row';
    row.onclick = () => openAlertDetail(a.id);

    row.innerHTML = `
      <div class="alert-icon" style="background:${a.iconBg};color:${a.iconColor}">
        <i class="ti ${a.icon}"></i>
      </div>
      <div style="flex:1">
        <div class="task-title">${a.title}</div>
        <div class="task-meta">${a.time}</div>
      </div>
    `;

    list.appendChild(row);
  });

  updateNotifCount();
}

/* ── Alert Detail Modal ── */
function openAlertDetail(id) {
  const a = ALERTS.find(x => x.id === id);

  const body = document.getElementById('alert-body');

  body.innerHTML = `
    <div class="alert-detail-block">
      <div class="alert-detail-header">
        <div class="alert-icon" style="background:${a.iconBg};color:${a.iconColor}">
          <i class="ti ${a.icon}"></i>
        </div>
        <div>
          <div class="alert-detail-title">${a.title}</div>
          <div class="alert-detail-time">${a.time}</div>
        </div>
      </div>

      <div class="alert-detail-body">
        ${a.body}
      </div>
    </div>
  `;

  a.unread = false;

  openModal('alert-detail-modal');
  updateNotifCount();
}

/* ── Notification Count (Home screen) ── */
function updateNotifCount() {
  const count = ALERTS.filter(a => a.unread).length;

  const label = document.getElementById('notif-count-label');
  const dot = document.querySelector('.notif-dot');

  if (count === 0) {
    label.textContent = 'No new notifications';
    if (dot) dot.style.display = 'none';
  } else {
    label.textContent = `${count} Notification${count > 1 ? 's' : ''}`;
    if (dot) dot.style.display = 'inline-block';
  }
}
