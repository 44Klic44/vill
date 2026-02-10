import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import clsx from "clsx";
import { Chart } from '../components/Chart';
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import UserInfo from '../components/UserInfo';
import moment from 'moment';
import 'moment/locale/ru';

// Импортируем данные
import summary, { chartData, teamMembers } from '../assets/data';

// Константы для стилей
const TASK_TYPE = {
  'todo': 'bg-blue-500',
  'in progress': 'bg-yellow-500',
  'completed': 'bg-green-500'
};

const PRIORITY_STYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600"
};

const BGS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-pink-600"
];

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

const TaskTable = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => {
    // Получаем объекты участников по их инициалам
    const teamMembersData = task.team.map(memberId => teamMembers[memberId] || {
      name: memberId,
      title: 'Team Member',
      email: `${memberId.toLowerCase()}@example.com`,
      initials: memberId
    });

    return (
      <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'>
        <td className='py-3'>
          <div className='flex items-center gap-2'>
            <div
              className={clsx("w-3 h-3 rounded-full", TASK_TYPE[task.stage])}
            />
            <p className='text-base text-black'>
              {task?.title}
            </p>
          </div>
        </td>
        <td className='py-3'>
          <div className={"flex gap-1 items-center"}>
            <span className={clsx("text-lg", PRIORITY_STYLES[task.priority])}>
              {ICONS[task.priority]}
            </span>
            <span className='capitalize'>{task.priority}</span>
          </div>
        </td>
        <td className='py-3'>
          <div className='flex'>
            {teamMembersData.map((member, index) => (
              <div
                key={index}
                className={clsx(
                  "w-8 h-8 rounded-full text-white flex items-center justify-center text-sm -mr-2 border-2 border-white cursor-pointer hover:z-10 hover:scale-110 transition-transform",
                  BGS[index % BGS?.length]
                )}
                title={`${member.name} - ${member.title}`}
              >
                <UserInfo user={member} />
              </div>
            ))}
          </div>
        </td>
        <td className='py-3 hidden md:block'>
          <span className='text-base text-gray-600'>
            {moment(task?.date).fromNow()}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full md:w-2/3 bg-white px-4 pt-4 pb-4 shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Recent Tasks</h3>
        <span className="text-sm text-gray-500">Total: {tasks?.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task) => (
              <TableRow key={task._id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const totals = summary?.tasks || {};

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <MdEditNote />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  
  return (
    <div className='h-full py-4'>
      {/* Статистические карточки */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats?.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* График */}
      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-500 font-bold mb-2'>
          Chart by Priority
        </h4>
        <Chart data={chartData} />
      </div>
      
      {/* Таблица задач */}
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <TaskTable tasks={summary.last10Tasks} />
        
        {/* Блок для пользователей (если админ) */}
        {user?.isAdmin && (
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h3>
            <div className="space-y-3">
              {summary.users.slice(0, 4).map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.title}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard