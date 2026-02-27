import React from 'react';
import TaskCard from './TaskCard';

const BoardView = ({ tasks, refetch }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} refetch={refetch} />
      ))}
    </div>
  );
};

export default BoardView;