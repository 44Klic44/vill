import React, { useState } from "react";
import clsx from "clsx";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { toast } from "sonner";

// Импорты компонентов и утилит
import Title from "../components/Title";
import Button from "../components/Button";
import summary from "../assets/data";
import {
  formatDate,
  PRIOTITYSTYELS,
  TASK_TYPE,
} from "../utils/index";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  // Временные данные (позже заменить на API)
  const data = {
    tasks: summary.last10Tasks, // для демонстрации
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 dark:border-gray-600'>
      <tr className='text-black dark:text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
          <p className='w-full line-clamp-2 text-base text-black dark:text-white'>
            {item.title}
          </p>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>{item?.priority}</span>
        </div>
      </td>
      <td className='py-2 capitalize'>{item.stage}</td>
      <td className='py-2 text-sm text-gray-600 dark:text-gray-400'>
        {formatDate(new Date(item?.date))}
      </td>
    </tr>
  );

  return (
    <div className='w-full md:px-1 px-0 mb-6'>
      <div className='flex items-center justify-between mb-8'>
        <Title title='Trashed Tasks' />

        {data?.tasks?.length > 0 && (
          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='Restore All'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5'
              // onClick={() => restoreAllClick()}
            />
            <Button
              label='Delete All'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
              // onClick={() => deleteAllClick()}
            />
          </div>
        )}
      </div>

      {data?.tasks?.length > 0 ? (
        <div className='bg-white dark:bg-[#1f1f1f] px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {data.tasks.map((tk, id) => (
                  <TableRow key={tk._id || id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='w-full flex justify-center py-10'>
          <p className='text-lg text-gray-500'>No Trashed Task</p>
        </div>
      )}
    </div>
  );
};

export default Trash;