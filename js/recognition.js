/* ═══════════════════════════════════════
   RECOGNITION — Feed + Analytics
═══════════════════════════════════════ */

/* ── Switch Tabs ── */
function switchRecog(tab) {
  ['give', 'feed', 'analytics'].forEach(t => {
    document.getElementById('rp-' + t).className =
      'snav-pill' + (t === tab ? ' active' : '');
    document.getElementById('r-' + t).style.display =
      t === tab ? 'block' : 'none';
  });

  if (tab === 'feed') renderRecogFeed();
  if (tab === 'analytics') renderRecogAnalytics();
}

/* ── Feed ── */
function renderRecogFeed() {
  const wrap = document.getElementById('r-feed');
  wrap.innerHTML = '';

  RECOGNITIONS.forEach(r => {
    const card = document.createElement('div');
    card.className = 'feed-card';

    card.innerHTML = `
      <div class="feed-badge">${r.type}</div>
      <div style="font-weight:600">${r.to}</div>
      <div class="meta-txt">From: ${r.from}</div>
      <div style="margin-top:6px">${r.msg}</div>
      <div class="stars">${'★'.repeat(r.stars)}</div>
      <div class="meta-txt" style="margin-top:6px">${r.time}</div>
    `;

    wrap.appendChild(card);
  });
}

/* ── Analytics ── */
function renderRecogAnalytics() {
  renderTopContrib();
  renderDeptStats();
  renderMostRecognized();
}

/* ── Top Contributors ── */
function renderTopContrib() {
  const wrap = document.getElementById('top-contrib');
  wrap.innerHTML = '';

  const counts = {};

  RECOGNITIONS.forEach(r => {
    counts[r.from] = (counts[r.from] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  sorted.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'contrib-row';

    row.innerHTML = `
      <div class="rank-num">${i + 1}</div>
      <div style="flex:1">${c[0]}</div>
      <div class="recog-count">${c[1]}</div>
    `;

    wrap.appendChild(row);
  });
}

/* ── Department Stats ── */
function renderDeptStats() {
  const wrap = document.getElementById('dept-bars');
  wrap.innerHTML = '';

  const deptCounts = {};

  employees.forEach(e => {
    deptCounts[e.dept] = 0;
  });

  RECOGNITIONS.forEach(r => {
    const emp = employees.find(e => e.name === r.to);
    if (emp) deptCounts[emp.dept]++;
  });

  Object.entries(deptCounts).forEach(d => {
    const row = document.createElement('div');
    row.className = 'dept-row';

    const pct = (d[1] / RECOGNITIONS.length) * 100;

    row.innerHTML = `
      <div class="dept-hd">
        <span>${d[0]}</span>
        <span>${d[1]}</span>
      </div>
      <div class="prog-mini">
        <div class="prog-mini-fill" style="width:${pct}%;background:var(--accent)"></div>
      </div>
    `;

    wrap.appendChild(row);
  });
}

/* ── Most Recognized Employees ── */
function renderMostRecognized() {
  const wrap = document.getElementById('most-recog');
  wrap.innerHTML = '';

  const counts = {};

  RECOGNITIONS.forEach(r => {
    counts[r.to] = (counts[r.to] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  sorted.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'contrib-row';

    row.innerHTML = `
      <div class="rank-num">${i + 1}</div>
      <div style="flex:1">${c[0]}</div>
      <div class="recog-count">${c[1]}</div>
    `;

    wrap.appendChild(row);
  });
}
