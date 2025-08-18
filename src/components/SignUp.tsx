import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';

interface SignUpProps {
  onSignUp: (userData: SignUpData) => void;
  onGoogleSignUp: () => void;
  onAppleSignUp: () => void;
  onWeChatSignUp: () => void;
  onLogin: () => void;
  onBack: () => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC<SignUpProps> = ({ 
  onSignUp, 
  onGoogleSignUp, 
  onAppleSignUp,
  onWeChatSignUp,
  onLogin, 
  onBack 
}) => {

  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isWeChatLoading, setIsWeChatLoading] = useState(false);

  const handleSignUp = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (!formData.email.includes('@')) {
      return;
    }

    if (formData.password.length < 6) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      await onSignUp(formData);
    } catch (error) {
      // Silent error
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      await onGoogleSignUp();
    } catch (error) {
      console.log('Google sign up failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setIsAppleLoading(true);
    try {
      await onAppleSignUp();
    } catch (error) {
      console.log('Apple sign up failed. Please try again.');
    } finally {
      setIsAppleLoading(false);
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
            className="absolute top-6 left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all text-white"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          

          
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg mt-8">Create Account</h1>
          <p className="text-white/90">Join DailyWell and start your wellness journey</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
          {/* First Name */}
          <div className="relative">
            <User size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <User size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>



          {/* Password */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
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
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>



          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-white/90">Already have an account? </span>
            <button
              onClick={onLogin}
              className="text-white font-semibold hover:text-white/80 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
