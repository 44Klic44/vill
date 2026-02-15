import Title from '../components/Title';
import Loading from '../components/Loader';
import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import Tabs from '../components/tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import summary from "../assets/data";
import Table from '../components/task/Table';

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const { status } = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Преобразуем статус из URL в формат данных
  const stageFilter = status
    ? status === 'in-progress'
      ? 'in progress'
      : status
    : null;

  // Фильтруем задачи по статусу, если он указан
  const filteredTasks = stageFilter
    ? summary?.last10Tasks?.filter(task => task.stage === stageFilter)
    : summary?.last10Tasks;

  return loading ? (
    <div className='py-10'><Loading /></div>
  ) : (
    <div className='w-full'>
      {/* Заголовок и кнопка создания задачи */}
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      {/* Вкладки (без children — только переключение) */}
      <Tabs tabs={TABS} selected={selected} setSelected={setSelected} />

      {/* Блоки со статусами задач (только если нет статуса в URL) */}
      {!status && (
        <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
          <TaskTitle label='To Do' className={TASK_TYPE.todo} />
          <TaskTitle label='In Progress' className={TASK_TYPE["in progress"]} />
          <TaskTitle label='Completed' className={TASK_TYPE.completed} />
        </div>
      )}

      {/* Контент в зависимости от выбранной вкладки */}
    {selected === 0 ? (
  <BoardView tasks={filteredTasks} />
) : (
  <div><Table tasks={filteredTasks} /></div>   // ← было tasks, стало filteredTasks
)}
    </div>
  );
};

export default Tasks;