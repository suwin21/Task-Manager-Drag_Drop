import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskList from './components/TaskList';
import TaskCreator from './components/TaskCreator';
import './App.css';

function App() {
  const [taskLists, setTaskLists] = useState([]); // Stores multiple task lists
  const [tasks, setTasks] = useState([]);         // Stores tasks not assigned yet

  // Add a new task list
  const addTaskList = (listName) => {
    if (listName) {
      setTaskLists([...taskLists, { id: `list-${taskLists.length}`, name: listName, tasks: [] }]);
    }
  };

  // Add a new task
  const addTask = (taskContent) => {
    if (taskContent) {
      setTasks([...tasks, { id: `task-${tasks.length}`, content: taskContent }]);
    }
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If there's no destination, exit
    if (!destination) return;

    // If dragging from unassigned tasks to a task list
    if (source.droppableId === "unassignedTasks" && destination.droppableId.startsWith("list-")) {
      const movedTask = tasks[source.index];
      const updatedTasks = Array.from(tasks);
      updatedTasks.splice(source.index, 1);
      setTasks(updatedTasks);

      const updatedTaskLists = taskLists.map(list => {
        if (list.id === destination.droppableId) {
          const updatedListTasks = Array.from(list.tasks);
          updatedListTasks.splice(destination.index, 0, movedTask);
          return { ...list, tasks: updatedListTasks };
        }
        return list;
      });

      setTaskLists(updatedTaskLists);
    }

    // Handle task reordering within the same task list
    else if (source.droppableId === destination.droppableId && destination.droppableId.startsWith("list-")) {
      const taskList = taskLists.find(list => list.id === source.droppableId);
      const reorderedTasks = Array.from(taskList.tasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      const updatedTaskLists = taskLists.map(list => {
        if (list.id === source.droppableId) {
          return { ...list, tasks: reorderedTasks };
        }
        return list;
      });

      setTaskLists(updatedTaskLists);
    }

    // If dragging from one task list to another
    else if (source.droppableId.startsWith("list-") && destination.droppableId.startsWith("list-")) {
      const sourceList = taskLists.find(list => list.id === source.droppableId);
      const destinationList = taskLists.find(list => list.id === destination.droppableId);
      
      const sourceTasks = Array.from(sourceList.tasks);
      const [removedTask] = sourceTasks.splice(source.index, 1);
      const destinationTasks = Array.from(destinationList.tasks);
      destinationTasks.splice(destination.index, 0, removedTask);

      const updatedTaskLists = taskLists.map(list => {
        if (list.id === source.droppableId) {
          return { ...list, tasks: sourceTasks };
        } else if (list.id === destination.droppableId) {
          return { ...list, tasks: destinationTasks };
        }
        return list;
      });

      setTaskLists(updatedTaskLists);
    }
  };

  return (
    <div className="App">
      <h1>Task Management App</h1>

      {/* Task List Creation */}
      <button onClick={() => {
        const listName = prompt("Enter task list name");
        addTaskList(listName);
      }}>
        + Add Task List
      </button>

      {/* Render the task lists and task creation only if there are task lists */}
      {taskLists.length > 0 && (
        <>
          <div className="task-lists">
            <DragDropContext onDragEnd={onDragEnd}>
              {/* Render task lists */}
              {taskLists.map((list) => (
                <TaskList key={list.id} list={list} />
              ))}

              {/* Droppable area for unassigned tasks */}
              <Droppable droppableId="unassignedTasks">
                {(provided) => (
                  <div
                    className="task-list unassigned-tasks"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h3>Unassigned Tasks</h3>
                    {tasks.map((task, index) => (
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
            </DragDropContext>
          </div>

          {/* Task Creation Form */}
          <TaskCreator addTask={addTask} />
        </>
      )}
    </div>
  );
}

export default App;
