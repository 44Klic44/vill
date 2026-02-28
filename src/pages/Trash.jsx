import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from 'react-icons/md';
import { toast } from 'sonner';

import Title from '../components/Title';
import Button from '../components/Button';
import Loading from '../components/Loader';
import Dialogs from '../components/task/Dialogs';
import TaskColor from '../components/task/TaskColor';
import { PRIOTITYSTYELS, TASK_TYPE, formatDate } from '../utils/index';
import {
  useGetAllTaskQuery,
  useDeleteRestoreTastMutation,
} from '../redux/slices/api/taskApiSlice';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
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

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState('delete');
  const [selected, setSelected] = useState('');

  const isMobile = useMediaQuery('(max-width: 640px)');

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllTaskQuery({
    strQuery: '',
    isTrashed: true,
    search: '',
  });

  const [deleteRestoreTask] = useDeleteRestoreTastMutation();

  const tasks = data?.tasks || [];

  const deleteClick = (id) => {
    setType('delete');
    setSelected(id);
    setMsg('Do you want to permanently delete this task?');
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType('restore');
    setMsg('Do you want to restore this task?');
    setOpenDialog(true);
  };

  const deleteRestoreHandler = async () => {
    try {
      switch (type) {
        case 'delete':
          await deleteRestoreTask({ id: selected, actionType: 'delete' }).unwrap();
          toast.success('Task deleted permanently');
          break;
        case 'restore':
          await deleteRestoreTask({ id: selected, actionType: 'restore' }).unwrap();
          toast.success('Task restored');
          break;
        default:
          break;
      }
      refetch();
      setOpenDialog(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong');
      setOpenDialog(false);
    }
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
        Error loading trash: {error?.data?.message || error?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Tasks' />
        </div>

        {tasks.length > 0 ? (
          isMobile ? (
            // Мобильная версия: карточки
            <div className='space-y-2'>
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className='bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center'
                >
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium truncate'>{task.title}</p>
                    <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                      <span className={clsx('px-2 py-0.5 rounded-full text-white', TASK_TYPE[task.stage])}>
                        {task.stage}
                      </span>
                      <span>{formatDate(new Date(task.date))}</span>
                    </div>
                  </div>
                  <div className='flex gap-2 ml-2'>
                    <button
                      onClick={() => restoreClick(task._id)}
                      className='p-2 text-gray-600 hover:text-green-600'
                      title='Restore'
                    >
                      <MdOutlineRestore size={20} />
                    </button>
                    <button
                      onClick={() => deleteClick(task._id)}
                      className='p-2 text-gray-600 hover:text-red-600'
                      title='Delete permanently'
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Десктопная версия: таблица
            <div className='bg-white dark:bg-[#1f1f1f] px-2 md:px-6 py-4 shadow-md rounded'>
              <div className='overflow-x-auto'>
                <table className='w-full mb-5'>
                  <thead className='border-b border-gray-300 dark:border-gray-600'>
                    <tr className='text-black dark:text-white text-left'>
                      <th className='py-2'>Task Title</th>
                      <th className='py-2'>Priority</th>
                      <th className='py-2'>Stage</th>
                      <th className='py-2 line-clamp-1'>Modified On</th>
                      <th className='py-2 text-right'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr
                        key={task._id}
                        className='border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-400/10'
                      >
                        <td className='py-2'>
                          <div className='flex items-center gap-2'>
                            <TaskColor className={TASK_TYPE[task.stage]} />
                            <p className='line-clamp-2 text-base text-black dark:text-gray-400'>
                              {task.title}
                            </p>
                          </div>
                        </td>
                        <td className='py-2 capitalize'>
                          <div className='flex gap-1 items-center'>
                            <span className={clsx('text-lg', PRIOTITYSTYELS[task.priority])}>
                              {ICONS[task.priority]}
                            </span>
                            <span>{task.priority}</span>
                          </div>
                        </td>
                        <td className='py-2 capitalize'>{task.stage}</td>
                        <td className='py-2 text-sm'>{formatDate(new Date(task.date))}</td>
                        <td className='py-2 flex gap-1 justify-end'>
                          <Button
                            icon={<MdOutlineRestore className='text-xl text-gray-500' />}
                            onClick={() => restoreClick(task._id)}
                          />
                          <Button
                            icon={<MdDelete className='text-xl text-red-600' />}
                            onClick={() => deleteClick(task._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className='w-full flex justify-center py-10'>
            <p className='text-lg text-gray-500'>No Trashed Tasks</p>
          </div>
        )}
      </div>

      <Dialogs
        key={selected || 'dialog'}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteRestoreHandler}
        msg={msg}
        type={type}
        setMsg={setMsg}
        setType={setType}
      />
    </>
  );
};

export default Trash;