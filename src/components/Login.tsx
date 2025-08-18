import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onWeChatLogin: () => void;
  onForgotPassword: (email: string) => void;
  onSignUp: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ 
  onLogin, 
  onGoogleLogin, 
  onAppleLogin,
  onWeChatLogin,
  onForgotPassword,
  onSignUp, 
  onBack 
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isWeChatLoading, setIsWeChatLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [forgotPasswordState, setForgotPasswordState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleEmailLogin = async () => {
    // Reset errors
    setErrors({ email: '', password: '', general: '' });
    
    let hasErrors = false;
    const newErrors = { email: '', password: '', general: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
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
      setErrors({ email: '', password: '', general: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      console.log('Starting Google OAuth...');
      await onGoogleLogin();
      console.log('Google OAuth completed');
    } catch (error) {
      console.error('Google OAuth failed:', error);
      console.log('Google OAuth failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsAppleLoading(true);
    try {
      console.log('Starting Apple OAuth...');
      await onAppleLogin();
      console.log('Apple OAuth completed');
    } catch (error) {
      console.error('Apple OAuth failed:', error);
      console.log('Apple OAuth failed. Please try again.');
    } finally {
      setIsAppleLoading(false);
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

  const handleForgotPassword = () => {
    if (!email) {
      setErrors({ ...errors, email: 'Please enter your email address first' });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="absolute top-6 left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all text-white"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="absolute top-6 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all text-white"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2 mt-8">Welcome Back</h1>
          <p className="text-white/90">Sign in to continue your wellness journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
          {/* Email Input */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.password ? 'border-red-500' : 'border-white/30'
              }`}
            />
                         <button
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                : 'Forgot Password?'}
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
                Signing In...
              </div>
            ) : !email || !password ? (
              'Please fill in all fields'
            ) : (
              <div className="flex items-center justify-start">
                <svg className="w-5 h-5 mr-3 ml-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span className="text-left">Sign In</span>
              </div>
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
            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all border border-gray-200"
            >
              {isGoogleLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {/* Apple Button */}
            <button
              onClick={handleAppleLogin}
              disabled={isAppleLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-all"
            >
              {isAppleLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>Sign in with Apple</span>
                </>
              )}
            </button>

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
                  <span>微信登录 (WeChat Login)</span>
                </>
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-white/90">Don't have an account? </span>
            <button
              onClick={onSignUp}
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
