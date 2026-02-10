import clsx from "clsx";
import moment from "moment";
import React, { useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
// import { LuClipboardEdit } from "react-icons/lu"; // Иконки будем позже
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
// import { Chart, Loading, UserInfo } from "../components"; // Пока нет таких импортов
// import { useGetDasboardStatsQuery } from "../redux/slices/api/taskApiSlice"; // API пока нет
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils"; // Utils пока нет
import { useSelector } from "react-redux";

// Временные импорты для работы
import { Chart } from '../components/Chart';
import UserInfo from '../components/UserInfo';
import summary, { chartData, teamMembers } from '../assets/data';

// Временные константы (потом перенесем в utils)
const TASK_TYPE = {
  'todo': 'bg-red-500',
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

// Временная функция
const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Карточка статистики - точная копия оригинала
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
  // Временная замена API
  // const { data, isLoading, error } = useGetDasboardStatsQuery();
  const { user } = useSelector((state) => state.auth);
  const data = summary; // Используем локальные данные
  const isLoading = false; // Нет загрузки

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const totals = data?.tasks || {};

  // Временная замена Loading компонента
  // if (isLoading)
  //   return (
  //     <div className='py-10'>
  //       <Loading />
  //     </div>
  //   );

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
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
      icon: <MdKeyboardArrowUp />, // Временно вместо LuClipboardEdit
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
      <>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          {stats?.map(({ icon, bg, label, total }, index) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))}
        </div>

        <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
          <h4 className='text-xl text-gray-500 font-bold mb-2'>
            Chart by Priority
          </h4>
          <Chart data={chartData} />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
          {/* RECENT TASKS */}
          {data && <TaskTable tasks={data?.last10Tasks} />}
          {/* RECENT USERS */}
          {data && user?.isAdmin && <UserTable users={data?.users} />}
        </div>
      </>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>
          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            // Временная заглушка - все активны
            true ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          Active
        </p>
      </td>
      <td className='py-2 text-sm'>
        {user?.joinDate ? moment(user.joinDate).fromNow() : 'N/A'}
      </td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
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
      <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
        <td className='py-2'>
          <div className='flex items-center gap-2'>
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <p className='text-base text-black'>
              {task?.title}
            </p>
          </div>
        </td>
        <td className='py-2'>
          <div className={"flex gap-1 items-center"}>
            <span className={clsx("text-lg", PRIORITY_STYLES[task?.priority])}>
              {ICONS[task?.priority]}
            </span>
            <span className='capitalize'>{task?.priority}</span>
          </div>
        </td>

        <td className='py-2'>
          <div className='flex'>
            {teamMembersData.map((member, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={member} />
              </div>
            ))}
          </div>
        </td>

      </tr>
    );
  };

  return (
    <>
      <div
        className={clsx(
          "w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded",
          user?.isAdmin ? "md:w-2/3" : ""
        )}
      >
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;