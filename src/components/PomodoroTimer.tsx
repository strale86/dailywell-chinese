import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { PomodoroSession } from '../types';


interface PomodoroTimerProps {
  onSessionComplete: (session: Omit<PomodoroSession, 'id'>) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onSessionComplete }) => {
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Timer fokusa",
          subtitle: "Ostanite fokusirani sa Pomodoro tehnikom",
          breakTime: "Vreme pauze",
          focusTime: "Vreme fokusa",
          workingOn: "Na čemu radite?",
          pause: "Pauza",
          start: "Start",
          reset: "Resetuj",
          sessionsToday: "Sesije danas",
          focusTimeLabel: "Vreme fokusa",
          focusTips: "Saveti za fokus",
          tip1: "• Radite u fokusiranim sesijama od 25 minuta",
          tip2: "• Pravite pauze od 5 minuta između sesija",
          tip3: "• Eliminišite ometanja tokom vremena fokusa",
          tip4: "• Pratite svoj napredak i slavite uspehe",
          breakFinished: "Pauza završena!",
          pomodoroCompleted: "Pomodoro završen!",
          timeToWork: "Vreme je da se vratite na posao!",
          timeForBreak: "Vreme je za pauzu!"
        };
      case 'es':
        return {
          title: "Temporizador de enfoque",
          subtitle: "Mantén el enfoque con la técnica Pomodoro",
          breakTime: "Tiempo de descanso",
          focusTime: "Tiempo de enfoque",
          workingOn: "¿En qué estás trabajando?",
          pause: "Pausar",
          start: "Comenzar",
          reset: "Reiniciar",
          sessionsToday: "Sesiones hoy",
          focusTimeLabel: "Tiempo de enfoque",
          focusTips: "Consejos de enfoque",
          tip1: "• Trabaja en sesiones enfocadas de 25 minutos",
          tip2: "• Toma descansos de 5 minutos entre sesiones",
          tip3: "• Elimina distracciones durante el tiempo de enfoque",
          tip4: "• Rastrea tu progreso y celebra los éxitos",
          breakFinished: "¡Descanso terminado!",
          pomodoroCompleted: "¡Pomodoro completado!",
          timeToWork: "¡Hora de volver al trabajo!",
          timeForBreak: "¡Hora de descansar!"
        };
      case 'fr':
        return {
          title: "Minuteur de concentration",
          subtitle: "Restez concentré avec la technique Pomodoro",
          breakTime: "Temps de pause",
          focusTime: "Temps de concentration",
          workingOn: "Sur quoi travaillez-vous ?",
          pause: "Pause",
          start: "Commencer",
          reset: "Réinitialiser",
          sessionsToday: "Sessions aujourd'hui",
          focusTimeLabel: "Temps de concentration",
          focusTips: "Conseils de concentration",
          tip1: "• Travaillez en sessions concentrées de 25 minutes",
          tip2: "• Prenez des pauses de 5 minutes entre les sessions",
          tip3: "• Éliminez les distractions pendant le temps de concentration",
          tip4: "• Suivez vos progrès et célébrez vos succès",
          breakFinished: "Pause terminée !",
          pomodoroCompleted: "Pomodoro terminé !",
          timeToWork: "Il est temps de retourner au travail !",
          timeForBreak: "Il est temps de faire une pause !"
        };
      default: // English
        return {
          title: "Focus Timer",
          subtitle: "Stay focused with the Pomodoro Technique",
          breakTime: "Break Time",
          focusTime: "Focus Time",
          workingOn: "What are you working on?",
          pause: "Pause",
          start: "Start",
          reset: "Reset",
          sessionsToday: "Sessions Today",
          focusTimeLabel: "Focus Time",
          focusTips: "Focus Tips",
          tip1: "• Work in focused 25-minute sessions",
          tip2: "• Take 5-minute breaks between sessions",
          tip3: "• Eliminate distractions during focus time",
          tip4: "• Track your progress and celebrate wins",
          breakFinished: "Break finished!",
          pomodoroCompleted: "Pomodoro completed!",
          timeToWork: "Time to get back to work!",
          timeForBreak: "Time for a break!"
        };
    }
  };

  const text = getText();

  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const startBreak = () => {
    setIsBreak(true);
    setTimeLeft(5 * 60); // 5 minutes break
    setIsActive(false);
  };

  const finishBreak = () => {
    setIsBreak(false);
    setTimeLeft(25 * 60); // Back to 25 minutes
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft === 1) {
            setIsActive(false);
            
            if (!isBreak) {
              // Pomodoro session completed
              onSessionComplete({
                duration: 25 * 60,
                completed: true,
                date: new Date(),
                task: currentTask,
              });
              
              setSessionsCompleted(prev => prev + 1);
              
              // Auto-start break
              setTimeout(() => {
                startBreak();
                setIsActive(true);
              }, 1000);
            } else {
              // Break completed
              finishBreak();
            }
            
            // Browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(
                isBreak ? text.breakFinished : text.pomodoroCompleted,
                {
                  body: isBreak ? text.timeToWork : text.timeForBreak,
                  icon: '/favicon.ico'
                }
              );
            }
          }
          
          return timeLeft - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isBreak, currentTask, onSessionComplete]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const progress = isBreak 
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{text.title}</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 p-3 sm:p-4 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Timer Display */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full border-8 border-gray-200 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  isBreak ? 'bg-gradient-to-t from-green-400' : 'bg-gradient-to-t from-indigo-400'
                }`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    progress <= 50 
                      ? `${50 + progress}% 0%` 
                      : `100% 0%, 100% ${(progress - 50) * 2}%`
                  }${
                    progress > 50 ? `, 50% 50%` : ''
                  })`
                }}
              />
              <div className="relative z-10">
                <div className={`text-2xl sm:text-4xl font-bold mb-2 ${
                  isBreak ? 'text-green-700 dark:text-green-300' : 'text-indigo-700 dark:text-indigo-300'
                }`}>
                  {formatTime(timeLeft)}
                </div>
                <div className={`text-sm font-medium ${
                  isBreak ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'
                }`}>
                  {isBreak ? text.breakTime : text.focusTime}
                </div>
              </div>
            </div>
          </div>

          {/* Current Task Input */}
          {!isBreak && (
            <div className="max-w-sm mx-auto">
              <input
                type="text"
                placeholder={text.workingOn}
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={isActive}
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={toggleTimer}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-auto ${
                isActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : isBreak
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>{text.pause}</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>{text.start}</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{text.reset}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{sessionsCompleted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{text.sessionsToday}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.floor((sessionsCompleted * 25) / 60)}h {(sessionsCompleted * 25) % 60}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{text.focusTimeLabel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-indigo-500" />
          {text.focusTips}
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>{text.tip1}</p>
          <p>{text.tip2}</p>
          <p>{text.tip3}</p>
          <p>{text.tip4}</p>
        </div>
      </div>
    </div>
  );
};