import React, { useState } from 'react';
import { Plus, Target, X } from 'lucide-react';
import { Goal } from '../types';

interface GoalSettingProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id' | 'current' | 'isCompleted' | 'createdAt' | 'progress'>) => void;
  onUpdateGoal: (id: string, current: number) => void;
  onDeleteGoal: (id: string) => void;
}

export const GoalSetting: React.FC<GoalSettingProps> = ({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'health' as const,
    target: 1,
    unit: 'times',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title.trim()) {
      onAddGoal(newGoal);
      setNewGoal({
        title: '',
        description: '',
        category: 'health' as const,
        target: 1,
        unit: 'times',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Goal Setting</h2>
          <p className="text-gray-600">Set and track your personal goals</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Goal</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                     <input
             type="text"
             placeholder="Goal title..."
             value={newGoal.title}
             onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
             onKeyPress={(e) => {
               if (e.key === 'Enter' && newGoal.title.trim()) {
                 handleSubmit(e);
               }
             }}
             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
             autoFocus
           />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="health">Health</option>
              <option value="productivity">Productivity</option>
              <option value="learning">Learning</option>
              <option value="wellness">Wellness</option>
              <option value="fitness">Fitness</option>
              <option value="personal">Personal</option>
            </select>
            
            <input
              type="number"
              min="1"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 1 })}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            <select
              value={newGoal.unit}
              onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="times">times</option>
              <option value="days">days</option>
              <option value="pages">pages</option>
              <option value="hours">hours</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No goals yet</h3>
            <p className="text-gray-600">Start setting your personal goals today!</p>
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full capitalize">
                    {goal.category}
                  </span>
                </div>
                
                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  className="w-8 h-8 rounded-full border-2 border-red-300 hover:border-red-500 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateGoal(goal.id, Math.max(0, goal.current - 1))}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateGoal(goal.id, goal.current + 1)}
                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
