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
import { Chart } from '../components/Chart'; // Импортируем Chart
// import TaskTable from './TaskTable'; // Предполагается, что у вас есть компонент TaskTable
// import UserTable from './UserTable'; // Предполагается, что у вас есть компонент UserTable
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
// import { useGetDasboardStatsQuery } from '../services/api'; // Предполагается, что у вас есть API

// Импортируем данные из вашего файла
import { chartData } from '../assets/data';
import summary from '../assets/data';

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
  // const data = localData;
  const totals = summary?.tasks || {};

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
      total: summary?.totalTasks || 0,
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
          Chart by Priority
        </h4>
        <Chart data={chartData} /> {/* Используем chartData из data.js */}
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