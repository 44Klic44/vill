import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdAttachFile,
  MdOutlineMessage,
  MdChecklist,
} from "react-icons/md";
import { toast } from "sonner";

// Импорты из вашего проекта
import {
  BGS,
  PRIOTITYSTYELS,
  TASK_TYPE,
  formatDate,
} from "../../utils/index";
import UserInfo from "../UserInfo";
import Button from "../Button";
import TaskColor from "./TaskColor";
import { teamMembers } from "../../assets/data";

// Временные компоненты (пока не созданы отдельные файлы)
const TaskAssets = ({ activities, subTasks, assets }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <MdOutlineMessage />
      <span>{activities}</span>
    </div>
    <div className="flex items-center gap-1">
      <MdAttachFile />
      <span>{assets}</span>
    </div>
    <div className="flex items-center gap-1">
      <MdChecklist />
      <span>{subTasks}</span>
    </div>
  </div>
);

const ConfirmatioDialog = ({ open, setOpen, onClick }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} label="Cancel" />
          <Button onClick={onClick} label="Delete" className="bg-red-600 text-white" />
        </div>
      </div>
    </div>
  );
};

const AddTask = ({ open, setOpen, task }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p>Add/Edit Task (not implemented yet)</p>
        <Button onClick={() => setOpen(false)} label="Close" />
      </div>
    </div>
  );
};

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  // Заглушка для удаления (замените на реальную мутацию, когда появится)
  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClickHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      // Здесь будет вызов API
      toast.success("Task deleted successfully (demo)");
      setTimeout(() => {
        setOpenDialog(false);
        // window.location.reload(); // если нужно обновить список
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300 dark:border-gray-600'>
      <tr className='w-full text-black dark:text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
        <th className='py-2 text-right'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => {
    // Преобразуем team (строки) в объекты для UserInfo
    const teamMembersData = task?.team?.map(id => teamMembers[id] || {
      name: id,
      title: "",
      email: "",
      _id: id,
    }) || [];

    return (
      <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
        <td className='py-2'>
          <Link to={`/task/${task._id}`}>
            <div className='flex items-center gap-2'>
              <TaskColor className={TASK_TYPE[task.stage]} />
              <p className='w-full line-clamp-2 text-base text-black dark:text-white'>
                {task?.title}
              </p>
            </div>
          </Link>
        </td>

        <td className='py-2'>
          <div className={"flex gap-1 items-center"}>
            <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
              {ICONS[task?.priority]}
            </span>
            <span className='capitalize line-clamp-1'>
              {task?.priority} Priority
            </span>
          </div>
        </td>

        <td className='py-2'>
          <span className='text-sm text-gray-600 dark:text-gray-400'>
            {formatDate(new Date(task?.date))}
          </span>
        </td>

        <td className='py-2'>
          <TaskAssets
            activities={task?.activities?.length ?? 0}
            subTasks={task?.subTasks?.length ?? 0}
            assets={task?.assets?.length ?? 0}
          />
        </td>

        <td className='py-2'>
          <div className='flex'>
            {teamMembersData.map((member, index) => (
              <div
                key={member._id || index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS.length]
                )}
              >
                <UserInfo user={member} />
              </div>
            ))}
          </div>
        </td>

        <td className='py-2 flex gap-2 md:gap-4 justify-end'>
          <Button
            className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
            label='Edit'
            type='button'
            onClick={() => editClickHandler(task)}
          />

          <Button
            className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
            label='Delete'
            type='button'
            onClick={() => deleteClicks(task._id)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {tasks?.map((task, index) => (
                <TableRow key={task._id || index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;