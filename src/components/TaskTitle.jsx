import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className, onAddClick }) => {
  return (
    <button
      onClick={onAddClick}
      className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white dark:bg-[#1f1f1f] flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition'
    >
      <div className='flex gap-2 items-center'>
        <span className={`w-3 h-3 rounded-full ${className}`} />
        <p className='text-sm md:text-base text-gray-600 dark:text-gray-300'>
          {label}
        </p>
      </div>
      <IoMdAdd className='text-lg text-black dark:text-gray-300' />
    </button>
  );
};

export default TaskTitle;