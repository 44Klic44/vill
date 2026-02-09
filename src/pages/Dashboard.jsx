import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";
import clsx from "clsx";
// import Loading from './Loading'; // Предполагается, что у вас есть компонент Loading
// import Chart from './Chart'; // Предполагается, что у вас есть компонент Chart
// import TaskTable from './TaskTable'; // Предполагается, что у вас есть компонент TaskTable
// import UserTable from './UserTable'; // Предполагается, что у вас есть компонент UserTable
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
// import { useGetDasboardStatsQuery } from '../services/api'; // Предполагается, что у вас есть API

// Локальные данные для отображения (если API не работает)
const localData = {
  summary: {
    totalTasks: 10,
    tasks: {
      todo: 6,
      "in progress": 3,
      completed: 1,
    },
  },
  graphData: [
    { priority: 'High', count: 5 },
    { priority: 'Medium', count: 3 },
    { priority: 'Low', count: 2 },
  ],
  last10Task: [
    { _id: 1, title: 'Разработать дизайн', priority: 'High', status: 'todo' },
    { _id: 2, title: 'Написать API', priority: 'Medium', status: 'in progress' },
    { _id: 3, title: 'Протестировать систему', priority: 'Low', status: 'completed' },
    { _id: 4, title: 'Обновить документацию', priority: 'Medium', status: 'todo' },
    { _id: 5, title: 'Исправить баги', priority: 'High', status: 'in progress' },
    { _id: 6, title: 'Добавить анимации', priority: 'Low', status: 'todo' },
    { _id: 7, title: 'Оптимизировать загрузку', priority: 'Medium', status: 'completed' },
    { _id: 8, title: 'Реализовать поиск', priority: 'High', status: 'todo' },
    { _id: 9, title: 'Добавить фильтры', priority: 'Low', status: 'in progress' },
    { _id: 10, title: 'Настроить деплой', priority: 'Medium', status: 'todo' },
  ],
  users: [
    { _id: 1, name: 'Алексей Иванов', email: 'alex@example.com', role: 'admin' },
    { _id: 2, name: 'Мария Петрова', email: 'maria@example.com', role: 'user' },
    { _id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'user' },
    { _id: 4, name: 'Елена Васильева', email: 'elena@example.com', role: 'user' },
  ],
};

const Card = ({ label, count, bg, icon }) => {
  return (
    <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
      <div className='h-full flex flex-1 flex-col justify-between'>
        <p className='text-base text-gray-600'>{label}</p>
        <span className='text-2xl font-semibold'>{count}</span>
        <span className='text-sm text-gray-400'>{"последний месяц"}</span>
      </div>
      <div
        className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center text-white",
          bg
        )}
      >
        {icon}
      </div>
    </div>
  );
};

const Dashboard = () => {
  // const { data: apiData, isLoading, error } = useGetDasboardStatsQuery();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Используем данные из API или локальные данные, если API не работает
  const data = localData;
  const totals = data?.summary?.tasks || {};

  // if (isLoading)
  //   return (
  //     <div className='py-10'>
  //       <Loading />
  //     </div>
  //   );

  // if (error) {
  //   console.log('Ошибка загрузки данных, используем локальные данные:', error);
  // }

  const stats = [
    {
      _id: "1",
      label: "ВСЕГО ЗАДАЧ",
      total: data?.summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "ЗАВЕРШЕННЫЕ",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "В ПРОЦЕССЕ",
      total: totals["in progress"] || 0,
      icon: <MdEditNote />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "К ВЫПОЛНЕНИЮ",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  
  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats?.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-500 font-bold mb-2'>
          Статистика по приоритетам
        </h4>
        {/* <Chart data={data?.graphData} /> */}
      </div>
      
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* ПОСЛЕДНИЕ ЗАДАЧИ */}
        {/* {data && <TaskTable tasks={data?.last10Task} />} */}
        
        {/* ПОЛЬЗОВАТЕЛИ */}
        {/* {data && user?.isAdmin && <UserTable users={data?.users} />} */}
      </div>
    </div>
  )
}

export default Dashboard