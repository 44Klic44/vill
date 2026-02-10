// assets/data.js

// Создаем объект с участниками команды
export const teamMembers = {
  CA: { 
    name: "Carlos Alvarez", 
    title: "Frontend Developer", 
    email: "carlos@example.com",
    initials: "CA"
  },
  JS: { 
    name: "Jane Smith", 
    title: "Backend Developer", 
    email: "jane@example.com",
    initials: "JS"
  },
  AJ: { 
    name: "Alex Johnson", 
    title: "Full Stack Developer", 
    email: "alex@example.com",
    initials: "AJ"
  },
  EW: { 
    name: "Emma Wilson", 
    title: "UI/UX Designer", 
    email: "emma@example.com",
    initials: "EW"
  },
  JD: { 
    name: "John Doe", 
    title: "Project Manager", 
    email: "john@example.com",
    initials: "JD"
  }
};

export const summary = {
  totalTasks: 12,
  last10Tasks: [
    { 
      _id: 1, 
      title: 'Test task', 
      priority: 'high', 
      stage: 'todo', 
      review: 'Duplicate',
      date: '2024-01-15',
      team: ['CA', 'JS', 'AJ']
    },
    { 
      _id: 2, 
      title: 'Duplicate - Duplicate - Review Code Changes', 
      priority: 'medium', 
      stage: 'in progress',
      review: 'Duplicate',
      date: '2024-01-10',
      team: ['AJ', 'EW']
    },
    { 
      _id: 3, 
      title: 'Website Project Proposal Review', 
      priority: 'medium', 
      stage: 'todo',
      review: 'Duplicate',
      date: '2024-01-05',
      team: ['AJ', 'EW']
    },
    { 
      _id: 4, 
      title: 'Task Manager Youtube Video', 
      priority: 'low', 
      stage: 'completed',
      review: 'Duplicate',
      date: '2024-01-18',
      team: ['AJ', 'EW']
    },
    { 
      _id: 5, 
      title: 'Bug Fixing', 
      priority: 'high', 
      stage: 'in progress',
      review: 'Duplicate',
      date: '2024-01-20',
      team: ['CA', 'JD', 'JS']
    },
    { 
      _id: 6, 
      title: 'Duplicate - Website Project Proposal Changes', 
      priority: 'medium', 
      stage: 'todo',
      review: 'Duplicate',
      date: '2024-01-14',
      team: ['AJ', 'EW']
    },
    { 
      _id: 7, 
      title: 'Duplicate - Website Project Proposal Normal', 
      priority: 'medium', 
      stage: 'completed',
      review: 'Duplicate',
      date: '2024-01-03',
      team: ['CA', 'JD', 'JS']
    },
    { 
      _id: 8, 
      title: 'Review Code Changes', 
      priority: 'medium', 
      stage: 'in progress',
      review: 'Duplicate',
      date: '2024-01-22',
      team: ['AJ', 'EW']
    },
    { 
      _id: 9, 
      title: 'Website Project Proposal', 
      priority: 'high', 
      stage: 'todo',
      review: 'Duplicate',
      date: '2024-01-17',
      team: ['CA', 'JD', 'JS']
    },
    { 
      _id: 10, 
      title: 'Design System Implementation', 
      priority: 'low', 
      stage: 'in progress',
      review: 'Duplicate',
      date: '2024-01-25',
      team: ['EW', 'AJ']
    },
  ],
  users: [
    { 
      _id: 1, 
      name: 'Алексей Иванов', 
      email: 'alex@example.com', 
      role: 'admin', 
      joinDate: '2024-01-01',
      title: 'Team Lead'
    },
    { 
      _id: 2, 
      name: 'Мария Петрова', 
      email: 'maria@example.com', 
      role: 'user', 
      joinDate: '2024-01-05',
      title: 'Frontend Developer'
    },
    { 
      _id: 3, 
      name: 'Дмитрий Сидоров', 
      email: 'dmitry@example.com', 
      role: 'user', 
      joinDate: '2024-01-10',
      title: 'Backend Developer'
    },
    { 
      _id: 4, 
      name: 'Елена Васильева', 
      email: 'elena@example.com', 
      role: 'user', 
      joinDate: '2024-01-12',
      title: 'UI/UX Designer'
    },
  ],
  tasks: {
    todo: 5,
    "in progress": 4,
    completed: 2,
  },
  graphData: [
    { name: 'High', total: 3 },
    { name: 'Medium', total: 5 },
    { name: 'Low', total: 2 },
  ]
};

// Данные для компонента Chart (используются в Dashboard.jsx)
export const chartData = [
  {
    name: "High",
    total: 14,
  },
  {
    name: "Medium",
    total: 10,
  },
  {
    name: "Low",
    total: 13,
  },
];

export default summary;