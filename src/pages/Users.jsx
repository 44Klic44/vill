// src/pages/Users.jsx
import React, { useState } from "react";
import clsx from "clsx";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import Button from "../components/Button";
import Title from "../components/Title";
import AddUser from "../components/AddUser";
import Dialogs, { UserAction } from "../components/task/Dialogs";
import { useGetTeamListsQuery, useDeleteUserMutation, useUserActionMutation } from "../redux/slices/api/userApiSlice.js";

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
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetTeamListsQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const userActionHandler = async () => {
    try {
      await userAction({ isActive: !selected?.isActive, id: selected?._id }).unwrap();
      toast.success("User status updated successfully");
      setSelected(null);
      refetch();
      setOpenAction(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

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

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">{getInitials(user.name)}</span>
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
        <Button label="Edit" type="button" onClick={() => editClick(user)} className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"/>
        <Button label="Delete" type="button" onClick={() => deleteClick(user?._id)} className="text-red-700 hover:text-red-500 font-semibold sm:px-0"/>
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" />
          <Button label="Add New User" icon={<IoMdAdd className="text-lg" />} className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5" onClick={() => setOpen(true)}/>
        </div>
        <div className="bg-white dark:bg-[#1f1f1f] px-2 md:px-4 py-4 shadow rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.map((user) => <TableRow key={user._id} user={user} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} userData={selected} />

      <Dialogs open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} type="delete" msg="Are you sure you want to delete this user?" />

      <UserAction open={openAction} setOpen={setOpenAction} onClick={userActionHandler} />
    </>
  );
};

export default Users;