import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import Title from '../components/Title';
import Loading from '../components/Loader';
import Button from '../components/Button';
import Tabs from '../components/tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import Table from '../components/task/Table';
import AddTask from '../components/task/AddTask';

import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';

const TABS = [
  { title: 'Board View', icon: <MdGridView /> },
  { title: 'List View', icon: <FaList /> },
];

const TASK_TYPE = {
  todo: 'bg-blue-600',
  'in progress': 'bg-yellow-600',
  completed: 'bg-green-600',
};

const Tasks = () => {
  const { status } = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [initialStage, setInitialStage] = useState('todo');

  const stageFilter = status
    ? status === 'in-progress'
      ? 'in progress'
      : status
    : '';

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useGetAllTaskQuery({
    strQuery: stageFilter,
    isTrashed: false,
    search: '',
  });

  const handleAddTask = (stage) => {
    setInitialStage(stage);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-red-500 p-4'>
        Ошибка загрузки задач: {error?.data?.message || error?.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  const tasks = data?.tasks || [];

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : 'Tasks'} />
        {!status && (
          <Button
            onClick={() => handleAddTask('todo')}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} selected={selected} setSelected={setSelected} />

      {!status && (
        <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
          <TaskTitle
            label='To Do'
            className={TASK_TYPE.todo}
            onAddClick={() => handleAddTask('todo')}
          />
          <TaskTitle
            label='In Progress'
            className={TASK_TYPE['in progress']}
            onAddClick={() => handleAddTask('in progress')}
          />
          <TaskTitle
            label='Completed'
            className={TASK_TYPE.completed}
            onAddClick={() => handleAddTask('completed')}
          />
        </div>
      )}

      {selected === 0 ? (
  <BoardView tasks={tasks} refetch={refetch} />
) : (
  <Table tasks={tasks} refetch={refetch} />
)}

      <AddTask
        open={open}
        setOpen={setOpen}
        refetch={refetch}
        initialStage={initialStage}
      />
    </div>
  );
};

export default Tasks;