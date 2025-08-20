import React, { useState } from 'react';
import { Heart, Smile, Zap, Brain } from 'lucide-react';
import { WellnessEntry } from '../types';
import { getTodayString } from '../utils/dateUtils';


interface WellnessCheckProps {
  entries: WellnessEntry[];
  onAddEntry: (entry: WellnessEntry) => void;
}

const moodEmojis = ['😞', '😕', '😐', '😊', '😍'];
const stressEmojis = ['😌', '😊', '😐', '😰', '😵'];
const energyEmojis = ['😴', '😪', '😐', '😃', '⚡'];

export const WellnessCheck: React.FC<WellnessCheckProps> = ({ entries, onAddEntry }) => {
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Provera dobrobiti",
          subtitle: "Kako se osećaš danas?",
          todaysCheck: "Današnja provera",
          mood: "Raspoloženje",
          stressLevel: "Nivo stresa",
          energyLevel: "Nivo energije",
          notes: "Beleske (opciono)",
          notesPlaceholder: "Kako se osećaš danas? Bilo kakve misli ili razmišljanja...",
          updateCheckin: "Ažuriraj proveru",
          saveCheckin: "Sačuvaj proveru",
          reset: "Resetuj",
          resetTitle: "Vrati na podrazumevane vrednosti",
          recentEntries: "Skorašnji unosi",
          wellnessArticles: "Članci o dobrobiti",
          // Motivational quotes
          quote1: "Danas je nova prilika da budeš bolji nego juče.",
          quote2: "Mali napredak je i dalje napredak.",
          quote3: "Sposoban si za više nego što znaš.",
          quote4: "Svaki dan je novi početak.",
          quote5: "Fokusiraj se na napredak, ne na savršenstvo.",
          quote6: "Jedina granica je ona koju postavljaš za sebe.",
          quote7: "Sanjaj to, želi to, uradi to.",
          quote8: "Velike stvari nikad ne dolaze iz zone komfora.",
          quote9: "Ne čekaj priliku, stvori je.",
          quote10: "Uspeh je zbir malih napora koji se ponavljaju svakodnevno.",
          quote11: "Veruj da možeš i na pola si puta.",
          quote12: "Budućnost zavisi od onoga što radiš danas."
        };
      case 'zh':
        return {
          title: "健康检查",
          subtitle: "今天感觉如何？",
          todaysCheck: "今日检查",
          mood: "心情",
          stressLevel: "压力水平",
          energyLevel: "能量水平",
          notes: "备注（可选）",
          notesPlaceholder: "今天感觉如何？有什么想法或反思...",
          updateCheckin: "更新检查",
          saveCheckin: "保存检查",
          reset: "重置",
          resetTitle: "重置为默认值",
          recentEntries: "最近记录",
          wellnessArticles: "健康文章",
          // Motivational quotes
          quote1: "今天是比昨天更好的新机会。",
          quote2: "小进步仍然是进步。",
          quote3: "你的能力超乎你的想象。",
          quote4: "每一天都是新的开始。",
          quote5: "专注于进步，而不是完美。",
          quote6: "唯一的限制是你为自己设定的限制。",
          quote7: "梦想它，渴望它，实现它。",
          quote8: "伟大的事情永远不会来自舒适区。",
          quote9: "不要等待机会，创造机会。",
          quote10: "成功是每天重复的小努力的总和。",
          quote11: "相信你能行，你就已经成功了一半。",
          quote12: "未来取决于你今天做什么。"
        };
      default: // English
        return {
          title: "Wellness Check",
          subtitle: "How are you feeling today?",
          todaysCheck: "Today's Check",
          mood: "Mood",
          stressLevel: "Stress Level",
          energyLevel: "Energy Level",
          notes: "Notes (Optional)",
          notesPlaceholder: "How are you feeling today? Any thoughts or reflections...",
          updateCheckin: "Update Check-in",
          saveCheckin: "Save Check-in",
          reset: "Reset",
          resetTitle: "Reset to default values",
          recentEntries: "Recent Entries",
          wellnessArticles: "Wellness Articles",
          // Motivational quotes
          quote1: "Today is a new opportunity to be better than yesterday.",
          quote2: "Small progress is still progress.",
          quote3: "You are capable of more than you know.",
          quote4: "Every day is a new beginning.",
          quote5: "Focus on progress, not perfection.",
          quote6: "The only limit is the one you set for yourself.",
          quote7: "Dream it, wish it, do it.",
          quote8: "Great things never come from comfort zones.",
          quote9: "Don't wait for opportunity, create it.",
          quote10: "Success is the sum of small efforts repeated daily.",
          quote11: "Believe you can and you're halfway there.",
          quote12: "The future depends on what you do today."
        };
    }
  };

  const text = getText();

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
  
  // Get random motivational quote
  const getRandomQuote = () => {
    const quotes = [
      text.quote1,
      text.quote2,
      text.quote3,
      text.quote4,
      text.quote5,
      text.quote6,
      text.quote7,
      text.quote8,
      text.quote9,
      text.quote10,
      text.quote11,
      text.quote12
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  
  const quote = getRandomQuote();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{text.title}</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 dark:text-pink-400" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{text.todaysCheck}</h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Smile className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              <label className="font-medium text-gray-700 dark:text-white">{text.mood}</label>
            </div>
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg">
              {moodEmojis.map((emoji, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setCurrentEntry({ ...currentEntry, mood: value })}
                    className={`text-2xl sm:text-2xl p-3 sm:p-2 rounded-full transition-all ${
                      currentEntry.mood === value
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 scale-125'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110'
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
              <Brain className="w-5 h-5 text-red-500 dark:text-red-400" />
              <label className="font-medium text-gray-700 dark:text-white">{text.stressLevel}</label>
            </div>
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg">
              {stressEmojis.map((emoji, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setCurrentEntry({ ...currentEntry, stress: value })}
                    className={`text-2xl sm:text-2xl p-3 sm:p-2 rounded-full transition-all ${
                      currentEntry.stress === value
                        ? 'bg-red-100 dark:bg-red-900/30 scale-125'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110'
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
              <Zap className="w-5 h-5 text-green-500 dark:text-green-400" />
              <label className="font-medium text-gray-700 dark:text-white">{text.energyLevel}</label>
            </div>
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg">
              {energyEmojis.map((emoji, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setCurrentEntry({ ...currentEntry, energy: value })}
                    className={`text-2xl sm:text-2xl p-3 sm:p-2 rounded-full transition-all ${
                      currentEntry.energy === value
                        ? 'bg-green-100 dark:bg-green-900/30 scale-125'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-white mb-2">{text.notes}</label>
            <textarea
              value={currentEntry.notes || ''}
              onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
              placeholder={text.notesPlaceholder}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              style={{ color: 'inherit' }}
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base"
            >
              {todayEntry ? text.updateCheckin : text.saveCheckin}
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
              title={text.resetTitle}
            >
              {text.reset}
            </button>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/50 dark:to-teal-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl mb-3">✨</div>
          <p className="text-lg font-medium text-gray-800 dark:text-white italic">"{quote}"</p>
        </div>
      </div>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{text.recentEntries}</h3>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div key={entry.date} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-3 text-lg">
                    <span title="Mood">{moodEmojis[entry.mood - 1]}</span>{text.wellnessArticles}
                    <span title="Stress">{stressEmojis[entry.stress - 1]}</span>
                    <span title="Energy">{energyEmojis[entry.energy - 1]}</span>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};