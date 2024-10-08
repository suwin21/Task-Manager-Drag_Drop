import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

function TaskList({ list }) {
  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{list.name}</h3>
          {list.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  className="task"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {task.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
