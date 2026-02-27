import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdContentCopy, MdRemoveRedEye } from 'react-icons/md';
import { useDuplicateTaskMutation, useTrashTastMutation } from '../../redux/slices/api/taskApiSlice';

const TaskDialog = ({ task }) => {
  const [duplicateTask] = useDuplicateTaskMutation();
  const [trashTask] = useTrashTastMutation();

  const handleDuplicate = async () => {
    if (window.confirm('Duplicate this task?')) {
      try {
        await duplicateTask(task._id).unwrap();
        alert('Task duplicated');
      } catch (error) {
        alert(error?.data?.message || 'Failed to duplicate');
      }
    }
  };

  const handleTrash = async () => {
    if (window.confirm('Move this task to trash?')) {
      try {
        await trashTask({ id: task._id }).unwrap();
        alert('Task moved to trash');
      } catch (error) {
        alert(error?.data?.message || 'Failed to trash task');
      }
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <HiDotsVertical className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/task/${task._id}`}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <MdRemoveRedEye className="mr-2 h-5 w-5" aria-hidden="true" />
                  View Task
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDuplicate}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <MdContentCopy className="mr-2 h-5 w-5" aria-hidden="true" />
                  Duplicate
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleTrash}
                  className={`${
                    active ? 'bg-red-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FaRegTrashAlt className="mr-2 h-5 w-5" aria-hidden="true" />
                  Move to Trash
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TaskDialog;