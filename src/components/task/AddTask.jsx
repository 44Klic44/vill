import React, { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import { useForm } from "react-hook-form";
import UserList from './UserList';
import { summary } from '../../assets/data'; // для доступа к users

const AddTask = ({ open, setOpen, task = null }) => {
  const defaultValues = task ? {
    title: task.title || '',
  } : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Массив ID выбранных пользователей
  const [teamIds, setTeamIds] = useState(task?.team || []);
  // Массив объектов пользователей для UserList
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Преобразование ID в объекты пользователей из summary.users
  useEffect(() => {
    const users = summary.users.filter(user => teamIds.includes(user._id.toString()));
    setSelectedUsers(users);
  }, [teamIds]);

  const submitHandler = (data) => {
    console.log('Form data:', data, 'Team IDs:', teamIds);
    // Здесь будет отправка данных (например, через API)
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Task title'
            type='text'
            name='title'
            label='Task Title'
            className='w-full rounded'
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />

          {/* Компонент выбора пользователей */}
          <UserList 
            selectedUsers={selectedUsers} 
            setSelectedUsers={(users) => {
              setSelectedUsers(users);
              setTeamIds(users.map(u => u._id.toString()));
            }} 
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {task ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;