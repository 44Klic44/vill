// assets/data.js
export const summary = {
  totalTasks: 12,
  last10Tasks: [
    { 
      _id: 1, 
      title: 'Разработать дизайн', 
      priority: 'High', 
      status: 'todo', 
      stage: 'in progress', 
      review: 'Duplicate', 
      date: '2024-01-20',
      assets: [],
      team: [{}]
    },
    { 
      _id: 2, 
      title: 'Написать API', 
      priority: 'Medium', 
      status: 'in progress', 
      stage: 'in progress', 
      review: 'Duplicate', 
      date: '2024-01-22',
      assets: [],
      team: [{}]
    },
    { 
      _id: 3, 
      title: 'Протестировать систему', 
      priority: 'Low', 
      status: 'completed', 
      stage: 'completed', 
      review: 'Duplicate', 
      date: '2024-01-18',
      assets: [],
      team: [{}]
    },
    { 
      _id: 4, 
      title: 'Обновить документацию', 
      priority: 'Medium', 
      status: 'todo', 
      stage: 'todo', 
      review: 'Duplicate', 
      date: '2024-01-25',
      assets: [],
      team: [{}]
    },
    { 
      _id: 5, 
      title: 'Исправить баги', 
      priority: 'High', 
      status: 'in progress', 
      stage: 'in progress', 
      review: 'Duplicate', 
      date: '2024-01-19',
      assets: [],
      team: [{}]
    },
    { 
      _id: 6, 
      title: 'Добавить анимации', 
      priority: 'Low', 
      status: 'todo', 
      stage: 'todo', 
      review: 'Duplicate', 
      date: '2024-01-30',
      assets: [],
      team: [{}]
    },
    { 
      _id: 7, 
      title: 'Оптимизировать загрузку', 
      priority: 'Medium', 
      status: 'completed', 
      stage: 'completed', 
      review: 'Duplicate', 
      date: '2024-01-17',
      assets: [],
      team: [{}]
    },
    { 
      _id: 8, 
      title: 'Реализовать поиск', 
      priority: 'High', 
      status: 'todo', 
      stage: 'todo', 
      review: 'Duplicate', 
      date: '2024-01-28',
      assets: [],
      team: [{}]
    },
    { 
      _id: 9, 
      title: 'Добавить фильтры', 
      priority: 'Low', 
      status: 'in progress', 
      stage: 'in progress', 
      review: 'Duplicate', 
      date: '2024-01-23',
      assets: [],
      team: [{}]
    },
    { 
      _id: 10, 
      title: 'Настроить деплой', 
      priority: 'Medium', 
      status: 'todo', 
      stage: 'todo', 
      review: 'Duplicate', 
      date: '2024-02-01',
      assets: [],
      team: [{}]
    },
  ],
  users: [
    { _id: 1, name: 'Алексей Иванов', email: 'alex@example.com', role: 'admin', joinDate: '2024-01-01' },
    { _id: 2, name: 'Мария Петрова', email: 'maria@example.com', role: 'user', joinDate: '2024-01-05' },
    { _id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'user', joinDate: '2024-01-10' },
    { _id: 4, name: 'Елена Васильева', email: 'elena@example.com', role: 'user', joinDate: '2024-01-12' },
  ],
  tasks: {
    todo: 8,
    "in progress": 4,
    completed: 2,
  },
  // Данные для графика в формате, который ожидает Chart компонент
  graphData: [
    { name: 'High', total: 4 },
    { name: 'Medium', total: 4 },
    { name: 'Low', total: 4 },
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

// Данные для задач (примерная структура)
export const tasks = [
  {
    id: "65", 
    title: 'Разработать дизайн', 
    priority: 'High', 
    stage: 'in progress', 
    date: '2024-01-20',
    assets: [],
    team: [{}],
  },
  {
    id: "66", 
    title: 'Написать API', 
    priority: 'Medium', 
    stage: 'todo', 
    date: '2024-01-22',
    assets: [],
    team: [{}],
  },
  {
    id: "67", 
    title: 'Протестировать систему', 
    priority: 'Low', 
    stage: 'completed', 
    date: '2024-01-18',
    assets: [],
    team: [{}],
  },
];

export default summary;