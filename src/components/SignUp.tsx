import React, { useState } from 'react';

import { Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';

interface SignUpProps {
  onSignUp: (userData: SignUpData) => void;
  onLogin: () => void;
  onBack: () => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

export const SignUp: React.FC<SignUpProps> = ({ 
  onSignUp, 
  onLogin, 
  onBack 
}) => {

  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Kreirajte nalog",
          subtitle: "Započnite svoj wellness put danas",
          firstName: "Ime",
          lastName: "Prezime",
          email: "Email adresa",
          password: "Lozinka",
          confirmPassword: "Potvrdite lozinku",
          birthDate: "Datum rođenja",
          firstNameRequired: "Unesite vaše ime",
          lastNameRequired: "Unesite vaše prezime",
          emailRequired: "Unesite vaš email",
          validEmail: "Unesite validan email",
          passwordRequired: "Unesite lozinku",
          passwordMinLength: "Lozinka mora imati najmanje 6 karaktera",
          passwordsDoNotMatch: "Lozinke se ne poklapaju",
          createAccount: "Kreirajte nalog",
          creatingAccount: "Kreiranje naloga...",
          hasAccount: "Već imate nalog?",
          signIn: "Prijavite se",
          back: "Nazad"
        };
      case 'zh':
        return {
          title: "创建账户",
          subtitle: "今天开始您的健康之旅",
          firstName: "名字",
          lastName: "姓氏",
          email: "邮箱地址",
          password: "密码",
          confirmPassword: "确认密码",
          birthDate: "出生日期",
          firstNameRequired: "请输入您的名字",
          lastNameRequired: "请输入您的姓氏",
          emailRequired: "请输入您的邮箱",
          validEmail: "请输入有效的邮箱",
          passwordRequired: "请输入密码",
          passwordMinLength: "密码至少需要6个字符",
          passwordsDoNotMatch: "密码不匹配",
          createAccount: "创建账户",
          creatingAccount: "创建账户中...",
          hasAccount: "已有账户？",
          signIn: "登录",
          back: "返回"
        };
      default: // English
        return {
          title: "Create Account",
          subtitle: "Start your wellness journey today",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email address",
          password: "Password",
          confirmPassword: "Confirm Password",
          birthDate: "Date of Birth",
          firstNameRequired: "Please enter your first name",
          lastNameRequired: "Please enter your last name",
          emailRequired: "Please enter your email",
          validEmail: "Please enter a valid email",
          passwordRequired: "Please enter a password",
          passwordMinLength: "Password must be at least 6 characters",
          passwordsDoNotMatch: "Passwords do not match",
          createAccount: "Create Account",
          creatingAccount: "Creating account...",
          hasAccount: "Already have an account?",
          signIn: "Sign In",
          back: "Back"
        };
    }
  };

  const text = getText();

  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });



  const handleSignUp = async () => {
    console.log('handleSignUp called with:', formData);
    
    // Reset errors
    setErrors({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });
    
    let hasErrors = false;
    const newErrors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' };

    if (!formData.firstName) {
      newErrors.firstName = 'Please enter your first name';
      hasErrors = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Please enter your last name';
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = 'Please enter your email';
      hasErrors = true;
    } else if (!formData.email.includes('@')) {
              newErrors.email = 'Please enter a valid email';
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password';
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasErrors = true;
    }

    if (!formData.confirmPassword) {
              newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    console.log('All validations passed, calling onSignUp...');
    setIsLoading(true);
    try {
      await onSignUp(formData);
      console.log('Sign up successful, redirecting to login...');
      // Ako je uspešno, prebaci na login
      onLogin();
    } catch (error) {
      console.error('Sign up failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      setErrors({ ...newErrors, general: errorMessage });
      console.log('Error message set:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };



  const updateFormData = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-sm sm:max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="absolute top-4 sm:top-6 left-3 sm:left-6 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/30 transition-all text-white font-medium text-sm sm:text-base"
          >
            ←
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">Create Account</h1>
          <p className="text-white/90 text-sm sm:text-base">Join your wellness journey today</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 border border-white/20">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {errors.general}
            </div>
          )}
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.firstName ? 'border-red-500' : 'border-white/30'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-200 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.lastName ? 'border-red-500' : 'border-white/30'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-200 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                errors.email ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.email && (
              <p className="text-red-200 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Birth Date - Custom Design */}
          <div className="relative">
            <label className="block text-white/90 text-xs sm:text-sm mb-2 font-medium">
              Date of Birth
            </label>
            <div className="flex space-x-1 sm:space-x-2">
              {/* Month */}
              <div className="flex-1">
                <select
                  value={formData.birthDate.split('/')[0] || ''}
                  onChange={(e) => {
                    const parts = formData.birthDate.split('/');
                    const newDate = `${e.target.value}/${parts[1] || ''}/${parts[2] || ''}`;
                    updateFormData('birthDate', newDate);
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 text-xs sm:text-sm"
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              
              {/* Day */}
              <div className="flex-1">
                <select
                  value={formData.birthDate.split('/')[1] || ''}
                  onChange={(e) => {
                    const parts = formData.birthDate.split('/');
                    const newDate = `${parts[0] || ''}/${e.target.value}/${parts[2] || ''}`;
                    updateFormData('birthDate', newDate);
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 text-xs sm:text-sm"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Year */}
              <div className="flex-1">
                <select
                  value={formData.birthDate.split('/')[2] || ''}
                  onChange={(e) => {
                    const parts = formData.birthDate.split('/');
                    const newDate = `${parts[0] || ''}/${parts[1] || ''}/${e.target.value}`;
                    updateFormData('birthDate', newDate);
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 text-xs sm:text-sm"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-12 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                errors.password ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.password && (
              <p className="text-red-200 text-xs mt-1">{errors.password}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            >
              {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-12 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                errors.confirmPassword ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-200 text-xs mt-1">{errors.confirmPassword}</p>
            )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            type="button"
            onClick={() => {
              console.log('Button clicked!');
              handleSignUp();
            }}
            disabled={isLoading}
            className={`w-full py-2 sm:py-3 rounded-xl font-semibold text-white transition-all text-sm sm:text-base ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 size={18} className="animate-spin mr-2 sm:w-5 sm:h-5" />
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>



          {/* Login Link */}
          <div className="text-center mt-4 sm:mt-6">
            <span className="text-white/90 text-sm sm:text-base">Already have an account? </span>
            <button
              onClick={onLogin}
              className="text-white font-semibold hover:text-white/80 transition-colors text-sm sm:text-base"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
