import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Heart, Target } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  // Auto-detect language on component mount
  useEffect(() => {
    const detected = navigator.language.split('-')[0];
    if (detected && !localStorage.getItem('i18nextLng')) {
      setDetectedLanguage(detected);
    }
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    localStorage.setItem('i18nextLng', languageCode);
  };
  
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
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{t('welcome.title')}</h1>
        <p className="text-lg text-white/90 text-center">{t('welcome.subtitle')}</p>
        
        {/* Language Switcher */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex space-x-2 mb-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  selectedLanguage === lang.code
                    ? 'border-white bg-white/20'
                    : 'border-white/30 bg-white/10 hover:bg-white/20'
                }`}
                title={lang.name}
              >
                <span className="text-2xl">{lang.flag}</span>
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
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">{t('welcome.heading')}</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {t('welcome.description')}
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 mb-12">
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-300 font-bold">✓</span>
            </div>
            <span className="text-white font-medium">{t('welcome.features.tasks')}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-300 font-bold">🔄</span>
            </div>
            <span className="text-white font-medium">{t('welcome.features.habits')}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-red-300 font-bold">❤️</span>
            </div>
            <span className="text-white font-medium">{t('welcome.features.wellness')}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-yellow-300 font-bold">⏱️</span>
            </div>
            <span className="text-white font-medium">{t('welcome.features.timer')}</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-300 font-bold">📊</span>
            </div>
            <span className="text-white font-medium">{t('welcome.features.analytics')}</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="text-center mb-8">
          <p className="text-white/90 mb-4">{t('welcome.signInWith')}</p>
          <div className="flex justify-center space-x-4">
            {/* Google OAuth */}
            <button
              onClick={() => handleGoogleSignIn()}
              className="flex items-center space-x-2 bg-white text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>

            {/* Apple OAuth */}
            <button
              onClick={() => handleAppleSignIn()}
              className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>
        </div>

        {/* Get Started button */}
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            {t('welcome.getStarted')}
          </button>
          
          <p className="text-white/80 mt-4">
            {t('welcome.joinMessage')}
          </p>
        </div>

        {/* Download Links */}
        <div className="text-center mt-8">
          <p className="text-white/90 mb-4">{t('welcome.downloadApp')}</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.dailywell.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span>Google Play</span>
            </a>
            <a
              href="https://apps.apple.com/app/dailywell/id123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>App Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
