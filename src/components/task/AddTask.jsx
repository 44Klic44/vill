import React, { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import { useForm } from "react-hook-form";
import UserList from './UserList';
import SelectList from './SelectList';
import { summary } from '../../assets/data';
import { BiImages } from 'react-icons/bi';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task = null }) => {
  const defaultValues = task ? {
    title: task.title || '',
    date: task.date ? new Date(task.date).toISOString().split('T')[0] : '',
  } : {
    title: '',
    date: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[1]); // MEDIUM
  const [assets, setAssets] = useState([]);
  const [uploading] = useState(false); // пока не реализуем загрузку

  // Состояния для выбранных пользователей
  const [teamIds, setTeamIds] = useState(task?.team?.map(id => id.toString()) || []);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Преобразование ID в объекты пользователей из summary.users
  useEffect(() => {
    const users = summary.users.filter(user => teamIds.includes(user._id.toString()));
    setSelectedUsers(users);
  }, [teamIds]);

  const handleSelect = (e) => {
    setAssets(Array.from(e.target.files));
  };

  const submitHandler = (data) => {
    const formData = {
      ...data,
      stage: stage.toLowerCase(),
      priority: priority.toLowerCase(),
      team: teamIds,
      assets: assets.map(file => file.name), // или сохранить файлы для последующей отправки
    };
    console.log('Form data:', formData);
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
          {/* Название задачи */}
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

          {/* Выбор команды */}
          <UserList 
            selectedUsers={selectedUsers} 
            setSelectedUsers={(users) => {
              setSelectedUsers(users);
              setTeamIds(users.map(u => u._id.toString()));
            }} 
          />

          {/* Stage и Priority в одной строке */}
          <div className='flex gap-4'>
            <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
            <SelectList
              label='Priority Level'
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
          </div>

          {/* Дата и добавление ассетов в одной строке */}
          <div className='flex gap-4'>
            <div className='w-full'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>
            <div className='w-full flex items-center justify-center mt-4'>
              <label
                className='flex items-center gap-1 text-base text-gray-600 hover:text-blue-600 cursor-pointer my-4'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={handleSelect}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <BiImages size={20} />
                <span>Add Assets</span>
              </label>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className='mt-6 mb-4 flex justify-end gap-4'>
          <button
            type='button'
            className='px-5 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded hover:bg-gray-100'
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={uploading}
            className='px-8 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50'
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;