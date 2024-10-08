import React, { useState } from 'react';

function TaskCreator({ addTask }) {
  const [taskContent, setTaskContent] = useState('');

  const handleAddTask = () => {
    if (taskContent.trim()) {
      addTask(taskContent);
      setTaskContent('');
    }
  };

  return (
    <div className="task-creator">
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskCreator;
