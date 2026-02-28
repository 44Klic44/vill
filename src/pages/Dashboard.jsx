import React, { useState, useEffect } from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import "moment/locale/ru";
import clsx from "clsx";
import { RiProgress2Line } from "react-icons/ri";
import { useGetDasboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import { Chart } from "../components/Chart";
import UserInfo from "../components/UserInfo";


// Константы и утилиты

const TASK_TYPE = {
  todo: "bg-red-500",
  "in progress": "bg-yellow-500",
  completed: "bg-green-500",
};

const PRIORITY_STYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
  normal: "text-gray-600",
};

const BGS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-pink-600",
];

const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Хук для определения мобильного устройства
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
};


// Карточка статистики

const Card = ({ label, count, bg, icon }) => (
  <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
    <div className="h-full flex flex-1 flex-col justify-between">
      <p className="text-base text-gray-600">{label}</p>
      <span className="text-2xl font-semibold">{count}</span>
      <span className="text-sm text-gray-400">110 last month</span>
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


// Мобильная карточка задачи

const MobileTaskCard = ({ task }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
    normal: <MdKeyboardArrowRight />,
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className={clsx("w-3 h-3 rounded-full", TASK_TYPE[task.stage])} />
            <p className="font-medium line-clamp-2">{task.title}</p>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className={clsx("flex items-center gap-1", PRIORITY_STYLES[task.priority])}>
              {ICONS[task.priority]}
              <span className="capitalize">{task.priority}</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{moment(task.createdAt).fromNow()}</span>
          </div>
        </div>
        {/* Аватарки команды (первые 3) */}
        {task.team?.length > 0 && (
          <div className="flex -space-x-2">
            {task.team.slice(0, 3).map((member) => (
              <div
                key={member._id}
                className="w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] border-2 border-white"
              >
                <UserInfo user={member} />
              </div>
            ))}
            {task.team.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] border-2 border-white">
                +{task.team.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// Мобильная карточка пользователя

const MobileUserCard = ({ user }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded shadow flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-violet-700 text-white flex items-center justify-center text-sm font-bold">
      {getInitials(user.name)}
    </div>
    <div className="flex-1">
      <p className="font-medium">{user.name}</p>
      <p className="text-xs text-gray-500">{user.role}</p>
      <div className="flex items-center gap-2 mt-1">
        <span
          className={clsx(
            "px-2 py-0.5 rounded-full text-xs",
            user.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user.isActive ? "Active" : "Disabled"}
        </span>
        <span className="text-xs text-gray-500">{moment(user.createdAt).fromNow()}</span>
      </div>
    </div>
  </div>
);


// Таблица задач (десктоп)

const TaskTable = ({ tasks, users }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
    normal: <MdKeyboardArrowRight />,
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
    const teamMembers = (task.team || [])
      .map((member) => {
        if (typeof member === "string") {
          return users?.find((u) => u._id === member);
        }
        return member;
      })
      .filter(Boolean);

    return (
      <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
            <p className="text-base text-black">{task.title}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex gap-1 items-center">
            <span className={clsx("text-lg", PRIORITY_STYLES[task.priority])}>
              {ICONS[task.priority]}
            </span>
            <span className="capitalize">{task.priority}</span>
          </div>
        </td>
        <td className="py-2">
          <div className="flex">
            {teamMembers.map((member, index) => (
              <div
                key={member._id || index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
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
            {moment(task.createdAt).fromNow()}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <div className="overflow-x-auto" style={{ height: '77vh' }}>
        <table className="w-full">
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


// Таблица пользователей (десктоп)

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
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
            <span className="text-center">{getInitials(user?.name)}</span>
          </div>
          <div>
            <p>{user.name}</p>
            <span className="text-xs text-black">{user?.role}</span>
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
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className="py-2 text-sm">
        {moment(user?.createdAt).fromNow()}
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-full mb-5">
          <TableHeader />
          <tbody>
            {users?.map((user) => (
              <TableRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// Главный компонент Dashboard

const Dashboard = () => {
  const { data, isLoading, error } = useGetDasboardStatsQuery();
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const totals = data.tasks || {};
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <RiProgress2Line/>,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals.todo || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  return (
    <div className="h-full py-4">
      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* График по приоритетам */}
      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">
          Chart by Priority
        </h4>
        <Chart data={data.graphData} />
      </div>

      {/* Таблицы задач и пользователей */}
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {isMobile ? (
          // Мобильная версия: карточки
          <>
            <div className="w-full space-y-2">
              <h3 className="text-lg font-semibold mb-2">Latest Tasks</h3>
              {data.last10Task?.map(task => (
                <MobileTaskCard key={task._id} task={task} />
              ))}
            </div>
            <div className="w-full space-y-2 mt-4">
              <h3 className="text-lg font-semibold mb-2">Team Members</h3>
              {data.users?.map(user => (
                <MobileUserCard key={user._id} user={user} />
              ))}
            </div>
          </>
        ) : (
          // Десктопная версия: таблицы
          <>
            <TaskTable tasks={data.last10Task} users={data.users} />
            <UserTable users={data.users} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;