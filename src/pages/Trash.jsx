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

import Title from "../components/Title";
import Button from "../components/Button";
import Loading from "../components/Loader";
import Dialogs from "../components/task/Dialogs";
import TaskColor from "../components/task/TaskColor";
import { PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils/index";
import { summary } from "../assets/data";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const data = { tasks: summary.last10Tasks };
  const isLoading = false;

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setMsg("Do you want to permanently delete this task?");
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore this task?");
    setOpenDialog(true);
  };

  const deleteRestoreHandler = async () => {
    try {
      switch (type) {
        case "delete":
          toast.success(`Task ${selected} deleted (demo)`);
          break;
        case "deleteAll":
          toast.success("All tasks deleted (demo)");
          break;
        case "restore":
          toast.success(`Task ${selected} restored (demo)`);
          break;
        case "restoreAll":
          toast.success("All tasks restored (demo)");
          break;
        default:
          break;
      }
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 dark:border-gray-600'>
      <tr className='text-black dark:text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
        <th className='py-2 text-right'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <TaskColor className={TASK_TYPE[item.stage]} />
          <p className='w-full line-clamp-2 text-base text-black dark:text-gray-400'>
            {item?.title}
          </p>
        </div>
      </td>
      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className=''>{item?.priority}</span>
        </div>
      </td>
      <td className='py-2 capitalize'>{item?.stage}</td>
      <td className='py-2 text-sm'>{formatDate(new Date(item?.date))}</td>
      <td className='py-2 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Tasks' />
          {data?.tasks?.length > 0 && (
            <div className='flex gap-2 md:gap-4 items-center'>
              <Button
                label='Restore All'
                icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
                className='flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5'
                onClick={restoreAllClick}
              />
              <Button
                label='Delete All'
                icon={<MdDelete className='text-lg hidden md:flex' />}
                className='flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
                onClick={deleteAllClick}
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
                  {data?.tasks?.map((tk, id) => (
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

      <Dialogs
        key={selected || 'dialog'}  // ← ключ для принудительного обновления
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