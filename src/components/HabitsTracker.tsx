import React, { useState } from 'react';
import { Plus, Check, Flame, Target, TrendingUp, Calendar, Trash2 } from 'lucide-react';
import { Habit } from '../types';
import { getTodayString, getWeekDates } from '../utils/dateUtils';


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
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Navike",
          subtitle: "Dodajte svoju prvu naviku da započnete",
          addHabit: "Dodaj naviku",
          habits: "Navike",
          streak: "Serija",
          today: "Danas",
          noHabits: "Još nema navika",
          addFirstHabit: "Dodajte svoju prvu naviku da počnete praćenje",
          enterHabitName: "Unesite naziv navike",
          icon: "Ikona",
          color: "Boja",
          category: "Kategorija",
          cancel: "Otkaži",
          health: "Zdravlje",
          productivity: "Produktivnost",
          learning: "Učenje",
          wellness: "Dobrobit",
          fitness: "Fitness",
          personal: "Lično",
          time: "Vreme",
          minutes: "Minuta",
          glasses: "Čaše",
          pages: "Stranice",
          meals: "Obroci",
          hours: "Sati",
          daily: "dnevno",
          deleteHabit: "Obriši naviku"
        };
      case 'zh':
        return {
          title: "习惯",
          subtitle: "添加您的第一个习惯开始",
          addHabit: "添加习惯",
          habits: "习惯",
          streak: "连续天数",
          today: "今天",
          noHabits: "暂无习惯",
          addFirstHabit: "添加您的第一个习惯开始跟踪",
          enterHabitName: "输入习惯名称",
          icon: "图标",
          color: "颜色",
          category: "类别",
          cancel: "取消",
          health: "健康",
          productivity: "生产力",
          learning: "学习",
          wellness: "健康",
          fitness: "健身",
          personal: "个人",
          time: "时间",
          minutes: "分钟",
          glasses: "杯",
          pages: "页",
          meals: "餐",
          hours: "小时",
          daily: "每日",
          deleteHabit: "删除习惯"
        };
      default: // English
        return {
          title: "Habits",
          subtitle: "Add your first habit to get started",
          addHabit: "Add Habit",
          habits: "Habits",
          streak: "Streak",
          today: "Today",
          noHabits: "No habits yet",
          addFirstHabit: "Add your first habit to start tracking",
          enterHabitName: "Enter habit name",
          icon: "Icon",
          color: "Color",
          category: "Category",
          cancel: "Cancel",
          health: "Health",
          productivity: "Productivity",
          learning: "Learning",
          wellness: "Wellness",
          fitness: "Fitness",
          personal: "Personal",
          time: "Time",
          minutes: "Minutes",
          glasses: "Glasses",
          pages: "Pages",
          meals: "Meals",
          hours: "Hours",
          daily: "daily",
          deleteHabit: "Delete habit"
        };
    }
  };

  const text = getText();

  const [showForm, setShowForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    icon: '💧',
    color: 'bg-blue-500',
    target: 1,
    unit: 'glasses',
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
    if (newHabit.name.trim() && !isAdding) {
      setIsAdding(true);
      
      // Optimizovano - odmah zatvaramo formu
      setShowForm(false);
      
      // Dodajemo naviku
      onAddHabit(newHabit);
      
      // Resetujemo formu
      setNewHabit({
        name: '',
        icon: '💧',
        color: 'bg-blue-500',
        target: 1,
        unit: 'glasses',
        category: 'health' as const,
        startDate: getTodayString(),
        totalCompletions: 0,
        bestStreak: 0,
        isActive: true,
      });
      
      // Resetujemo loading state
      setTimeout(() => setIsAdding(false), 100);
    }
  };

  const today = getTodayString();
  const weekDates = getWeekDates();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 sm:space-x-2 bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-green-700 transition-all text-xs sm:text-sm flex-shrink-0"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{text.addHabit}</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.habits}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{habits.length}</p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.streak}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {habits.filter(h => h.streak > 0).length}
              </p>
            </div>
            <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.today}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {habits.filter(h => h.completedDates.includes(today)).length}/{habits.length}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.streak}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {Math.max(...habits.map(h => h.streak), 0)}
              </p>
            </div>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4">
          <div>
            <input
              type="text"
              placeholder={text.enterHabitName}
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
                if (e.key === 'Enter' && newHabit.name.trim() && !isAdding) {
                  handleSubmit(e);
                }
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="w-full px-3 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-black placeholder-gray-500 dark:placeholder-gray-400 text-base"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">{text.icon}</label>
            <div className="grid grid-cols-4 gap-3">
              {habitIcons.map((icon) => {
                const getHabitName = (icon: string) => {
                  switch (icon) {
                    case '💧': return 'Drink Water';
                    case '🏃‍♂️': return 'Running';
                    case '🧘‍♀️': return 'Meditation';
                    case '📚': return 'Reading';
                    case '🥗': return 'Healthy Eating';
                    case '😴': return 'Sleep';
                    case '✍️': return 'Writing';
                    case '🎵': return 'Music';
                    default: return '';
                  }
                };

                const getHabitCategory = (icon: string) => {
                  switch (icon) {
                    case '💧': return 'health';
                    case '🏃‍♂️': return 'fitness';
                    case '🧘‍♀️': return 'wellness';
                    case '📚': return 'learning';
                    case '🥗': return 'health';
                    case '😴': return 'wellness';
                    case '✍️': return 'personal';
                    case '🎵': return 'personal';
                    default: return 'health';
                  }
                };

                const getHabitUnit = (icon: string) => {
                  switch (icon) {
                    case '💧': return 'glasses';
                    case '🏃‍♂️': return 'minutes';
                    case '🧘‍♀️': return 'minutes';
                    case '📚': return 'pages';
                    case '🥗': return 'meals';
                    case '😴': return 'hours';
                    case '✍️': return 'pages';
                    case '🎵': return 'minutes';
                    default: return 'time';
                  }
                };

                return (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewHabit({ 
                      ...newHabit, 
                      icon,
                      name: getHabitName(icon),
                      category: getHabitCategory(icon) as any,
                      unit: getHabitUnit(icon)
                    })}
                    className={`p-4 text-2xl rounded-lg border-2 transition-all hover:scale-105 ${
                      newHabit.icon === icon ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                );
              })}
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-3 mt-6">{text.color}</label>
            <div className="grid grid-cols-4 gap-3">
              {habitColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewHabit({ ...newHabit, color })}
                  className={`w-12 h-12 rounded-full ${color} border-2 transition-all hover:scale-105 ${
                    newHabit.color === color ? 'border-gray-800 scale-110 shadow-lg' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-3 mt-6">{text.category}</label>
            <select
              value={newHabit.category}
              onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value as any })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-gray-900"
            >
              <option value="health">{text.health}</option>
              <option value="productivity">{text.productivity}</option>
              <option value="learning">{text.learning}</option>
              <option value="wellness">{text.wellness}</option>
              <option value="fitness">{text.fitness}</option>
              <option value="personal">{text.personal}</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setNewHabit({ ...newHabit, target: Math.max(1, newHabit.target - 1) })}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newHabit.target}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = value === '' ? 1 : Math.min(Math.max(parseInt(value) || 1, 1), 50);
                    setNewHabit({ ...newHabit, target: numValue });
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  onFocus={(e) => e.target.select()}
                  className="w-12 px-2 py-1 border-0 focus:outline-none focus:ring-0 bg-white text-black text-center"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                />
                <button
                  type="button"
                  onClick={() => setNewHabit({ ...newHabit, target: Math.min(50, newHabit.target + 1) })}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg transition-colors"
                >
                  +
                </button>
              </div>
              <select
                value={newHabit.unit}
                onChange={(e) => setNewHabit({ ...newHabit, unit: e.target.value })}
                onTouchStart={(e) => e.stopPropagation()}
                className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black border-gray-300"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                <option value="time">{text.time}</option>
                <option value="minutes">{text.minutes}</option>
                <option value="glasses">{text.glasses}</option>
                <option value="pages">{text.pages}</option>
                <option value="meals">{text.meals}</option>
                <option value="hours">{text.hours}</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {text.cancel}
              </button>
              <button
                type="submit"
                disabled={!newHabit.name.trim() || isAdding}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow-md border-2 border-green-700"
                style={{ minWidth: '120px' }}
              >
                {isAdding ? 'Dodavanje...' : 'SUBMIT'}
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{text.noHabits}</h3>
            <p className="text-gray-600">{text.addFirstHabit}</p>
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
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations for HabitItem
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          daily: "dnevno",
          deleteHabit: "Obriši naviku"
        };

      default: // English
        return {
          daily: "daily",
          deleteHabit: "Delete habit"
        };
    }
  };

  const text = getText();
  const completedToday = habit.completedDates.includes(today);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${habit.color} rounded-lg flex items-center justify-center text-xl`}>
            {habit.icon}
          </div>
          <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{habit.name}</h3>
            <p className="text-sm text-gray-600">
                              {habit.target} {habit.unit} {text.daily}
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
                            title={text.deleteHabit}
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