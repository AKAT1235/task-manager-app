/* ═══════════════════════════════════════
   TASKS — Manager & Employee task logic
═══════════════════════════════════════ */

let mgrTaskFilter = 'All';
let empTaskFilter = 'All';

/* ── Manager Tasks ── */
function renderMgrTasks(filter = 'All') {
  mgrTaskFilter = filter;
  const list = document.getElementById('mgr-task-list');
  list.innerHTML = '';

  let filtered = tasks;

  if (filter !== 'All') {
    filtered = tasks.filter(t => t.status === filter);
  }

  filtered.forEach(t => {
    const emp = getEmp(t.assigneeId);
    const av = getAvatar(t.assigneeId);

    const row = document.createElement('div');
    row.className = 'task-row';
    row.onclick = () => openTaskDetail(t.id);

    row.innerHTML = `
      <div class="task-circle" style="background:${av.bg};color:${av.fg}">
        <i class="ti ti-briefcase"></i>
      </div>
      <div style="flex:1">
        <div class="task-title">${t.title}</div>
        <div class="task-meta">${emp.name} • ${t.due}</div>
      </div>
      <div>
        <span class="pbadge ${getPriorityClass(t.priority)}">${t.priority}</span>
        <span class="sbadge ${getStatusClass(t.status)}">${t.status}</span>
      </div>
      <div class="chev"><i class="ti ti-chevron-right"></i></div>
    `;
    list.appendChild(row);
  });
}

/* ── Filter Manager Tasks ── */
function filterMgrTasks(f, el) {
  document.querySelectorAll('#m-task-filters .fpill')
    .forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderMgrTasks(f);
}

/* ── Employee Tasks ── */
function renderEmpTasks(filter = 'All') {
  empTaskFilter = filter;
  const list = document.getElementById('emp-task-list');
  list.innerHTML = '';

  // simulate logged-in employee = index 2 (Sarah)
  let myTasks = tasks.filter(t => t.assigneeId === 2);

  if (filter !== 'All') {
    myTasks = myTasks.filter(t => t.status === filter);
  }

  myTasks.forEach(t => {
    const av = getAvatar(t.assigneeId);

    const row = document.createElement('div');
    row.className = 'task-row';
    row.onclick = () => openEmpTask(t.id);

    row.innerHTML = `
      <div class="task-circle" style="background:${av.bg};color:${av.fg}">
        <i class="ti ti-check"></i>
      </div>
      <div style="flex:1">
        <div class="task-title">${t.title}</div>
        <div class="task-meta">${t.due}</div>
      </div>
      <div>
        <span class="pbadge ${getPriorityClass(t.priority)}">${t.priority}</span>
      </div>
      <div class="chev"><i class="ti ti-chevron-right"></i></div>
    `;
    list.appendChild(row);
  });
}

/* ── Filter Employee Tasks ── */
function filterEmpTasks(f, el) {
  document.querySelectorAll('#e-task-filters .fpill')
    .forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderEmpTasks(f);
}

/* ── Employee Home Tasks (small list) ── */
function renderEmpHome() {
  const wrap = document.getElementById('emp-home-tasks');
  wrap.innerHTML = '';

  let myTasks = tasks.filter(t => t.assigneeId === 2).slice(0, 3);

  myTasks.forEach(t => {
    const row = document.createElement('div');
    row.className = 'list-row';

    row.innerHTML = `
      <i class="ti ti-circle-check green-icon"></i>
      <span>${t.title}</span>
    `;
    wrap.appendChild(row);
  });
}

/* ── Task Detail (Manager) ── */
function openTaskDetail(id) {
  const t = tasks.find(x => x.id === id);
  const emp = getEmp(t.assigneeId);

  const body = document.getElementById('td-body');

  body.innerHTML = `
    <div class="modal-highlight">
      <div class="modal-highlight-title">${t.title}</div>
      <div class="task-meta">Due: ${t.due}</div>
    </div>

    <div class="task-detail-row"><span>Assignee</span><span>${emp.name}</span></div>
    <div class="task-detail-row"><span>Priority</span><span>${t.priority}</span></div>
    <div class="task-detail-row"><span>Status</span><span>${t.status}</span></div>

    <div class="assignee-block">
      <div>${emp.name}</div>
      <div style="font-size:12px;color:#999">${emp.email}</div>
    </div>
  `;

  openModal('task-detail-modal');
}

/* ── Task Detail (Employee) ── */
let currentEmpTask = null;

function openEmpTask(id) {
  currentEmpTask = tasks.find(t => t.id === id);

  const body = document.getElementById('etd-body');

  body.innerHTML = `
    <div class="modal-highlight">
      <div class="modal-highlight-title">${currentEmpTask.title}</div>
      <div class="task-meta">Due: ${currentEmpTask.due}</div>
    </div>
  `;

  const sel = document.getElementById('emp-status-sel');
  sel.innerHTML = `
    <option ${currentEmpTask.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
    <option ${currentEmpTask.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
    <option ${currentEmpTask.status === 'Completed' ? 'selected' : ''}>Completed</option>
  `;

  openModal('emp-task-modal');
}

/* ── Update Employee Task Status ── */
function updateEmpTaskStatus(sel) {
  if (!currentEmpTask) return;
  currentEmpTask.status = sel.value;
  renderEmpTasks(empTaskFilter);
  renderMgrTasks(mgrTaskFilter);
}

/* ── Add Task ── */
function addTask() {
  const title = document.getElementById('nt-title').value.trim();
  const assigneeId = document.getElementById('nt-assignee').value;
  const priority = document.getElementById('nt-priority').value;
  const due = document.getElementById('nt-due').value;

  if (!title || assigneeId === '' || !priority || !due) {
    toast('Please fill all fields');
    return;
  }

  const newTask = {
    id: tasks.length,
    title,
    assigneeId: Number(assigneeId),
    priority,
    due,
    status: 'Not Started'
  };

  tasks.push(newTask);
  getEmp(newTask.assigneeId).tasks.push(newTask.id);

  toast('Task created ✅');
  closeModal('new-task-modal');
  renderMgrTasks(mgrTaskFilter);
}
