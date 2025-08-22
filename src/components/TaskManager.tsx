import React, { useState, useCallback } from 'react';
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

  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  const handleSubmit = useCallback((e: React.FormEvent) => {
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
  }, [newTask, onAddTask]);

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  }, []);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Današnji zadaci",
          addTask: "Dodaj zadatak",
          taskTitle: "Naziv zadatka",
          description: "Opis (opciono)",
          priority: "Prioritet",
          lowPriority: "Nizak prioritet",
          mediumPriority: "Srednji prioritet",
          highPriority: "Visok prioritet",
          cancel: "Otkaži",
          noTasks: "Još nema zadataka",
          addFirstTask: "Dodajte svoj prvi zadatak da započnete!",
          completed: "Završeno",
          of: "od",
          completedText: "završeno",
          submit: "Submit"
        };
      case 'zh':
        return {
          title: "今日任务",
          addTask: "添加任务",
          taskTitle: "任务标题",
          description: "描述 (可选)",
          priority: "优先级",
          lowPriority: "低优先级",
          mediumPriority: "中优先级",
          highPriority: "高优先级",
          cancel: "取消",
          noTasks: "暂无任务",
          addFirstTask: "添加您的第一个任务开始吧！",
          completed: "已完成",
          of: "共",
          completedText: "已完成",
          submit: "提交"
        };
      default: // English
        return {
          title: "Today's Tasks",
          addTask: "Add Task",
          taskTitle: "Task title",
          description: "Description (optional)",
          priority: "Priority",
          lowPriority: "Low Priority",
          mediumPriority: "Medium Priority",
          highPriority: "High Priority",
          cancel: "Cancel",
          noTasks: "No tasks yet",
          addFirstTask: "Add your first task to get started!",
          completed: "Completed",
          of: "of",
          completedText: "completed",
          submit: "Submit"
        };
    }
  };

  const text = getText();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{completedTasks.length} {text.of} {tasks.length} {text.completedText}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0 touch-manipulation"
        >
          {text.addTask}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4 shadow-sm">
          <div>
            <input
              type="text"
              placeholder={text.taskTitle}
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-400 text-base"
              autoFocus
            />
          </div>
          <div>
            <textarea
              placeholder={text.description}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-400 text-base"
              rows={2}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="px-3 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto text-black dark:text-black text-base"
            >
              <option value="low">{text.lowPriority}</option>
              <option value="medium">{text.mediumPriority}</option>
              <option value="high">{text.highPriority}</option>
            </select>
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex-1 sm:flex-none text-base"
              >
                {text.cancel}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex-1 sm:flex-none text-base touch-manipulation font-semibold"
              >
                {text.submit}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {pendingTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">{text.noTasks}</h3>
            <p className="text-gray-500 text-base">{text.addFirstTask}</p>
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
              <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">{text.completed}</h3>
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
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggle}
          className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 touch-manipulation ${
            task.completed
              ? 'bg-green-400 border-green-400 text-white'
              : 'border-gray-400 hover:border-green-400'
          }`}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className={`font-medium text-base ${
              task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
            }`}>
              {task.title}
            </h3>
            <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)} flex-shrink-0`} />
          </div>
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {task.description}
            </p>
          )}
        </div>
        
        <button
          onClick={handleDelete}
          className="text-gray-500 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors flex-shrink-0 p-2 touch-manipulation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};