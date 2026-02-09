// assets/data.js
export const summary = {
  totalTasks: 10,
  last10Tasks: [
    { _id: 1, title: 'Разработать дизайн', priority: 'High', status: 'todo', dueDate: '2024-01-20' },
    { _id: 2, title: 'Написать API', priority: 'Medium', status: 'in progress', dueDate: '2024-01-22' },
    { _id: 3, title: 'Протестировать систему', priority: 'Low', status: 'completed', dueDate: '2024-01-18' },
    { _id: 4, title: 'Обновить документацию', priority: 'Medium', status: 'todo', dueDate: '2024-01-25' },
    { _id: 5, title: 'Исправить баги', priority: 'High', status: 'in progress', dueDate: '2024-01-19' },
    { _id: 6, title: 'Добавить анимации', priority: 'Low', status: 'todo', dueDate: '2024-01-30' },
    { _id: 7, title: 'Оптимизировать загрузку', priority: 'Medium', status: 'completed', dueDate: '2024-01-17' },
    { _id: 8, title: 'Реализовать поиск', priority: 'High', status: 'todo', dueDate: '2024-01-28' },
    { _id: 9, title: 'Добавить фильтры', priority: 'Low', status: 'in progress', dueDate: '2024-01-23' },
    { _id: 10, title: 'Настроить деплой', priority: 'Medium', status: 'todo', dueDate: '2024-02-01' },
  ],
  users: [
    { _id: 1, name: 'Алексей Иванов', email: 'alex@example.com', role: 'admin', joinDate: '2024-01-01' },
    { _id: 2, name: 'Мария Петрова', email: 'maria@example.com', role: 'user', joinDate: '2024-01-05' },
    { _id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'user', joinDate: '2024-01-10' },
    { _id: 4, name: 'Елена Васильева', email: 'elena@example.com', role: 'user', joinDate: '2024-01-12' },
  ],
  tasks: {
    todo: 6,
    "in progress": 3,
    completed: 1,
  },
  graphData: [
    { priority: 'Высокий', count: 4 },
    { priority: 'Средний', count: 4 },
    { priority: 'Низкий', count: 2 },
  ]
};

export default summary;