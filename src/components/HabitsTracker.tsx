import React, { useState } from 'react';
import { Plus, Check, Flame } from 'lucide-react';
import { Habit } from '../types';
import { getTodayString, getWeekDates } from '../utils/dateUtils';

interface HabitsTrackerProps {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => void;
  onToggleHabit: (id: string, date: string) => void;
}

const habitIcons = ['💧', '🏃‍♂️', '🧘‍♀️', '📚', '🥗', '😴', '✍️', '🎵'];
const habitColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'];

export const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  habits,
  onAddHabit,
  onToggleHabit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    icon: '💧',
    color: 'bg-blue-500',
    target: 1,
    unit: 'time',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.name.trim()) {
      onAddHabit(newHabit);
      setNewHabit({
        name: '',
        icon: '💧',
        color: 'bg-blue-500',
        target: 1,
        unit: 'time',
      });
      setShowForm(false);
    }
  };

  const today = getTodayString();
  const weekDates = getWeekDates();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Habits Tracker</h2>
          <p className="text-gray-600">Build consistent daily habits</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-3 sm:px-4 sm:py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Add Habit</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <div>
            <input
              type="text"
              placeholder="Habit name..."
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="grid grid-cols-4 gap-2">
                {habitIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewHabit({ ...newHabit, icon })}
                    className={`p-3 sm:p-2 text-xl rounded border-2 transition-colors ${
                      newHabit.icon === icon ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="grid grid-cols-4 gap-2">
                {habitColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewHabit({ ...newHabit, color })}
                    className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full ${color} border-2 transition-all ${
                      newHabit.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={newHabit.target}
                onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) || 1 })}
                className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={newHabit.unit}
                onChange={(e) => setNewHabit({ ...newHabit, unit: e.target.value })}
                className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="time">time(s)</option>
                <option value="minutes">minute(s)</option>
                <option value="glasses">glass(es)</option>
                <option value="pages">page(s)</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Habit
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-medium text-gray-500 mb-2">No habits yet</h3>
            <p className="text-gray-400">Start building healthy habits today!</p>
          </div>
        ) : (
          habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              weekDates={weekDates}
              today={today}
              onToggle={onToggleHabit}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface HabitItemProps {
  habit: Habit;
  weekDates: string[];
  today: string;
  onToggle: (id: string, date: string) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, weekDates, today, onToggle }) => {
  const completedToday = habit.completedDates.includes(today);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${habit.color} rounded-lg flex items-center justify-center text-xl`}>
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{habit.name}</h3>
            <p className="text-sm text-gray-600">
              {habit.target} {habit.unit} daily
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {habit.streak > 0 && (
            <div className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
              <Flame className="w-4 h-4" />
              <span>{habit.streak}</span>
            </div>
          )}
          
          <button
            onClick={() => onToggle(habit.id, today)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
              completedToday
                ? `${habit.color} border-transparent text-white scale-110`
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {completedToday && <Check className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        {weekDates.map((date) => {
          const completed = habit.completedDates.includes(date);
          const isToday = date === today;
          
          return (
            <div
              key={date}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                completed
                  ? `${habit.color} text-white`
                  : isToday
                  ? 'bg-gray-100 border-2 border-gray-300'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              {new Date(date).getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};