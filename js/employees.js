/* ═══════════════════════════════════════
   EMPLOYEES — List, Search, Detail, Add
═══════════════════════════════════════ */

/* ── Render Employees ── */
function renderEmps(query = '') {
  const list = document.getElementById('emp-list');
  list.innerHTML = '';

  let filtered = employees;

  if (query) {
    query = query.toLowerCase();
    filtered = employees.filter(e =>
      e.name.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query)
    );
  }

  filtered.forEach((e, i) => {
    const av = getAvatar(i);

    const row = document.createElement('div');
    row.className = 'emp-card';
    row.onclick = () => openEmpDetail(e.id);

    row.innerHTML = `
      <div class="avatar" style="background:${av.bg};color:${av.fg}">
        ${av.av}
      </div>
      <div style="flex:1">
        <div class="task-title">${e.name}</div>
        <div class="task-meta">${e.role}</div>
      </div>
      <div class="active-badge">${e.tasks.length} tasks</div>
    `;

    list.appendChild(row);
  });
}

/* ── Employee Detail Modal ── */
function openEmpDetail(id) {
  const e = employees.find(x => x.id === id);
  const body = document.getElementById('ed-body');
  const title = document.getElementById('ed-title');

  title.textContent = e.name;

  body.innerHTML = `
    <div class="emp-modal-hero">
      <div class="emp-modal-av">${e.name.split(' ').map(n => n[0]).join('')}</div>
      <div>${e.role}</div>
    </div>

    <div class="task-detail-row"><span>Email</span><span>${e.email}</span></div>
    <div class="task-detail-row"><span>Phone</span><span>${e.phone}</span></div>
    <div class="task-detail-row"><span>Department</span><span>${e.dept}</span></div>
    <div class="task-detail-row"><span>Total Tasks</span><span>${e.tasks.length}</span></div>
  `;

  openModal('emp-detail-modal');
}

/* ── Add Employee ── */
function addEmployee() {
  const name  = document.getElementById('ae-name').value.trim();
  const role  = document.getElementById('ae-role').value.trim();
  const email = document.getElementById('ae-email').value.trim();
  const phone = document.getElementById('ae-phone').value.trim();
  const dept  = document.getElementById('ae-dept').value;

  if (!name || !role || !email || !phone || !dept) {
    toast('Please fill all fields');
    return;
  }

  const newEmp = {
    id: employees.length,
    name,
    role,
    email,
    phone,
    dept,
    tasks: []
  };

  employees.push(newEmp);

  toast('Employee added ✅');
  closeModal('add-emp-modal');
  renderEmps('');
}

/* ── Populate Task Assignee Dropdown ── */
function populateAssignees() {
  const sel = document.getElementById('nt-assignee');
  if (!sel) return;

  sel.innerHTML = `<option value="">Assign to…</option>`;

  employees.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e.id;
    opt.textContent = e.name;
    sel.appendChild(opt);
  });
}
