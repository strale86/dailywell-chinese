import React, { useState } from 'react';
import { Plus, Check, Flame, Target, TrendingUp, Calendar, Trash2 } from 'lucide-react';
import { Habit } from '../types';
import { getTodayString, getWeekDates } from '../utils/dateUtils';
import { useTranslation } from 'react-i18next';

interface HabitsTrackerProps {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => void;
  onToggleHabit: (id: string, date: string) => void;
  onDeleteHabit: (id: string) => void;
}

const habitIcons = ['💧', '🏃‍♂️', '🧘‍♀️', '📚', '🥗', '😴', '✍️', '🎵'];
const habitColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'];

export const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  habits,
  onAddHabit,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    icon: '💧',
    color: 'bg-blue-500',
    target: 1,
    unit: 'time',
    category: 'health' as const,
    startDate: getTodayString(),
    totalCompletions: 0,
    bestStreak: 0,
    isActive: true,
  });

  const getIconForHabit = (habitName: string) => {
    const name = habitName.toLowerCase();
    if (name.includes('water') || name.includes('drink') || name.includes('hidrat') || name.includes('voda')) return '💧';
    if (name.includes('run') || name.includes('jog') || name.includes('exercise') || name.includes('workout') || name.includes('trčanje')) return '🏃‍♂️';
    if (name.includes('meditation') || name.includes('yoga') || name.includes('breath') || name.includes('meditacija')) return '🧘‍♀️';
    if (name.includes('read') || name.includes('book') || name.includes('study') || name.includes('čitanje')) return '📚';
    if (name.includes('eat') || name.includes('food') || name.includes('meal') || name.includes('diet') || name.includes('jelo')) return '🥗';
    if (name.includes('sleep') || name.includes('bed') || name.includes('rest') || name.includes('spavanje')) return '😴';
    if (name.includes('write') || name.includes('journal') || name.includes('diary') || name.includes('pisanje')) return '✍️';
    if (name.includes('music') || name.includes('listen') || name.includes('song') || name.includes('muzika')) return '🎵';
    return '💧'; // default
  };

  const getColorForHabit = (habitName: string) => {
    const name = habitName.toLowerCase();
    if (name.includes('water') || name.includes('drink') || name.includes('voda')) return 'bg-blue-500';
    if (name.includes('run') || name.includes('exercise') || name.includes('trčanje')) return 'bg-green-500';
    if (name.includes('meditation') || name.includes('yoga') || name.includes('meditacija')) return 'bg-purple-500';
    if (name.includes('read') || name.includes('study') || name.includes('čitanje')) return 'bg-yellow-500';
    if (name.includes('eat') || name.includes('food') || name.includes('jelo')) return 'bg-red-500';
    if (name.includes('sleep') || name.includes('rest') || name.includes('spavanje')) return 'bg-indigo-500';
    if (name.includes('write') || name.includes('journal') || name.includes('pisanje')) return 'bg-pink-500';
    if (name.includes('music') || name.includes('listen') || name.includes('muzika')) return 'bg-teal-500';
    return 'bg-blue-500'; // default
  };

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
        category: 'health' as const,
        startDate: getTodayString(),
        totalCompletions: 0,
        bestStreak: 0,
        isActive: true,
      });
      setShowForm(false);
    }
  };

  const today = getTodayString();
  const weekDates = getWeekDates();

  return (
    <div className="space-y-6 pl-2 sm:pl-0">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('habitsTracker.habits')}</h2>
          <p className="text-gray-600">{t('habitsTracker.addYourFirstHabit')}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">{t('habitsTracker.addHabit')}</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('habitsTracker.habits')}</p>
              <p className="text-2xl font-bold text-gray-900">{habits.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('habitsTracker.streak')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {habits.filter(h => h.streak > 0).length}
              </p>
            </div>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('habitsTracker.today')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {habits.filter(h => h.completedDates.includes(today)).length}/{habits.length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('habitsTracker.streak')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(...habits.map(h => h.streak), 0)}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <div>
            <input
              type="text"
              placeholder={t('habitsTracker.habitName')}
              value={newHabit.name}
              onChange={(e) => {
                const name = e.target.value;
                setNewHabit({ 
                  ...newHabit, 
                  name,
                  icon: getIconForHabit(name),
                  color: getColorForHabit(name)
                });
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newHabit.name.trim()) {
                  handleSubmit(e);
                }
              }}
              onBlur={() => {
                if (newHabit.name.trim()) {
                  handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                }
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('habitsTracker.icon')}</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('habitsTracker.color')}</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('habitsTracker.category')}</label>
              <select
                value={newHabit.category}
                onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="health">{t('habitsTracker.categoryHealth')}</option>
                <option value="productivity">{t('habitsTracker.categoryProductivity')}</option>
                <option value="learning">{t('habitsTracker.categoryLearning')}</option>
                <option value="wellness">{t('habitsTracker.categoryWellness')}</option>
                <option value="fitness">{t('habitsTracker.categoryFitness')}</option>
                <option value="personal">{t('habitsTracker.categoryPersonal')}</option>
              </select>
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
                <option value="time">{t('habitsTracker.unitTime')}</option>
                <option value="minutes">{t('habitsTracker.unitMinutes')}</option>
                <option value="glasses">{t('habitsTracker.unitGlasses')}</option>
                <option value="pages">{t('habitsTracker.unitPages')}</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {t('common.cancel')}
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
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t('habitsTracker.noHabits')}</h3>
            <p className="text-gray-600">{t('habitsTracker.addYourFirstHabit')}</p>
          </div>
        ) : (
          habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              weekDates={weekDates}
              today={today}
              onToggle={onToggleHabit}
              onDelete={onDeleteHabit}
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
  onDelete: (id: string) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, weekDates, today, onToggle, onDelete }) => {
  const { t } = useTranslation();
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
              {habit.target} {habit.unit} {t('habitsTracker.daily')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            <span className="capitalize">{habit.category}</span>
          </div>
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
          
          <button
            onClick={() => onDelete(habit.id)}
            className="w-8 h-8 rounded-full border-2 border-red-300 hover:border-red-500 flex items-center justify-center transition-all hover:bg-red-50"
            title={t('habitsTracker.deleteHabit')}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
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