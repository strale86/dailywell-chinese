import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { PomodoroSession } from '../types';

interface PomodoroTimerProps {
  onSessionComplete: (session: Omit<PomodoroSession, 'id'>) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onSessionComplete }) => {
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
                isBreak ? 'Break finished!' : 'Pomodoro completed!',
                {
                  body: isBreak ? 'Time to get back to work!' : 'Time for a break!',
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Focus Timer</h2>
        <p className="text-gray-600">Stay focused with the Pomodoro Technique</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg border">
        <div className="text-center space-y-6">
          {/* Timer Display */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full border-8 border-gray-200 flex items-center justify-center relative overflow-hidden">
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
                  isBreak ? 'text-green-700' : 'text-indigo-700'
                }`}>
                  {formatTime(timeLeft)}
                </div>
                <div className={`text-sm font-medium ${
                  isBreak ? 'text-green-600' : 'text-indigo-600'
                }`}>
                  {isBreak ? 'Break Time' : 'Focus Time'}
                </div>
              </div>
            </div>
          </div>

          {/* Current Task Input */}
          {!isBreak && (
            <div className="max-w-sm mx-auto">
              <input
                type="text"
                placeholder="What are you working on?"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{sessionsCompleted}</div>
              <div className="text-sm text-gray-600">Sessions Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.floor((sessionsCompleted * 25) / 60)}h {(sessionsCompleted * 25) % 60}m
              </div>
              <div className="text-sm text-gray-600">Focus Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-indigo-500" />
          Pomodoro Tips
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Focus on one task for 25 minutes</p>
          <p>• Take a 5-minute break after each session</p>
          <p>• After 4 sessions, take a longer 15-30 minute break</p>
          <p>• Turn off all distractions during focus time</p>
        </div>
      </div>
    </div>
  );
};