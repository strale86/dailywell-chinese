import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Target, Settings, X } from 'lucide-react';
// Removed react-datepicker imports to fix build error

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
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Profil",
          edit: "Uredi",
          save: "Sačuvaj",
          profilePicture: "Profilna slika",
          userProfile: "Korisnički profil",
          noEmailSet: "Email nije postavljen",
          born: "Rođen",
          birthDateNotSet: "Datum rođenja nije postavljen",
          personalInformation: "Lične informacije",
          firstName: "Ime",
          lastName: "Prezime",
          email: "Email",
          dateOfBirth: "Datum rođenja",
          gender: "Pol",
          enterFirstName: "Unesite ime",
          enterLastName: "Unesite prezime",
          enterEmail: "Unesite email",
          selectGender: "Izaberite pol",
          male: "Muško",
          female: "Žensko",
          other: "Drugo",
          preferNotToSay: "Ne želim da kažem",
          notSet: "Nije postavljeno",
          goals: "Ciljevi",
          fitnessHealth: "Fitness i zdravlje",
          productivity: "Produktivnost",
          mindfulness: "Svesnost",
          learning: "Učenje",
          careerGrowth: "Rast karijere",
          relationships: "Odnosi",
          financialGoals: "Finansijski ciljevi",
          creativeProjects: "Kreativni projekti",
          noGoalsSet: "Nema postavljenih ciljeva",
          progressSummary: "Sažetak napretka",
          totalPoints: "Ukupno poena",
          tasksCompleted: "Završeni zadaci",
          pomodoroSessions: "Pomodoro sesije",
          currentStreak: "Trenutna serija",
          logout: "Odjavi se",
          removeAvatar: "Ukloni avatar"
        };
      case 'zh':
        return {
          title: "个人资料",
          edit: "编辑",
          save: "保存",
          profilePicture: "头像",
          userProfile: "用户资料",
          noEmailSet: "未设置邮箱",
          born: "出生",
          birthDateNotSet: "未设置出生日期",
          personalInformation: "个人信息",
          firstName: "名字",
          lastName: "姓氏",
          email: "邮箱",
          dateOfBirth: "出生日期",
          gender: "性别",
          enterFirstName: "输入名字",
          enterLastName: "输入姓氏",
          enterEmail: "输入邮箱",
          selectGender: "选择性别",
          male: "男",
          female: "女",
          other: "其他",
          preferNotToSay: "不愿透露",
          notSet: "未设置",
          goals: "目标",
          fitnessHealth: "健身与健康",
          productivity: "生产力",
          mindfulness: "正念",
          learning: "学习",
          careerGrowth: "职业发展",
          relationships: "人际关系",
          financialGoals: "财务目标",
          creativeProjects: "创意项目",
          noGoalsSet: "未设置目标",
          progressSummary: "进度总结",
          totalPoints: "总积分",
          tasksCompleted: "已完成任务",
          pomodoroSessions: "番茄工作法会话",
          currentStreak: "当前连续",
          logout: "退出登录",
          removeAvatar: "删除头像"
        };
      default: // English
        return {
          title: "Profile",
          edit: "Edit",
          save: "Save",
          profilePicture: "Profile Picture",
          userProfile: "User Profile",
          noEmailSet: "No email set",
          born: "Born",
          birthDateNotSet: "Birth date not set",
          personalInformation: "Personal Information",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          dateOfBirth: "Date of Birth",
          gender: "Gender",
          enterFirstName: "Enter first name",
          enterLastName: "Enter last name",
          enterEmail: "Enter email",
          selectGender: "Select Gender",
          male: "Male",
          female: "Female",
          other: "Other",
          preferNotToSay: "Prefer not to say",
          notSet: "Not Set",
          goals: "Goals",
          fitnessHealth: "Fitness & Health",
          productivity: "Productivity",
          mindfulness: "Mindfulness",
          learning: "Learning",
          careerGrowth: "Career Growth",
          relationships: "Relationships",
          financialGoals: "Financial Goals",
          creativeProjects: "Creative Projects",
          noGoalsSet: "No goals set",
          progressSummary: "Progress Summary",
          totalPoints: "Total Points",
          tasksCompleted: "Tasks Completed",
          pomodoroSessions: "Pomodoro Sessions",
          currentStreak: "Current Streak",
          logout: "Logout",
          removeAvatar: "Remove Avatar"
        };
    }
  };

  const text = getText();
  
  // Language for date formatting
  const isChinese = false;
  
  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return text.notSet;
    
    const date = new Date(dateString);
    const locale = currentLanguage === 'sr' ? 'sr-RS' : currentLanguage === 'zh' ? 'zh-CN' : 'en-US';
    return date.toLocaleDateString(locale, {
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Observer za praćenje promena dark mode-a
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{text.edit}</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 sm:space-x-2 bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
              >
                <span>{text.save}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Avatar Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              {text.profilePicture}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold border-2 border-blue-200">
                    {profile.firstName && profile.lastName 
                      ? `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()
                      : 'U'
                    }
                  </div>
                )}
                
                <label className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                    title={text.removeAvatar}
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName} ${profile.lastName}`
                    : text.userProfile
                  }
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{profile.email || text.noEmailSet}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                  {profile.birthDate
                    ? `${text.born}: ${new Date(profile.birthDate).toLocaleDateString('en-US')}`
                    : text.birthDateNotSet}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              {text.personalInformation}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{text.firstName}</label>
                {isEditing ? (
                                      <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={text.enterFirstName}
                    />
                ) : (
                                      <p className="text-gray-900 dark:text-white">{profile.firstName || text.notSet}</p>
                )}
              </div>
              
              <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{text.lastName}</label>
                {isEditing ? (
                                      <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={text.enterLastName}
                    />
                ) : (
                                      <p className="text-gray-900 dark:text-white">{profile.lastName || text.notSet}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
              {text.email}
              </label>
              {isEditing ? (
                                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={text.enterEmail}
                />
              ) : (
                                  <p className="text-gray-900 dark:text-white">{profile.email || text.notSet}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
              {text.dateOfBirth}
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={profile.birthDate}
                      onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                      className="birth-date-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={currentLanguage === 'zh' ? '年-月-日' : currentLanguage === 'sr' ? 'GGGG-MM-DD' : 'YYYY-MM-DD'}
                    />

                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {formatDateForDisplay(profile.birthDate)}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{text.gender}</label>
                {isEditing ? (
                                    <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
                    style={{ 
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      color: isDarkMode ? '#ffffff' : '#111827'
                    }}
                  >
                    <option value="" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', color: isDarkMode ? '#ffffff' : '#111827' }}>{text.selectGender}</option>
                    <option value="male" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', color: isDarkMode ? '#ffffff' : '#111827' }}>{text.male}</option>
                    <option value="female" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', color: isDarkMode ? '#ffffff' : '#111827' }}>{text.female}</option>
                    <option value="other" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', color: isDarkMode ? '#ffffff' : '#111827' }}>{text.other}</option>
                    <option value="prefer-not-to-say" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', color: isDarkMode ? '#ffffff' : '#111827' }}>{text.preferNotToSay}</option>
                  </select>
                ) : (
                                      <p className="text-gray-900 dark:text-white">{profile.gender || text.notSet}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
              {text.goals}
            </h3>
            
            {isEditing ? (
              <div className="space-y-2">
                {[text.fitnessHealth, text.productivity, text.mindfulness, text.learning, text.careerGrowth, text.relationships, text.financialGoals, text.creativeProjects].map((goal) => (
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
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
                  <p className="text-gray-500 dark:text-gray-300">{text.noGoalsSet}</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">{text.progressSummary}</h3>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300">{stats.totalPoints}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{text.totalPoints}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-300">{stats.tasksCompleted}</p>
                <p className="text-xs text-green-600 dark:text-green-400">{text.tasksCompleted}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 sm:p-3 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-bold text-yellow-700 dark:text-yellow-300">{stats.pomodoroSessions}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">{text.pomodoroSessions}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-300">{stats.currentStreak}</p>
                <p className="text-xs text-red-600 dark:text-red-400">{text.currentStreak}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="p-3 sm:p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className="w-full px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
          >
            {text.logout}
          </button>
        </div>
      </div>
    </div>
  );
};
