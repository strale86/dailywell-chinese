import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, Loader2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onWeChatLogin: () => void;
  onAlipayLogin: () => void;
  onForgotPassword: (email: string) => void;
  onSignUp: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ 
  onLogin, 
  onGoogleLogin, 
  onAppleLogin,
  onWeChatLogin,
  onAlipayLogin,
  onForgotPassword,
  onSignUp, 
  onBack 
}) => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWeChatLoading, setIsWeChatLoading] = useState(false);
  const [isAlipayLoading, setIsAlipayLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [forgotPasswordState, setForgotPasswordState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleEmailLogin = async () => {
    // Reset errors
    setErrors({ email: '', password: '', general: '' });
    
    let hasErrors = false;
    const newErrors = { email: '', password: '', general: '' };

    if (!email) {
      newErrors.email = t('login.emailRequired');
      hasErrors = true;
    } else if (!email.includes('@')) {
      newErrors.email = t('login.validEmail');
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = t('login.passwordRequired');
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (error) {
      setErrors({ email: '', password: '', general: t('login.invalidCredentials') });
    } finally {
      setIsLoading(false);
    }
  };



  const handleWeChatLogin = async () => {
    setIsWeChatLoading(true);
    try {
      console.log('Starting WeChat OAuth...');
      await onWeChatLogin();
      console.log('WeChat OAuth completed');
    } catch (error) {
      console.error('WeChat OAuth failed:', error);
      console.log('WeChat OAuth failed. Please try again.');
    } finally {
      setIsWeChatLoading(false);
    }
  };

  const handleAlipayLogin = async () => {
    setIsAlipayLoading(true);
    try {
      console.log('Starting Alipay OAuth...');
      await onAlipayLogin();
      console.log('Alipay OAuth completed');
    } catch (error) {
      console.error('Alipay OAuth failed:', error);
      console.log('Alipay OAuth failed. Please try again.');
    } finally {
      setIsAlipayLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrors({ ...errors, email: t('login.emailRequired') });
      return;
    }
    
    setForgotPasswordState('sending');
    onForgotPassword(email);
    
    // Simuliram slanje i menjam stanje
    setTimeout(() => {
      setForgotPasswordState('sent');
      setTimeout(() => {
        setForgotPasswordState('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'
    }`}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className={`absolute top-6 left-4 p-3 backdrop-blur-sm rounded-full shadow-lg transition-all ${
              isDarkMode 
                ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`absolute top-6 right-4 p-3 backdrop-blur-sm rounded-full shadow-lg transition-all ${
              isDarkMode 
                ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <h1 className={`text-3xl font-bold mb-2 mt-8 ${
            isDarkMode ? 'text-gray-100' : 'text-white'
          }`}>{t('login.title')}</h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-white/90'}>{t('login.subtitle')}</p>
        </div>

        {/* Login Form */}
        <div className={`backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-600/30' 
            : 'bg-white/10 border-white/20'
        }`}>
          {/* Email Input */}
          <div className="relative">
            <Mail size={20} className={`absolute left-3 top-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="email"
              placeholder={t('login.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                isDarkMode 
                  ? 'bg-gray-700/80 text-gray-100 placeholder-gray-400' 
                  : 'bg-white/80'
              } ${
                errors.email ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-white/30'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={20} className={`absolute left-3 top-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                isDarkMode 
                  ? 'bg-gray-700/80 text-gray-100 placeholder-gray-400' 
                  : 'bg-white/80'
              } ${
                errors.password ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-white/30'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <button
              onClick={handleForgotPassword}
              disabled={forgotPasswordState === 'sending'}
              className={`text-sm transition-all duration-300 ${
                forgotPasswordState === 'sent' 
                  ? 'text-green-400 font-semibold' 
                  : forgotPasswordState === 'sending'
                  ? 'text-yellow-400 cursor-not-allowed'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {forgotPasswordState === 'sending' 
                ? 'Sending...' 
                : forgotPasswordState === 'sent' 
                ? 'Code Sent!' 
                : t('login.forgotPassword')}
            </button>
          </div>

          {/* Email Login Button */}
          <button
            onClick={handleEmailLogin}
            disabled={isLoading || !email || !password}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
              isLoading || !email || !password
                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 size={20} className="animate-spin mr-2" />
                {t('login.signingIn')}
              </div>
            ) : !email || !password ? (
                              t('login.fillFields')
            ) : (
              <span>{t('login.signIn')}</span>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/60 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* WeChat Button */}
            <button
              onClick={handleWeChatLogin}
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
                  <span>{t('login.wechatLogin')}</span>
                </>
              )}
            </button>

            {/* Alipay Button */}
            <button
              onClick={handleAlipayLogin}
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
                  <span>{t('login.alipayLogin')}</span>
                </>
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-white/90">{t('login.noAccount')} </span>
            <button
              onClick={onSignUp}
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              {t('login.signUp')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
