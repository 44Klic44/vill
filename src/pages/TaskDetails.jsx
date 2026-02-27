import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Импорты из проекта
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import Loading from "../components/Loader";
import {
  PRIOTITYSTYELS,
  TASK_TYPE,
  formatDate,
  getInitials,
} from "../utils/index";

// Импортируем хуки из API
import {
  useGetSingleTaskQuery,
  usePostTaskActivityMutation,
} from "../redux/slices/api/taskApiSlice";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

// Типы активностей для чекбоксов
const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);

  // Загружаем задачу по id
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSingleTaskQuery(id);

  if (isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  if (isError || !data?.task) {
    return (
      <div className='text-red-500 p-8 text-center'>
        Ошибка загрузки задачи: {error?.data?.message || error?.message || 'Задача не найдена'}
      </div>
    );
  }

  const task = data.task;

  return (
    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-auto'>
      <h1 className='text-2xl text-gray-600 font-bold'>{task?.title}</h1>

      <Tabs tabs={TABS} selected={selected} setSelected={setSelected}>
        {/* Панель 1: Детали задачи */}
        <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto'>
          {/* Левая колонка — детали задачи */}
          <div className='w-full md:w-1/2 space-y-8'>
            <div className='flex items-center gap-5'>
              <div
                className={clsx(
                  "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                  PRIOTITYSTYELS[task?.priority],
                  bgColor[task?.priority]
                )}
              >
                <span className='text-lg'>{ICONS[task?.priority]}</span>
                <span className='uppercase'>{task?.priority} Priority</span>
              </div>
              <div className={clsx("flex items-center gap-2")}>
                <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                <span className='text-black uppercase'>{task?.stage}</span>
              </div>
            </div>

            <p className='text-gray-500'>
              Created At: {formatDate(new Date(task?.date))}
            </p>

            <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
              <div className='space-x-2'>
                <span className='font-semibold'>Sub-Task :</span>
                <span>{task?.subTasks?.length ?? 0}</span>
              </div>
            </div>

            {/* Описание задачи */}
            <div className='space-y-2'>
              <p className='text-gray-600 font-semibold text-sm'>DESCRIPTION</p>
              <p className='text-gray-700'>{task?.description || 'No description'}</p>
            </div>

            {/* Команда (team) */}
            <div className='space-y-4 py-6'>
              <p className='text-gray-600 font-semibold text-sm'>TASK TEAM</p>
              <div className='space-y-3'>
                {task?.team?.length > 0 ? (
                  task.team.map((member) => (
                    <div key={member._id} className='flex gap-4 py-2 items-center border-t border-gray-200'>
                      <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm bg-blue-600">
                        <span className='text-center'>{getInitials(member.name)}</span>
                      </div>
                      <div>
                        <p className='text-lg font-semibold'>{member.name}</p>
                        <span className='text-gray-500'>{member.title}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500'>No team assigned</p>
                )}
              </div>
            </div>

            {/* Подзадачи */}
            <div className='space-y-4 py-6'>
              <p className='text-gray-500 font-semibold text-sm'>SUB-TASKS</p>
              <div className='space-y-8'>
                {task?.subTasks?.length > 0 ? (
                  task.subTasks.map((el, index) => (
                    <div key={index} className='flex gap-3'>
                      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50'>
                        <MdTaskAlt className='text-violet-600' size={26} />
                      </div>
                      <div className='space-y-1'>
                        <div className='flex gap-2 items-center'>
                          <span className='text-sm text-gray-500'>
                            {formatDate(new Date(el?.date))}
                          </span>
                          {el?.tag && (
                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>
                          )}
                        </div>
                        <p className='text-gray-700'>{el?.title}</p>
                        {el.isCompleted && (
                          <span className='text-xs text-green-600'>Completed</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500'>No sub-tasks</p>
                )}
              </div>
            </div>

            {/* Ссылки (links) */}
            {task?.links?.length > 0 && (
              <div className='space-y-4 py-6'>
                <p className='text-gray-500 font-semibold text-sm'>LINKS</p>
                <ul className='list-disc pl-5'>
                  {task.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:underline break-all'
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Правая колонка — раньше была assets, теперь убрана */}
          <div className='w-full md:w-1/2 space-y-8'>
            {/* Можно оставить пустым или добавить что-то другое */}
            <p className='text-lg font-semibold'>Additional Info</p>
            {/* Например, можно показать здесь какие-то метаданные или оставить пустым */}
          </div>
        </div>

        {/* Панель 2: Activities */}
        <Activities activity={task?.activities} taskId={task._id} refetch={refetch} />
      </Tabs>
    </div>
  );
};

// Компонент активностей
const Activities = ({ activity, taskId, refetch }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const [postActivity, { isLoading }] = usePostTaskActivityMutation();

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.warning('Please enter activity text');
      return;
    }
    try {
      const payload = {
        type: selected.toLowerCase(),
        activity: text,
      };
      await postActivity({ data: payload, id: taskId }).unwrap();
      toast.success('Activity added');
      setText('');
      refetch(); // обновляем задачу
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add activity');
    }
  };

  const Card = ({ item, isLast }) => {
    const userName = item?.by?.name || 'Unknown';
    const type = item?.type?.toLowerCase() || 'commented';
    return (
      <div className='flex space-x-4'>
        <div className='flex flex-col items-center flex-shrink-0'>
          <div className='w-10 h-10 flex items-center justify-center'>
            {TASKTYPEICON[type] || TASKTYPEICON.commented}
          </div>
          {!isLast && <div className='w-0.5 bg-gray-300 flex-1 my-1'></div>}
        </div>

        <div className='flex flex-col gap-y-1 mb-8'>
          <p className='font-semibold'>{userName}</p>
          <div className='text-gray-500 space-y-2'>
            <span className='capitalize'>{item?.type || 'commented'}</span>
            <span className='text-sm'>{moment(item?.date).fromNow()}</span>
          </div>
          <div className='text-gray-700'>{item?.activity}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
      <div className='w-full md:w-1/2'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>
        <div className='w-full'>
          {activity?.length > 0 ? (
            activity.map((el, index) => (
              <Card key={el._id || index} item={el} isLast={index === activity.length - 1} />
            ))
          ) : (
            <p className='text-gray-500'>No activities yet</p>
          )}
        </div>
      </div>

      <div className='w-full md:w-1/3'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>Add Activity</h4>
        <div className='w-full flex flex-wrap gap-5'>
          {act_types.map((item) => (
            <div key={item} className='flex gap-2 items-center'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={selected === item}
                onChange={() => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type ......'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          />
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type='button'
              label='Submit'
              onClick={handleSubmit}
              className='bg-blue-600 text-white rounded'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;