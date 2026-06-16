/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */

const MGR_TABS = [
  { id: 'm-dash',      icon: 'ti-layout-dashboard', label: 'Dashboard'   },
  { id: 'm-tasks',     icon: 'ti-list-check',        label: 'Tasks'       },
  { id: 'm-employees', icon: 'ti-users',             label: 'Employees'   },
  { id: 'm-recog',     icon: 'ti-star',              label: 'Recognition' },
  { id: 'm-profile',   icon: 'ti-user-circle',       label: 'Profile'     },
];

const EMP_TABS = [
  { id: 'e-home',    icon: 'ti-home',        label: 'Home'     },
  { id: 'e-tasks',   icon: 'ti-list-check',  label: 'My Tasks' },
  { id: 'e-alerts',  icon: 'ti-bell',        label: 'Alerts'   },
  { id: 'e-profile', icon: 'ti-user-circle', label: 'Profile'  },
];

function buildNav(tabs) {
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = '';
  tabs.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab';
    btn.id = 'tab-' + t.id;
    btn.innerHTML = `<i class="ti ${t.icon}"></i><span>${t.label}</span>`;
    btn.onclick = () => goTo(t.id);
    nav.appendChild(btn);
  });
}

function goTo(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const pg = document.getElementById('pg-' + id);
  if (pg) {
    pg.classList.add('active');
    document.getElementById('screen').scrollTop = 0;
  }

  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');

  /* trigger page-specific rendering */
  if (id === 'm-tasks')     renderMgrTasks(mgrTaskFilter);
  if (id === 'm-employees') renderEmps('');
  if (id === 'e-tasks')     renderEmpTasks(empTaskFilter);
  if (id === 'e-alerts')    renderAlerts();
  if (id === 'e-home')      renderEmpHome();
}

function switchRole(role) {
  document.getElementById('btn-manager').className  = 'rs-btn' + (role === 'manager'  ? ' active' : '');
  document.getElementById('btn-employee').className = 'rs-btn' + (role === 'employee' ? ' active' : '');
  document.getElementById('role-label').textContent = role === 'manager' ? 'MANAGER' : 'EMPLOYEE';

  if (role === 'manager') {
    buildNav(MGR_TABS);
    renderMgrTasks('All');
    renderEmps('');
    goTo('m-dash');
  } else {
    buildNav(EMP_TABS);
    renderEmpHome();
    renderAlerts();
    renderEmpTasks('All');
    goTo('e-home');
  }
}

/* Dashboard sub-tabs */
function switchDashTab(tab) {
  ['overview', 'workload'].forEach(t => {
    document.getElementById('dpill-' + t).className = 'snav-pill' + (t === tab ? ' active' : '');
    document.getElementById('dash-' + t).style.display = t === tab ? 'block' : 'none';
  });
  if (tab === 'workload') renderWorkload();
}
