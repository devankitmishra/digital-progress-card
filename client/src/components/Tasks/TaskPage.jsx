import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FilePenLine, Trash2 } from 'lucide-react';
// import AddTask from './AddTask';
// import CreateTask from './CreateTask';
import '../../styles/taskPage.css';

const TaskPage = () => {
  const [noTask, setNoTask] = useState(true)
  const [tasks, setTasks] = useState([
    'Khaibi',
    'Soibi'
  ])

  return (
    <div className="task-page ">
      <main>
        {noTask ? (
          <div className='flex items-center justify-center'>
          <div className="empty-state flex flex-row min-h-screen justify-center items-center ">
            <img src="/media/images/woman-sigh.png" alt="No tasks" className='no-task-img object-contain img-fluid size-1/4' />
            <p className='no-task text-2xl grid place-items-center gap-4'>No tasks available. Start by adding one!
            <Link to='/create-task'  className="add-task-container items-center">
                <button
                  className="add-task-button py-2 px-4 rounded shadow-md flex-shrink-0"
                >
                  Add Task
                </button>
            </Link>
            </p>
          </div>
            
            </div>
        ) : (
          <>
            <Link to='/create-task'>
              <div className="add-task-container flex float-right mt-4 pr-10 items-center">
                <button
                  className="add-task-button py-2 px-4 rounded shadow-md flex-shrink-0"
                >
                  Add Task
                </button>
              </div>
            </Link>
            <ul className="task-list overflow-auto p-10 w-3/5">
              {tasks.map((task) => (
                <div className='flex flex-col p-4'>
                  <li className="task-item flex flex-auto p-4 justify-between">
                    <span>{task}</span>
                    <div className='task-buttons flex flex-row'>
                      <button onClick={() => handleEditTask(index)} className='mr-4'><FilePenLine /></button>
                      <button onClick={() => handleDeleteTask(index)}><Trash2 /></button>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default TaskPage;
