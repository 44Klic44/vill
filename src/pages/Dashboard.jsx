import clsx from "clsx";
import moment from "moment";
import "moment/locale/ru";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { MdEditNote } from "react-icons/md"; 
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";


import { Chart } from '../components/Chart';
import UserInfo from '../components/UserInfo';

// Данные
import summary, { chartData, teamMembers } from '../assets/data';

// ------------------------------------------------------------
// КОНСТАНТЫ 
// ------------------------------------------------------------
const TASK_TYPE = {
  todo: 'bg-red-500',
  'in progress': 'bg-yellow-500',
  completed: 'bg-green-500',
};

const PRIORITY_STYLES = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
};

const BGS = [
  'bg-blue-600',
  'bg-purple-600',
  'bg-green-600',
  'bg-yellow-600',
  'bg-red-600',
  'bg-pink-600',
];

const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// ------------------------------------------------------------
// КАРТОЧКА СТАТИСТИКИ
// ------------------------------------------------------------
const Card = ({ label, count, bg, icon }) => (
  <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
    <div className="h-full flex flex-1 flex-col justify-between">
      <p className="text-base text-gray-600">{label}</p>
      <span className="text-2xl font-semibold">{count}</span>
      <span className="text-sm text-gray-400">последний месяц</span>
    </div>
    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>
      {icon}
    </div>
  </div>
);

// ------------------------------------------------------------
// ТАБЛИЦА ЗАДАЧ 
// ------------------------------------------------------------
const TaskTable = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Team</th>
        <th className="py-2 hidden md:block">Created At</th>
       
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => {
    const teamMembersData = task.team.map(
      (memberId) =>
        teamMembers[memberId] || {
          name: memberId,
          title: 'Team Member',
          email: `${memberId.toLowerCase()}@example.com`,
          initials: memberId,
        }
    );

    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <div className={clsx("w-4 h-4 rounded-full flex-shrink-0", TASK_TYPE[task.stage])} />
            <p className="text-base text-black truncate max-w-[250px] md:max-w-sm">
              {task?.title}
            </p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex gap-1 items-center">
            <span className={clsx("text-lg flex-shrink-0", PRIORITY_STYLES[task?.priority])}>
              {ICONS[task?.priority]}
            </span>
            <span className="capitalize text-sm">{task?.priority}</span>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center">
            {teamMembersData.map((member, index) => (
              <div
                key={index}
                className={clsx(
                  "flex-shrink-0 w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS.length]
                )}
              >
                <UserInfo user={member} />
              </div>
            ))}
          </div>
        </td>
        
          
          <td className="py-2 hidden md:block">
            <span className="text-base text-gray-600">
              {moment(task?.date).fromNow()}
            </span>
          </td>
       
      </tr>
    );
  };

  return (
    <div
      className={clsx(
        "w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded",
        "md:w-2/3"
      )}
    >
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ------------------------------------------------------------
// ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ 
// ------------------------------------------------------------
const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
            <span className="text-center font-medium">{getInitials(user?.name)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
              {user.name}
            </p>
            <span className="text-xs text-gray-500 truncate max-w-[150px] block">
              {user?.title || user?.role}
            </span>
          </div>
        </div>
      </td>
      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Inactive"}
        </p>
      </td>
      <td className="py-2 text-sm text-gray-600">
        {moment(user?.createdAt || user?.joinDate).fromNow()}
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ------------------------------------------------------------
// ГЛАВНЫЙ КОМПОНЕНТ
// ------------------------------------------------------------
const Dashboard = () => {
  const data = summary;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const totals = data?.tasks || {};

  const stats = [
    {
      _id: '1',
      label: 'TOTAL TASK',
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: 'bg-[#1d4ed8]',
    },
    {
      _id: '2',
      label: 'COMPLETED TASK',
      total: totals.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: 'bg-[#0f766e]',
    },
    {
      _id: '3',
      label: 'TASK IN PROGRESS',
      total: totals['in progress'] || 0,
      icon: <MdEditNote />,
      bg: 'bg-[#f59e0b]',
    },
    {
      _id: '4',
      label: 'TODOS',
      total: totals.todo || 0,
      icon: <FaArrowsToDot />,
      bg: 'bg-[#be185d]',
    },
  ];

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-500 font-bold mb-2">
          Chart by Priority
        </h4>
        <Chart data={chartData} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable tasks={data?.last10Tasks} />
        <UserTable users={data?.users} />
      </div>
    </div>
  );
};

export default Dashboard;