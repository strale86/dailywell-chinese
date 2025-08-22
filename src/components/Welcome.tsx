import React, { useState, useEffect } from 'react';
import { Zap, Heart, Target, Sparkles, Globe, CheckCircle } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        habits: "Habit Tracking & Series", 
        wellness: "Wellness Check-ins",
        timer: "Focus Timer (Pomodoro)",
        analytics: "Progress Analytics"
      },
      getStarted: "Get Started",
      joinMessage: "Join thousands of users improving their daily wellness",
      chooseLanguage: "Choose Language / Izaberite jezik / 选择语言"
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
      joinMessage: "Pridružite se hiljadama korisnika koji poboljšavaju svoj dnevni wellness",
      chooseLanguage: "Choose Language / Izaberite jezik / 选择语言"
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
      joinMessage: "加入数千名改善日常健康的用户",
      chooseLanguage: "Choose Language / Izaberite jezik / 选择语言"
    }
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    // Refresh the page to apply language changes to all components
    window.location.reload();
  };

  const handleGetStarted = () => {
    setIsLoading(true);
    setTimeout(() => {
      onGetStarted();
    }, 300);
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
      <div className="relative z-10 flex flex-col items-center pt-20 pb-12 fade-in-up">
        <div className="relative mb-6 scale-in">
          <Zap size={40} className="text-yellow-500 drop-shadow-lg" />
          <Heart size={20} className="absolute -top-2 -right-2 text-pink-500 animate-pulse" />
          <Target size={20} className="absolute -bottom-2 -left-2 text-blue-600 animate-pulse delay-1000" />
          <Sparkles size={16} className="absolute top-1 -left-1 text-purple-400 animate-pulse delay-2000" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg slide-in-right">{t.title}</h1>
        <p className="text-lg text-white/90 text-center fade-in-up">{t.subtitle}</p>
        
        {/* Language Switcher with Animation */}
        <div className="mt-6 flex flex-col items-center slide-in-right">
          <p className="text-white/80 text-sm mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {t.chooseLanguage}
          </p>
          <div className="flex space-x-2 mb-2">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 flex items-center space-x-2 card-hover hover-lift ${
                  selectedLanguage === lang.code
                    ? 'border-white bg-white/20 text-white'
                    : 'border-white/30 bg-white/10 hover:bg-white/20 text-white/80'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                title={lang.name}
              >
                <span className="text-sm font-medium">{lang.name}</span>
                <span className="text-xs text-white/60">({lang.short})</span>
              </button>
            ))}
          </div>
          {detectedLanguage && (
            <p className="text-white/70 text-sm scale-in">
              Detected: {languages.find(l => l.code === detectedLanguage)?.name || detectedLanguage}
            </p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">{t.heading}</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Features with Hover Effects */}
        <div className="grid gap-6 mb-12">
          {[
            { icon: CheckCircle, text: t.features.tasks, color: 'green' },
            { icon: Target, text: t.features.habits, color: 'purple' },
            { icon: Heart, text: t.features.wellness, color: 'red' },
            { icon: Zap, text: t.features.timer, color: 'yellow' },
            { icon: Target, text: t.features.analytics, color: 'blue' }
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 card-hover hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-10 h-10 bg-${feature.color}-500/20 rounded-full flex items-center justify-center mr-4`}>
                <feature.icon className={`w-5 h-5 text-${feature.color}-300`} />
              </div>
              <span className="text-white font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Call to action with Loading State */}
        <div className="text-center">
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className={`bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-primary ${
              isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-50'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                Loading...
              </div>
            ) : (
              t.getStarted
            )}
          </button>
          <p className="text-white/70 mt-4 text-sm fade-in-up">
            {t.joinMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
