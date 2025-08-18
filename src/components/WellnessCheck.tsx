import React, { useState } from 'react';
import { Heart, Smile, Zap, Brain } from 'lucide-react';
import { WellnessEntry } from '../types';
import { getTodayString } from '../utils/dateUtils';
import { useTranslation } from 'react-i18next';

interface WellnessCheckProps {
  entries: WellnessEntry[];
  onAddEntry: (entry: WellnessEntry) => void;
}

const moodEmojis = ['😞', '😕', '😐', '😊', '😍'];
const stressEmojis = ['😌', '😊', '😐', '😰', '😵'];
const energyEmojis = ['😴', '😪', '😐', '😃', '⚡'];

export const WellnessCheck: React.FC<WellnessCheckProps> = ({ entries, onAddEntry }) => {
  const { t } = useTranslation();
  const today = getTodayString();
  const todayEntry = entries.find(entry => entry.date === today);
  
  const [currentEntry, setCurrentEntry] = useState<Partial<WellnessEntry>>(
    todayEntry || {
      date: today,
      mood: 3,
      stress: 3,
      energy: 3,
      notes: '',
    }
  );

  const handleSave = () => {
    if (currentEntry.mood && currentEntry.stress && currentEntry.energy) {
      onAddEntry(currentEntry as WellnessEntry);
    }
  };

  const recentEntries = entries.slice(-7).reverse();
  
  // Get random motivational quote in Chinese
  const getRandomChineseQuote = () => {
    const quotes = [
      t('motivationalQuotes.todayOpportunity'),
      t('motivationalQuotes.smallProgress'),
      t('motivationalQuotes.capableOfMore'),
      t('motivationalQuotes.newBeginning'),
      t('motivationalQuotes.focusOnProgress'),
      t('motivationalQuotes.onlyLimit'),
      t('motivationalQuotes.dreamItWishItDoIt'),
      t('motivationalQuotes.greatThings'),
      t('motivationalQuotes.dontWait'),
      t('motivationalQuotes.successIsSum'),
      t('motivationalQuotes.believeYouCan'),
      t('motivationalQuotes.futureDepends')
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  
  const quote = getRandomChineseQuote();

  return (
    <div className="space-y-6 pl-2 sm:pl-0">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('wellnessCheck.title')}</h2>
        <p className="text-gray-600">{t('wellnessCheck.howAreYou')}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="w-6 h-6 text-pink-500" />
          <h3 className="text-lg font-semibold text-gray-900">{t('wellnessCheck.todaysCheck')}</h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Smile className="w-5 h-5 text-yellow-500" />
              <label className="font-medium text-gray-700">{t('wellnessCheck.mood')}</label>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-lg">
              {moodEmojis.map((emoji, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setCurrentEntry({ ...currentEntry, mood: value })}
                    className={`text-2xl sm:text-2xl p-3 sm:p-2 rounded-full transition-all ${
                      currentEntry.mood === value
                        ? 'bg-yellow-100 scale-125'
                        : 'hover:bg-gray-50 hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-red-500" />
              <label className="font-medium text-gray-700">{t('wellnessCheck.stressLevel')}</label>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-lg">
              {stressEmojis.map((emoji, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setCurrentEntry({ ...currentEntry, stress: value })}
                    className={`text-2xl sm:text-2xl p-3 sm:p-2 rounded-full transition-all ${
                      currentEntry.stress === value
                        ? 'bg-red-100 scale-125'
                        : 'hover:bg-gray-50 hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-green-500" />
              <label className="font-medium text-gray-700">{t('wellnessCheck.energyLevel')}</label>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-lg">
              {energyEmojis.map((emoji, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setCurrentEntry({ ...currentEntry, energy: value })}
                    className={`text-2xl sm:text-2xl p-3 sm:p-2 rounded-full transition-all ${
                      currentEntry.energy === value
                        ? 'bg-green-100 scale-125'
                        : 'hover:bg-gray-50 hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">{t('wellnessCheck.notesOptional')}</label>
            <textarea
              value={currentEntry.notes || ''}
              onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
              placeholder={t('wellnessCheck.notesPlaceholder')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base"
            >
              {todayEntry ? t('wellnessCheck.updateCheckin') : t('wellnessCheck.saveCheckin')}
            </button>
            <button
              onClick={() => setCurrentEntry({
                date: today,
                mood: 3,
                stress: 3,
                energy: 3,
                notes: '',
              })}
              className="px-4 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all text-sm sm:text-base"
              title="Reset to default values"
            >
              {t('common.reset')}
            </button>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border">
        <div className="text-center">
          <div className="text-2xl mb-3">✨</div>
          <p className="text-lg font-medium text-gray-800 italic">"{quote}"</p>
        </div>
      </div>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('wellnessCheck.recentEntries')}</h3>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div key={entry.date} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-3 text-lg">
                    <span title="Mood">{moodEmojis[entry.mood - 1]}</span>
                    <span title="Stress">{stressEmojis[entry.stress - 1]}</span>
                    <span title="Energy">{energyEmojis[entry.energy - 1]}</span>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};