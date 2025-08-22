import React, { useState, useEffect } from 'react';
import { Zap, Heart, Target } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  // Get language from localStorage or default to English
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ['en', 'sr', 'zh'].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    } else {
      setSelectedLanguage('en');
      localStorage.setItem('selectedLanguage', 'en');
    }
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸', short: 'SR' },
    { code: 'zh', name: '中文', flag: '🇨🇳', short: 'ZH' }
  ];

  // Static translations
  const translations = {
    en: {
      title: "DailyWell",
      subtitle: "Your daily wellness companion",
      heading: "Transform Your Daily Routine",
      description: "Build healthy habits, track your progress, and achieve your wellness goals with our comprehensive daily companion app.",
      features: {
        tasks: "Task Management & Productivity",
        habits: "Habit Tracking & Serije", 
        wellness: "Wellness Check-ins",
        timer: "Focus Timer (Pomodoro)",
        analytics: "Progress Analytics"
      },
      getStarted: "Get Started",
      joinMessage: "Join thousands of users improving their daily wellness"
    },
    sr: {
      title: "DailyWell",
      subtitle: "Vaš dnevni wellness pratilac",
      heading: "Transformišite svoju dnevnu rutinu",
      description: "Gradite zdrave navike, pratite svoj napredak i postignite svoje wellness ciljeve sa našom sveobuhvatnom aplikacijom za dnevno praćenje.",
      features: {
        tasks: "Upravljanje zadacima i produktivnost",
        habits: "Praćenje navika i serije",
        wellness: "Wellness provere",
        timer: "Timer za fokus (Pomodoro)",
        analytics: "Analitika napretka"
      },
      getStarted: "Započnite",
      joinMessage: "Pridružite se hiljadama korisnika koji poboljšavaju svoj dnevni wellness"
    },
    zh: {
      title: "DailyWell",
      subtitle: "您的日常健康伴侣",
      heading: "改变您的日常习惯",
      description: "建立健康习惯，跟踪您的进度，并通过我们全面的日常伴侣应用程序实现您的健康目标。",
      features: {
        tasks: "任务管理与生产力",
        habits: "习惯跟踪与系列", 
        wellness: "健康检查",
        timer: "专注计时器 (番茄钟)",
        analytics: "进度分析"
      },
      getStarted: "开始使用",
      joinMessage: "加入数千名改善日常健康的用户"
    }
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    // Refresh the page to apply language changes to all components
    window.location.reload();
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      
      {/* Header with logo */}
      <div className="relative z-10 flex flex-col items-center pt-20 pb-12">
        <div className="relative mb-6">
          <Zap size={40} className="text-yellow-500 drop-shadow-lg" />
          <Heart size={20} className="absolute -top-2 -right-2 text-pink-500" />
          <Target size={20} className="absolute -bottom-2 -left-2 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{t.title}</h1>
        <p className="text-lg text-white/90 text-center">{t.subtitle}</p>
        
        {/* Language Switcher */}
        <div className="mt-6 flex flex-col items-center">
                     <p className="text-white/80 text-sm mb-2">Choose Language / Izaberite jezik</p>
          <div className="flex space-x-2 mb-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 flex items-center space-x-2 ${
                  selectedLanguage === lang.code
                    ? 'border-white bg-white/20 text-white'
                    : 'border-white/30 bg-white/10 hover:bg-white/20 text-white/80'
                }`}
                title={lang.name}
              >
                <span className="text-sm font-medium">{lang.name}</span>
                <span className="text-xs text-white/60">({lang.short})</span>
              </button>
            ))}
          </div>
          {detectedLanguage && (
            <p className="text-white/70 text-sm">
              Detected: {languages.find(l => l.code === detectedLanguage)?.name || detectedLanguage}
            </p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">{t.heading}</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 mb-12">
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-300 font-bold">✓</span>
            </div>
            <span className="text-white font-medium">{t.features.tasks}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-300 font-bold">🔄</span>
            </div>
            <span className="text-white font-medium">{t.features.habits}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-red-300 font-bold">❤️</span>
            </div>
            <span className="text-white font-medium">{t.features.wellness}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-yellow-300 font-bold">⏱️</span>
            </div>
            <span className="text-white font-medium">{t.features.timer}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-300 font-bold">📊</span>
            </div>
            <span className="text-white font-medium">{t.features.analytics}</span>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t.getStarted}
          </button>
          <p className="text-white/70 mt-4 text-sm">
            {t.joinMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
