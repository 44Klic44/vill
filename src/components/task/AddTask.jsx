import React from 'react';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import { useForm } from "react-hook-form";

const AddTask = ({ open, setOpen, task = null }) => {


task = "";

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ defaultValues });
    
  const submitHandler =  (data) => {};


  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit( submitHandler)}>
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
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;