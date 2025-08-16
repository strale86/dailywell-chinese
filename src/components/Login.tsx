import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  onForgotPassword: (email: string) => void;
  onSignUp: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ 
  onLogin, 
  onGoogleLogin, 
  onFacebookLogin, 
  onForgotPassword,
  onSignUp, 
  onBack 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
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

  const handleFacebookLogin = async () => {
    setIsFacebookLoading(true);
    try {
      console.log('Starting Facebook OAuth...');
      await onFacebookLogin();
      console.log('Facebook OAuth completed');
    } catch (error) {
      console.error('Facebook OAuth failed:', error);
      console.log('Facebook OAuth failed. Please try again.');
    } finally {
      setIsFacebookLoading(false);
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
            className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/30 transition-all text-white font-medium"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
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
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
              'Sign In'
            )}
          </button>

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
