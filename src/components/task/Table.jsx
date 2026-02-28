import React from 'react';
import TaskDialog from './TaskDialog';
import { formatDate, PRIOTITYSTYELS, TASK_TYPE } from '../../utils';
import clsx from 'clsx';

const Table = ({ tasks, refetch }) => {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] px-2 md:px-6 py-4 shadow-md rounded">
      <div className="overflow-x-auto md:h-[77vh]">
        <table className="w-full mb-5">
          <thead className='border-b border-gray-300 dark:border-gray-600'>
            <tr className='text-black dark:text-white text-left'>
              <th className='py-2 whitespace-nowrap'>Task Title</th>
              <th className='py-2 whitespace-nowrap'>Priority</th>
              <th className='py-2 whitespace-nowrap'>Stage</th>
              <th className='py-2 whitespace-nowrap'>Due Date</th>
              <th className='py-2 whitespace-nowrap text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className='border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-400/10'>
                <td className='py-2'>
                  <div className='flex items-center gap-2'>
                    <div className={clsx('w-3 h-3 rounded-full', TASK_TYPE[task.stage])} />
                    <p className='line-clamp-2 text-base text-black dark:text-gray-400 break-words max-w-[150px] sm:max-w-none'>
                      {task.title}
                    </p>
                  </div>
                </td>
                <td className='py-2 capitalize'>
                  <span className={clsx('px-2 py-1 rounded-full text-xs font-semibold', PRIOTITYSTYELS[task.priority])}>
                    {task.priority}
                  </span>
                </td>
                <td className='py-2 capitalize'>{task.stage}</td>
                <td className='py-2 text-sm whitespace-nowrap'>{formatDate(new Date(task.date))}</td>
                <td className='py-2 flex gap-1 justify-end'>
                  <TaskDialog task={task} refetch={refetch} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;