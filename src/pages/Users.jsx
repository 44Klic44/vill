import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import Button from "../components/Button";
import Title from "../components/Title";
import AddUser from "../components/AddUser";
import Dialogs, { UserAction } from "../components/task/Dialogs";
import {
  useGetTeamListsQuery,
  useDeleteUserMutation,
  useUserActionMutation,
} from "../redux/slices/api/userApiSlice.js";

// Вспомогательная функция для получения инициалов из имени
const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Users = () => {
  const [open, setOpen] = useState(false);          // модалка добавления/редактирования
  const [openDialog, setOpenDialog] = useState(false); // модалка подтверждения удаления
  const [openAction, setOpenAction] = useState(false); // модалка изменения статуса
  const [selected, setSelected] = useState(null);    // выбранный пользователь (для редактирования, удаления, смены статуса)

  // Запрос списка пользователей с сервера (кеш автоматически инвалидируется мутациями)
  const { data, refetch } = useGetTeamListsQuery();

  // Мутации
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  // Сброс выбранного пользователя при закрытии модалки добавления/редактирования
  useEffect(() => {
    if (!open) {
      setSelected(null);
    }
  }, [open]);

  // Обработчик для кнопки "Add New User" – сбрасывает выделение и открывает пустую форму
  const addNewClick = () => {
    setSelected(null);
    setOpen(true);
  };

  // Клик по кнопке "Delete"
  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  // Клик по кнопке "Edit"
  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  // Клик по статусу пользователя (Active/Disabled)
  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  // Подтверждение изменения статуса
  const userActionHandler = async () => {
    try {
      await userAction({ isActive: !selected?.isActive, id: selected?._id }).unwrap();
      toast.success("User status updated successfully");
      setSelected(null);
      refetch();        // можно оставить для немедленного обновления, хотя теги уже должны сработать
      setOpenAction(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  // Подтверждение удаления
  const deleteHandler = async () => {
    try {
      await deleteUser(selected).unwrap();
      toast.success("User deleted successfully");
      setSelected(null);
      refetch();
      setOpenDialog(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  // Заголовок таблицы (вынесен для читаемости)
  const TableHeader = () => (
    <thead className="border-b border-gray-300 dark:border-gray-600">
      <tr className="text-black dark:text-white text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Title</th>
        <th className="py-2">Email</th>
        <th className="py-2">Role</th>
        <th className="py-2">Active</th>
        <th className="py-2 text-right">Actions</th>
      </tr>
    </thead>
  );

  // Строка таблицы для одного пользователя
  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>
      <td className="p-2">{user.title}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.role}</td>
      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justify-end">
        <Button
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
          className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
        />
        <Button
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?._id)}
          className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        {/* Заголовок и кнопка добавления */}
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={addNewClick} // используем новый обработчик
          />
        </div>

        {/* Таблица пользователей */}
        <div className="bg-white dark:bg-[#1f1f1f] px-2 md:px-4 py-4 shadow rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.map((user) => (
                  <TableRow key={user._id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Модалка добавления/редактирования */}
      <AddUser open={open} setOpen={setOpen} userData={selected} />

      {/* Модалка подтверждения удаления */}
      <Dialogs
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
        type="delete"
        msg="Are you sure you want to delete this user?"
      />

      {/* Модалка изменения статуса */}
      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;