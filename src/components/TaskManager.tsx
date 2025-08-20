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

  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

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
          completedText: "završeno"
        };
      case 'zh':
        return {
          title: "今日任务",
          addTask: "添加任务",
          taskTitle: "任务标题",
          description: "描述（可选）",
          priority: "优先级",
          lowPriority: "低优先级",
          mediumPriority: "中优先级",
          highPriority: "高优先级",
          cancel: "取消",
          noTasks: "暂无任务",
          addFirstTask: "添加您的第一个任务开始使用！",
          completed: "已完成",
          of: "共",
          completedText: "已完成"
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
          completedText: "completed"
        };
    }
  };

  const text = getText();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 md:mb-6 space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{completedTasks.length} {text.of} {tasks.length} {text.completedText}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm md:text-base"
        >
          {text.addTask}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg border border-white/20 space-y-3 sm:space-y-4">
          <div>
            <input
              type="text"
              placeholder={text.taskTitle}
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-2 sm:px-3 py-1 sm:py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-gray-300 text-xs sm:text-sm md:text-base"
              autoFocus
            />
          </div>
          <div>
            <textarea
              placeholder={text.description}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-2 sm:px-3 py-1 sm:py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none text-white placeholder-gray-300 text-xs sm:text-sm md:text-base"
              rows={2}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent w-full sm:w-auto text-white text-xs sm:text-sm md:text-base"
            >
              <option value="low">{text.lowPriority}</option>
              <option value="medium">{text.mediumPriority}</option>
              <option value="high">{text.highPriority}</option>
            </select>
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 sm:px-4 py-1 sm:py-2 text-white/80 hover:text-white transition-colors flex-1 sm:flex-none text-xs sm:text-sm md:text-base"
              >
                {text.cancel}
              </button>
              <button
                type="submit"
                className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex-1 sm:flex-none border border-white/20 text-xs sm:text-sm md:text-base"
              >
                {text.addTask}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3 sm:space-y-4">
        {pendingTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <CheckSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">{text.noTasks}</h3>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base">{text.addFirstTask}</p>
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
              <div className="pt-4 sm:pt-6 border-t border-white/20">
                <h3 className="text-base sm:text-lg font-medium text-white/80 mb-3 sm:mb-4">{text.completed}</h3>
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
    <div className={`bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-white/20 transition-all hover:bg-white/20 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-2 sm:space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            task.completed
              ? 'bg-green-400 border-green-400 text-white'
              : 'border-white/50 hover:border-green-400'
          }`}
        >
          {task.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <h3 className={`font-medium text-xs sm:text-sm md:text-base ${
              task.completed ? 'line-through text-white/50' : 'text-white'
            }`}>
              {task.title}
            </h3>
            <Flag className={`w-3 h-3 sm:w-4 sm:h-4 ${getPriorityColor(task.priority)} flex-shrink-0`} />
          </div>
          {task.description && (
            <p className={`text-xs sm:text-sm mt-1 ${
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
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};