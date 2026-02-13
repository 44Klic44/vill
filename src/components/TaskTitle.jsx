import { IoMdAdd } from "react-icons/io";
import React from "react";

const TaskTitle = ({ label, className, onAddClick }) => {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white dark:bg-[#1f1f1f] flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
    
        <span className={`w-3 h-3 rounded-full ${className}`} />
        <p className='text-sm md:text-base text-gray-600 dark:text-gray-300'>
          {label}
        </p>
      </div>

 
      <button 
        onClick={onAddClick ? onAddClick : () => {}} 
        className='hidden md:block'
        aria-label={`Add task to ${label}`}
      >
        <IoMdAdd className='text-lg text-black dark:text-gray-300' />
      </button>
    </div>
  );
};

export default TaskTitle;