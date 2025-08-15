import React, { useState } from 'react';
import { User, Mail, Calendar, Target, Settings } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  goals: string[];
}

interface ProfileProps {
  stats: {
    totalPoints: number;
    level: number;
    tasksCompleted: number;
    habitsCompleted: number;
    pomodoroSessions: number;
    currentStreak: number;
  };
}

export const Profile: React.FC<ProfileProps> = ({ stats }) => {
  // Profile component with user data functionality
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dailywell-profile');
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      gender: '',
      goals: [],
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('dailywell-profile', JSON.stringify(profile));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>Save</span>
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
              />
            ) : (
              <p className="text-gray-900">{profile.firstName || 'Not set'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
              />
            ) : (
              <p className="text-gray-900">{profile.lastName || 'Not set'}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          ) : (
            <p className="text-gray-900">{profile.email || 'Not set'}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Birth Date
            </label>
            {isEditing ? (
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.birthDate || 'Not set'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            {isEditing ? (
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-gray-900">{profile.gender || 'Not set'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-600" />
          Goals
        </h3>
        
        {isEditing ? (
          <div className="space-y-2">
            {['Fitness & Health', 'Productivity', 'Mindfulness', 'Learning', 'Career Growth', 'Relationships', 'Financial Goals', 'Creative Projects'].map((goal) => (
              <label key={goal} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profile.goals.includes(goal)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProfile({ ...profile, goals: [...profile.goals, goal] });
                    } else {
                      setProfile({ ...profile, goals: profile.goals.filter(g => g !== goal) });
                    }
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
        ) : (
          <div>
            {profile.goals.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.goals.map((goal) => (
                  <span key={goal} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {goal}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No goals set</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress Summary</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.totalPoints}</p>
            <p className="text-sm text-blue-600">Total Points</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-700">{stats.tasksCompleted}</p>
            <p className="text-sm text-green-600">Tasks Completed</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.pomodoroSessions}</p>
            <p className="text-sm text-yellow-600">Pomodoro Sessions</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-red-700">{stats.currentStreak}</p>
            <p className="text-sm text-red-600">Current Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};
