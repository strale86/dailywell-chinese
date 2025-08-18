import React, { useState } from 'react';
import { User, Mail, Calendar, Target, Settings, X } from 'lucide-react';
// Removed react-datepicker imports to fix build error
import { useTranslation } from 'react-i18next';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  goals: string[];
  avatar?: string; // URL slike ili base64 string
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  stats: {
    totalPoints: number;
    level: number;
    tasksCompleted: number;
    habitsCompleted: number;
    pomodoroSessions: number;
    currentStreak: number;
  };
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onLogout, stats }) => {
  const { t, i18n } = useTranslation();
  
  // Debug: log current language
  console.log('Current language:', i18n.language);
  console.log('Document lang:', document.documentElement.lang);
  
  // Set document lang attribute for date input localization
  React.useEffect(() => {
    if (i18n.language === 'zh') {
      document.documentElement.lang = 'zh-CN';
      document.body.lang = 'zh-CN';
      console.log('Set document lang to zh-CN');
    } else {
      document.documentElement.lang = i18n.language;
      document.body.lang = i18n.language;
    }
  }, [i18n.language]);
  
  // Force Chinese language for date input
  const isChinese = i18n.language === 'zh';
  
  // Immediately set document lang for date input
  if (isChinese && document.documentElement.lang !== 'zh-CN') {
    document.documentElement.lang = 'zh-CN';
    document.body.lang = 'zh-CN';
  }
  
  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return t('profileModal.notSet');
    
    const date = new Date(dateString);
    if (i18n.language === 'zh') {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dailywell-profile');
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      gender: '',
      goals: [],
      avatar: '',
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('dailywell-profile', JSON.stringify(profile));
    // Trigger storage event to update header avatar
    window.dispatchEvent(new Event('storage'));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const updatedProfile = { ...profile, avatar: result };
        setProfile(updatedProfile);
        // Save immediately and update header
        localStorage.setItem('dailywell-profile', JSON.stringify(updatedProfile));
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{t('profileModal.profile')}</h2>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>{t('profileModal.edit')}</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <span>{t('profileModal.save')}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              {t('profileModal.profilePicture')}
            </h3>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-blue-200">
                    {profile.firstName && profile.lastName 
                      ? `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()
                      : 'U'
                    }
                  </div>
                )}
                
                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                
                {profile.avatar && (
                  <button
                    onClick={() => {
                      const updatedProfile = { ...profile, avatar: '' };
                      setProfile(updatedProfile);
                      localStorage.setItem('dailywell-profile', JSON.stringify(updatedProfile));
                      window.dispatchEvent(new Event('storage'));
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                    title={t('profileModal.removeAvatar')}
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName} ${profile.lastName}`
                    : t('profileModal.userProfile')
                  }
                </h4>
                <p className="text-gray-600">{profile.email || t('profileModal.noEmailSet')}</p>
                <p className="text-sm text-gray-500">
                  {profile.birthDate
                    ? `${t('profileModal.born')}: ${new Date(profile.birthDate).toLocaleDateString(i18n.language === 'zh' ? 'zh-CN' : i18n.language)}`
                    : t('profileModal.birthDateNotSet')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              {t('profileModal.personalInformation')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileModal.firstName')}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('profileModal.enterFirstName')}
                  />
                ) : (
                  <p className="text-gray-900">{profile.firstName || t('profileModal.notSet')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileModal.lastName')}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('profileModal.enterLastName')}
                  />
                ) : (
                  <p className="text-gray-900">{profile.lastName || t('profileModal.notSet')}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
              {t('profileModal.email')}
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('profileModal.enterEmail')}
                />
              ) : (
                                  <p className="text-gray-900">{profile.email || t('profileModal.notSet')}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
              {t('profileModal.birthDate')}
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isChinese ? 'chinese-date-input' : ''}`}
                      style={{
                        direction: 'ltr',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                      placeholder={isChinese ? 'YYYY-MM-DD' : 'MM/DD/YYYY'}
                    />
                    {isChinese && (
                      <p className="date-format-hint">格式: YYYY-MM-DD</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">
                    {formatDateForDisplay(profile.birthDate)}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileModal.gender')}</label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t('profileModal.selectGender')}</option>
                                  <option value="male">{t('profileModal.male')}</option>
              <option value="female">{t('profileModal.female')}</option>
              <option value="other">{t('profileModal.other')}</option>
              <option value="prefer-not-to-say">{t('profileModal.preferNotToSay')}</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile.gender || t('profileModal.notSet')}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              {t('profileModal.goals')}
            </h3>
            
            {isEditing ? (
              <div className="space-y-2">
                {[t('profileModal.goalFitnessHealth'), t('profileModal.goalProductivity'), t('profileModal.goalMindfulness'), t('profileModal.goalLearning'), t('profileModal.goalCareerGrowth'), t('profileModal.goalRelationships'), t('profileModal.goalFinancialGoals'), t('profileModal.goalCreativeProjects')].map((goal) => (
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
                  <p className="text-gray-500">{t('profileModal.noGoalsSet')}</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profileModal.progressSummary')}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-blue-700">{stats.totalPoints}</p>
                <p className="text-xs text-blue-600">{t('profileModal.totalPoints')}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-green-700">{stats.tasksCompleted}</p>
                <p className="text-xs text-green-600">{t('profileModal.tasksCompleted')}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-yellow-700">{stats.pomodoroSessions}</p>
                <p className="text-xs text-yellow-600">{t('profileModal.pomodoroSessions')}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-red-700">{stats.currentStreak}</p>
                <p className="text-xs text-red-600">{t('profileModal.currentStreak')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
                      <button
              onClick={onLogout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              {t('profileModal.logout')}
            </button>
        </div>
      </div>
    </div>
  );
};
