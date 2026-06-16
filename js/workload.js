/* ═══════════════════════════════════════
   WORKLOAD — Visualization & Alerts
═══════════════════════════════════════ */

/* ── Calculate workload per employee ── */
function getWorkloadData() {
  return employees.map(e => {
    const count = e.tasks.length;

    let level = 'available';
    if (count >= WL_OVERLOAD) level = 'overload';
    else if (count >= WL_MEDIUM) level = 'medium';

    return {
      ...e,
      count,
      level
    };
  });
}

/* ── Render Dashboard Workload ── */
function renderWorkload() {
  const data = getWorkloadData();

  renderWlSummary(data);
  renderWlBars(data);
  renderWlAlerts(data);
}

/* ── Summary Boxes ── */
function renderWlSummary(data) {
  const wrap = document.getElementById('wl-summary');
  wrap.innerHTML = '';

  const overload = data.filter(d => d.level === 'overload').length;
  const medium   = data.filter(d => d.level === 'medium').length;
  const free     = data.filter(d => d.level === 'available').length;

  const items = [
    { num: overload, label: 'Overloaded', color: 'red' },
    { num: medium,   label: 'Medium',     color: 'amber' },
    { num: free,     label: 'Available',  color: 'green' }
  ];

  items.forEach(i => {
    const box = document.createElement('div');
    box.className = 'wl-sum-box';

    box.innerHTML = `
      <div class="wl-sum-num ${i.color}">${i.num}</div>
      <div class="wl-sum-lbl">${i.label}</div>
    `;

    wrap.appendChild(box);
  });
}

/* ── Employee Bars ── */
function renderWlBars(data) {
  const wrap = document.getElementById('wl-emp-bars');
  wrap.innerHTML = '';

  data.forEach((d, i) => {
    const av = getAvatar(i);

    let color = '#30D158'; // green
    let label = 'Available';

    if (d.level === 'medium') {
      color = '#EF9F27';
      label = 'Medium';
    }

    if (d.level === 'overload') {
      color = '#E24B4A';
      label = 'Overloaded';
    }

    const pct = Math.min(d.count * 25, 100); // simple scaling

    const row = document.createElement('div');
    row.className = 'wl-emp-row';
    row.onclick = () => openWorkloadDetail(d.id);

    row.innerHTML = `
      <div class="wl-emp-header">
        <div class="avatar" style="background:${av.bg};color:${av.fg}">
          ${av.av}
        </div>
        <div style="flex:1">
          <div class="task-title">${d.name}</div>
          <div class="task-meta">${d.role}</div>
        </div>
        <div class="wl-status-chip">
          <div class="wl-status-dot" style="background:${color}"></div>
          <div class="wl-status-label">${label}</div>
        </div>
      </div>

      <div class="wl-bar-meta">
        <span>Tasks</span>
        <span class="wl-bar-count">${d.count}</span>
      </div>

      <div class="wl-bar-track">
        <div class="wl-bar-fill" style="width:${pct}%;background:${color}"></div>
      </div>
    `;

    wrap.appendChild(row);
  });
}

/* ── Alerts ── */
function renderWlAlerts(data) {
  const wrap = document.getElementById('wl-alert-list');
  wrap.innerHTML = '';

  data.forEach(d => {
    if (d.level === 'available') return;

    const card = document.createElement('div');

    let cls = 'green';
    let msg = 'Workload looks good';

    if (d.level === 'medium') {
      cls = 'yellow';
      msg = 'Has moderate workload, monitor distribution';
    }

    if (d.level === 'overload') {
      cls = 'red';
      msg = 'Is overloaded — consider reassigning tasks';
    }

    card.className = `wl-alert-card ${cls}`;

    card.innerHTML = `
      <div class="wl-alert-icon">⚠️</div>
      <div>
        <div class="wl-alert-name">${d.name}</div>
        <div class="wl-alert-level">${d.count} tasks</div>
        <div class="wl-alert-msg">${msg}</div>
      </div>
    `;

    wrap.appendChild(card);
  });

  if (wrap.innerHTML === '') {
    wrap.innerHTML = `<div class="meta-txt">No alerts 🎉</div>`;
  }
}

/* ── Workload Detail Modal ── */
function openWorkloadDetail(id) {
  const emp = employees.find(e => e.id === id);
  const body = document.getElementById('wl-modal-body');
  const title = document.getElementById('wl-modal-title');

  title.textContent = emp.name + ' — Workload';

  const empTasks = tasks.filter(t => t.assigneeId === id);

  body.innerHTML = `
    <div class="modal-highlight">
      <div class="modal-highlight-title">${empTasks.length} active tasks</div>
    </div>
  `;

  empTasks.forEach(t => {
    const row = document.createElement('div');
    row.className = 'list-row';

    row.innerHTML = `
      <span>${t.title}</span>
    `;

    body.appendChild(row);
  });

  openModal('wl-emp-modal');
}
