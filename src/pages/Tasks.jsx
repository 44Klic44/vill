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

  const stageFilter = status
    ? status === 'in-progress'
      ? 'in progress'
      : status
    : '';

  // Выполняем запрос
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useGetAllTaskQuery({
    strQuery: stageFilter,
    isTrashed: false,
    search: '',
  });

  // Логируем всё, что происходит с запросом
  useEffect(() => {
    console.log('=== Tasks Component Debug ===');
    console.log('Status from URL:', status);
    console.log('Stage filter sent to API:', stageFilter);
    console.log('isLoading:', isLoading);
    console.log('isSuccess:', isSuccess);
    console.log('isError:', isError);
    
    if (isSuccess && data) {
      console.log('API Response (full):', data);
      console.log('Tasks array:', data.tasks);
      console.log('Number of tasks:', data.tasks?.length);
      
      // Если задачи есть, покажем первую для примера
      if (data.tasks?.length > 0) {
        console.log('First task:', data.tasks[0]);
      } else {
        console.warn('Tasks array is empty. No tasks match the filter.');
      }
    }
    
    if (isError) {
      console.error('Error details:', error);
    }
  }, [isLoading, isSuccess, isError, data, error, status, stageFilter]);

  // Показываем загрузку
  if (isLoading) {
    console.log('Rendering: Loading spinner');
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  // Показываем ошибку
  if (isError) {
    console.log('Rendering: Error message');
    return (
      <div className='text-red-500 p-4'>
        Ошибка загрузки задач: {error?.data?.message || error?.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  // Получаем массив задач (на случай, если data или data.tasks undefined)
  const tasks = data?.tasks || [];
  console.log('Rendering with tasks count:', tasks.length);

  return (
    <div className='w-full'>
      {/* Заголовок и кнопка создания задачи */}
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : 'Tasks'} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} selected={selected} setSelected={setSelected} />

      {!status && (
        <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
          <TaskTitle label='To Do' className={TASK_TYPE.todo} />
          <TaskTitle label='In Progress' className={TASK_TYPE['in progress']} />
          <TaskTitle label='Completed' className={TASK_TYPE.completed} />
        </div>
      )}

      {selected === 0 ? (
        <BoardView tasks={tasks} />
      ) : (
        <Table tasks={tasks} />
      )}

      <AddTask open={open} setOpen={setOpen} refetch={refetch} />
    </div>
  );
};

export default Tasks;