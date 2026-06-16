/* ═══════════════════════════════════════
   DATA — All application state
═══════════════════════════════════════ */

const AVATARS = [
  { av: 'EL', bg: '#EEEDFE', fg: '#3C3489' },
  { av: 'MB', bg: '#EAF3DE', fg: '#27500A' },
  { av: 'SP', bg: '#FAECE7', fg: '#712B13' },
  { av: 'DB', bg: '#E6F1FB', fg: '#0C447C' },
  { av: 'LD', bg: '#FBEAF0', fg: '#72243E' },
  { av: 'JW', bg: '#FAEEDA', fg: '#633806' },
  { av: 'RK', bg: '#EAF3DE', fg: '#27500A' },
];

let employees = [
  { id: 0, name: 'Emily J. Lee',    role: 'Project Manager', email: 'emily.lee@mesa.com',    phone: '+1 555-0101', dept: 'Engineering', tasks: [0] },
  { id: 1, name: 'Michael D. Brown',role: 'Developer',       email: 'michael.brown@mesa.com', phone: '+1 555-0102', dept: 'Engineering', tasks: [1] },
  { id: 2, name: 'Sarah K. Patel',  role: 'Designer',        email: 'sarah.patel@mesa.com',   phone: '+1 555-0103', dept: 'Design',       tasks: [2] },
  { id: 3, name: 'David M. Brooks', role: 'Analyst',         email: 'david.brooks@mesa.com',  phone: '+1 555-0104', dept: 'HR',           tasks: [3] },
  { id: 4, name: 'Lauren R. Davis', role: 'HR Manager',      email: 'lauren.davis@mesa.com',  phone: '+1 555-0105', dept: 'HR',           tasks: [4] },
  { id: 5, name: 'James Wilson',    role: 'Sales Lead',      email: 'j.wilson@mesa.com',      phone: '+1 555-0106', dept: 'Sales',        tasks: [5] },
  { id: 6, name: 'Rita Kumar',      role: 'Engineer',        email: 'rita.kumar@mesa.com',    phone: '+1 555-0107', dept: 'Engineering',  tasks: [] },
];

let tasks = [
  { id: 0, title: 'Implement new dashboard',  assigneeId: 0, priority: 'High',   due: 'MAY 31, 2026',  status: 'In Progress' },
  { id: 1, title: 'Review employee roles',    assigneeId: 1, priority: 'Medium', due: 'JUNE 7, 2026',  status: 'In Progress' },
  { id: 2, title: 'Conduct training session', assigneeId: 2, priority: 'Medium', due: 'JUNE 14, 2026', status: 'In Progress' },
  { id: 3, title: 'Develop reporting system', assigneeId: 3, priority: 'High',   due: 'JUNE 21, 2026', status: 'Not Started' },
  { id: 4, title: 'Implement task reminders', assigneeId: 4, priority: 'Low',    due: 'JUNE 28, 2026', status: 'Completed'  },
  { id: 5, title: 'Review task workflows',    assigneeId: 5, priority: 'Medium', due: 'JULY 5, 2026',  status: 'Not Started' },
];

const ALERTS = [
  {
    id: 0,
    icon: 'ti-bell',
    iconBg: '#EEEDFE',
    iconColor: '#5B4FD9',
    title: 'New task: Conduct training session',
    body: 'You were assigned "Conduct training session" due JUNE 14, 2026. Please review the details and update your status as you progress.',
    time: 'Just now',
    unread: true,
  },
  {
    id: 1,
    icon: 'ti-clock',
    iconBg: '#FAEEDA',
    iconColor: '#EF9F27',
    title: 'Reminder: Task is due in 5 days.',
    body: '"Conduct training session" is due in 5 days on JUNE 14, 2026. Make sure to complete it on time.',
    time: '1 hour ago',
    unread: true,
  },
];

const RECOGNITIONS = [
  { from: 'James (Manager)',  to: 'Emily J. Lee',    type: 'Above & Beyond',   msg: 'Outstanding work leading the dashboard project under tight deadlines!', time: '2h ago',    stars: 5 },
  { from: 'Michael D. Brown', to: 'Sarah K. Patel',  type: 'Team Player',      msg: 'Sarah always steps in to help. A true team cornerstone.',               time: 'Yesterday', stars: 4 },
  { from: 'Lauren R. Davis',  to: 'David M. Brooks', type: 'Innovation',       msg: "David's new reporting idea saves hours every week.",                    time: '2 days ago', stars: 5 },
  { from: 'James (Manager)',  to: 'Lauren R. Davis', type: 'Culture Champion', msg: 'Lauren keeps team spirit alive. Grateful for her energy.',              time: '3 days ago', stars: 4 },
];

/* Workload thresholds (active task count) */
const WL_OVERLOAD = 3;
const WL_MEDIUM   = 2;
