import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import {
  BGS,
  PRIOTITYSTYELS,
  TASK_TYPE,
  formatDate,
} from "../utils/index";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { teamMembers } from "../assets/data"; // ← импортируем для преобразования

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  // Преобразуем ID участника в объект для UserInfo
  const getUserFromId = (id) => {
    return teamMembers[id] || { name: id, title: "", email: "" };
  };

  // Значения по умолчанию для счётчиков (чтобы не было undefined)
  const activities = task?.activities?.length ?? 0;
  const assets = task?.assets?.length ?? 0;
  const subTasks = task?.subTasks?.length ?? 0;
  console.log("TaskCard рендерится для задачи:", task?.title);

  return (
    <div className='w-full h-fit bg-white dark:bg-[#1f1f1f] shadow-md p-4 rounded'>
      {/* Верхняя часть: приоритет + кнопка */}
      <div className='w-full flex justify-between'>
        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium",
            PRIOTITYSTYELS[task?.priority]
          )}
        >
          <span className='text-lg'>{ICONS[task?.priority]}</span>
          <span className='uppercase'>{task?.priority} Priority</span>
        </div>
        {user?.isAdmin && <TaskDialog task={task} />}
      </div>

      {/* Заголовок и индикатор стадии */}
      <div className='flex items-center gap-2 mt-2'>
        <div className={clsx('w-4 h-4 rounded-full', TASK_TYPE[task?.stage])} />
        <h4 className='line-clamp-1 text-black dark:text-white'>
          {task?.title}
        </h4>
      </div>

      {/* Дата */}
      <span className='text-sm text-gray-600 dark:text-gray-400'>
        {formatDate(new Date(task?.date))}
      </span>

      {/* Разделитель */}
      <div className='w-full border-t border-gray-200 dark:border-gray-700 my-2' />

      {/* Нижняя часть: иконки и аватарки */}
      <div className='flex items-center justify-between mb-2'>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{activities}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />
            <span>{assets}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />
            <span>{subTasks}</span>
          </div>
        </div>

        {/* Аватарки участников */}
        <div className='flex flex-row-reverse'>
          {task?.team?.length > 0 &&
            task.team.map((memberId, index) => {
              const member = getUserFromId(memberId);
              return (
                <div
                  key={index}
                  className={clsx(
                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                    BGS[index % BGS.length]
                  )}
                >
                  <UserInfo user={member} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;