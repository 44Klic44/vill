import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';
import { useTrashTastMutation, useChangeTaskStageMutation } from '../../redux/slices/api/taskApiSlice';
import EditTaskModal from './EditTaskModal';

const TaskDialog = ({ task, refetch }) => {
  const [trashTask] = useTrashTastMutation();
  const [changeStage] = useChangeTaskStageMutation();
  const [editOpen, setEditOpen] = useState(false);
  const [showStageMenu, setShowStageMenu] = useState(false);

  const handleTrash = async () => {
    if (window.confirm('Move this task to trash?')) {
      try {
        await trashTask({ id: task._id }).unwrap();
        alert('Task moved to trash');
        refetch();
      } catch (error) {
        alert(error?.data?.message || 'Failed to trash task');
      }
    }
  };

  const handleStageChange = async (newStage) => {
    try {
      await changeStage({ id: task._id, stage: newStage }).unwrap();
      alert(`Stage changed to ${newStage}`);
      refetch();
      setShowStageMenu(false);
    } catch (error) {
      alert(error?.data?.message || 'Failed to change stage');
    }
  };

  return (
    <>
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
          <Menu.Items className="absolute right-0 mt-2 w-48 sm:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
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
                    onClick={() => setEditOpen(true)}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <FaRegEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                    Edit
                  </button>
                )}
              </Menu.Item>

              {/* Change Stage с внутренним подменю */}
              <div className="px-2 py-1">
                <button
                  onClick={() => setShowStageMenu(!showStageMenu)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                >
                  <span>Change Stage</span>
                  <span>{showStageMenu ? '▲' : '▼'}</span>
                </button>
                {showStageMenu && (
                  <div className="mt-1 space-y-1 pl-2">
                    {['todo', 'in progress', 'completed'].map(stage => (
                      <button
                        key={stage}
                        onClick={() => handleStageChange(stage)}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded capitalize"
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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

      <EditTaskModal
        task={task}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        refetch={refetch}
      />
    </>
  );
};

export default TaskDialog;