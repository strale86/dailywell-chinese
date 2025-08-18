import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, User, Calendar, Loader2 } from 'lucide-react';

interface SignUpProps {
  onSignUp: (userData: SignUpData) => void;
  onWeChatSignUp: () => void;
  onAlipaySignUp: () => void;
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
  onWeChatSignUp, 
  onAlipaySignUp, 
  onLogin, 
  onBack 
}) => {
  const { t } = useTranslation();
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
  const [isWeChatLoading, setIsWeChatLoading] = useState(false);
  const [isAlipayLoading, setIsAlipayLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });

  const handleSignUp = async () => {
    console.log('handleSignUp called with:', formData);
    
    // Reset errors
    setErrors({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });
    
    let hasErrors = false;
    const newErrors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' };

    if (!formData.firstName) {
      newErrors.firstName = t('signup.enterFirstName');
      hasErrors = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = t('signup.enterLastName');
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = t('signup.enterEmail');
      hasErrors = true;
    } else if (!formData.email.includes('@')) {
      newErrors.email = t('login.validEmail');
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = t('signup.enterPassword');
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasErrors = true;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('signup.confirmPasswordPlaceholder');
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

  const handleWeChatSignUp = async () => {
    setIsWeChatLoading(true);
    try {
      await onWeChatSignUp();
    } catch (error) {
      console.log('WeChat sign up failed. Please try again.');
    } finally {
      setIsWeChatLoading(false);
    }
  };

  const handleAlipaySignUp = async () => {
    setIsAlipayLoading(true);
    try {
      await onAlipaySignUp();
    } catch (error) {
      console.log('Alipay sign up failed. Please try again.');
    } finally {
      setIsAlipayLoading(false);
    }
  };

  const updateFormData = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/30 transition-all text-white font-medium"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{t('signup.title')}</h1>
          <p className="text-white/90">{t('signup.subtitle')}</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {errors.general}
            </div>
          )}
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder={t('signup.firstName')}
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.firstName ? 'border-red-500' : 'border-white/30'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-200 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="relative">
              <User size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder={t('signup.lastName')}
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
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
            <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder={t('signup.email')}
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.email && (
              <p className="text-red-200 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Birth Date */}
          <div className="relative">
            <label className="block text-white/90 text-sm mb-2 font-medium">
              {t('signup.birthDate')}
            </label>
            <Calendar size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="年-月-日 (例如: 1990-01-01)"
              value={formData.birthDate}
              onChange={(e) => updateFormData('birthDate', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('signup.password')}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.password ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.password && (
              <p className="text-red-200 text-xs mt-1">{errors.password}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('signup.confirmPassword')}
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.confirmPassword ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-200 text-xs mt-1">{errors.confirmPassword}</p>
            )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 size={20} className="animate-spin mr-2" />
                {t('signup.creatingAccount')}
              </div>
            ) : (
              t('signup.createAccount')
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/60 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3">
            {/* WeChat Button */}
            <button
              onClick={handleWeChatSignUp}
              disabled={isWeChatLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all"
            >
              {isWeChatLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-3.706-3.78-6.53-8.012-6.53zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-2.324 0c0-.651.52-1.18 1.162-1.18zm5.618 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-2.324 0c0-.651.52-1.18 1.162-1.18z"/>
                    <path d="M24 14.487c0-3.386-3.4-6.136-7.589-6.136-4.288 0-7.767 2.75-7.767 6.136 0 3.386 3.479 6.136 7.767 6.136.856 0 1.682-.105 2.457-.299a.724.724 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .139.045c.135 0 .241-.111.241-.247 0-.06-.023-.12-.038-.177l-.325-1.233a.488.488 0 0 1 .177-.561C22.805 18.396 24 16.548 24 14.487zM16.07 12.797c-.535 0-.969-.44-.969-.982 0-.542.434-.982.969-.982s.969.44.969.982c0 .542-.434.982-.969.982zm4.618 0c-.535 0-.969-.44-.969-.982 0-.542.434-.982.969-.982s.969.44.969.982c0 .542-.434.982-.969.982z"/>
                  </svg>
                  <span>WeChat Sign Up</span>
                </>
              )}
            </button>

            {/* Alipay Button */}
            <button
              onClick={handleAlipaySignUp}
              disabled={isAlipayLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
            >
              {isAlipayLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <div className="w-5 h-5 bg-white rounded flex items-center justify-center text-blue-600 font-bold text-xs">
                    支
                  </div>
                  <span>Alipay Sign Up</span>
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-white/90">{t('signup.hasAccount')} </span>
            <button
              onClick={onLogin}
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              {t('signup.signIn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
