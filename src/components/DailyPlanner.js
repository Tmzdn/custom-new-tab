import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2 } from 'lucide-react';

const DailyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [lastResetDate, setLastResetDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Check if it's a new day and reset tasks if needed
  useEffect(() => {
    const today = new Date().toDateString();
    
    // Load last reset date from localStorage
    const storedLastReset = localStorage.getItem('lastResetDate');
    
    // If it's a new day, clear all tasks
    if (storedLastReset !== today) {
      localStorage.removeItem('tasks');
      localStorage.setItem('lastResetDate', today);
      setLastResetDate(today);
      setTasks([]);
    } else {
      // Load existing tasks for the current day
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      setLastResetDate(today);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  // Save edited task
  const saveEdit = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: editingText.trim() } : task
    ));
    setEditingId(null);
    setEditingText('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Determine heading based on whether tasks exist
  const heading = tasks.length === 0 
    ? "What are we going to do today?" 
    : "Today's Tasks";

  return (
    <div className="card h-full flex flex-col">
      {/* Dynamic heading that transforms based on task count */}
      <h1 className="heading-main">
        {heading}
      </h1>

      {/* Task input form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="input-field flex-1"
            autoFocus
          />
          <button
            type="submit"
            className="btn-accent flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </form>

      {/* Tasks list with drag and drop */}
      <div className="task-list min-h-[120px]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {tasks.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <p className="text-lg">No tasks yet. Start by adding one above!</p>
                  </div>
                ) : (
                  tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            userSelect: 'none',
                            willChange: 'transform',
                          }}
                          className={`bg-[#23263a] rounded-xl p-4 flex items-center gap-4 transition-all duration-300 ease-in-out cursor-grab select-none border-2 ${
                            snapshot.isDragging
                              ? 'shadow-2xl scale-105 z-20 border-purple-400'
                              : 'hover:shadow-lg hover:scale-[1.02] border-transparent'
                          } ${task.completed ? 'opacity-60' : ''}`}
                        >
                          {/* Custom styled checkbox */}
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="task-checkbox"
                          />
                          
                          {/* Task text with inline editing */}
                          <span className="flex-1">
                            {editingId === task.id ? (
                              <input
                                type="text"
                                value={editingText}
                                autoFocus
                                onChange={e => setEditingText(e.target.value)}
                                onBlur={() => saveEdit(task.id)}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') saveEdit(task.id);
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                                className="input-field bg-[#23263a] px-2 py-1 text-lg"
                              />
                            ) : (
                              <span
                                className={`text-lg transition-all duration-200 cursor-pointer ${
                                  task.completed 
                                    ? 'line-through text-gray-500' 
                                    : 'text-gray-100'
                                }`}
                                onClick={() => startEditing(task)}
                                tabIndex={0}
                                role="button"
                                aria-label="Edit task"
                              >
                                {task.text}
                              </span>
                            )}
                          </span>
                          
                          {/* Delete button */}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DailyPlanner; 