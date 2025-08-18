import React, { useState } from 'react';
import { Plus, Check, Trash2, Flag, CheckSquare } from 'lucide-react';
import { Task } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onAddTask({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        completed: false,
      });
      setNewTask({ title: '', description: '', priority: 'medium' });
      setShowForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="pl-2 sm:pl-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Today's Tasks</h2>
          <p className="text-gray-600">{completedTasks.length} of {tasks.length} completed</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Task title..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-gray-300"
              autoFocus
            />
          </div>
          <div>
            <textarea
              placeholder="Description (optional)..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none text-white placeholder-gray-300"
              rows={2}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent w-full sm:w-auto text-white"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-white/80 hover:text-white transition-colors flex-1 sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex-1 sm:flex-none border border-white/20"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {pendingTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
            <p className="text-gray-500">Add your first task to get started!</p>
          </div>
        ) : (
          <>
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                getPriorityColor={getPriorityColor}
              />
            ))}
            
            {completedTasks.length > 0 && (
              <div className="pt-6 border-t border-white/20">
                <h3 className="text-lg font-medium text-white/80 mb-4">Completed</h3>
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggleTask}
                    onDelete={onDeleteTask}
                    getPriorityColor={getPriorityColor}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  getPriorityColor: (priority: string) => string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, getPriorityColor }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 transition-all hover:bg-white/20 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-6 h-6 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            task.completed
              ? 'bg-green-400 border-green-400 text-white'
              : 'border-white/50 hover:border-green-400'
          }`}
        >
          {task.completed && <Check className="w-3 h-3 sm:w-3 sm:h-3" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className={`font-medium text-sm sm:text-base ${
              task.completed ? 'line-through text-white/50' : 'text-white'
            }`}>
              {task.title}
            </h3>
            <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)} flex-shrink-0`} />
          </div>
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.completed ? 'text-white/40' : 'text-white/70'
            }`}>
              {task.description}
            </p>
          )}
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          className="text-white/50 hover:text-red-400 transition-colors flex-shrink-0 p-1"
        >
          <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};