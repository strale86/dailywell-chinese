import React, { useState, useEffect } from 'react';

import { Welcome } from '../components/Welcome';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { MainApp } from '../components/MainApp';

type Screen = 'welcome' | 'login' | 'signup' | 'main';

export const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
      setCurrentScreen('main');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    // Simulate login - in real app, this would call your API
    try {
      // Store user token
      localStorage.setItem('userToken', 'dummy-token');
      localStorage.setItem('userEmail', email);
      
      // Check if user profile exists, if not create basic one
      const existingProfile = localStorage.getItem('userProfile');
      if (!existingProfile) {
        localStorage.setItem('userProfile', JSON.stringify({
          firstName: '',
          lastName: '',
          email: email,
          birthDate: '',
          gender: '',
          goals: []
        }));
      }
      
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (userData: any) => {
    // Simulate signup - in real app, this would call your API
    try {
      // Store user token and profile data
      localStorage.setItem('userToken', 'dummy-token');
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        birthDate: userData.birthDate,
        goals: []
      }));
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userProfile');
      setIsAuthenticated(false);
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Simulate Google login - in real app, this would use Google OAuth
      const mockGoogleUser = {
        email: 'user@gmail.com',
        firstName: 'Google',
        lastName: 'User',
        birthDate: '1990-01-01'
      };
      
      localStorage.setItem('userToken', 'google-token');
      localStorage.setItem('userEmail', mockGoogleUser.email);
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: mockGoogleUser.firstName,
        lastName: mockGoogleUser.lastName,
        email: mockGoogleUser.email,
        birthDate: mockGoogleUser.birthDate,
        gender: '',
        goals: []
      }));
      
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error) {
      alert('Google login failed. Please try again.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Simulate Facebook login - in real app, this would use Facebook OAuth
      const mockFacebookUser = {
        email: 'user@facebook.com',
        firstName: 'Facebook',
        lastName: 'User',
        birthDate: '1990-01-01'
      };
      
      localStorage.setItem('userToken', 'facebook-token');
      localStorage.setItem('userEmail', mockFacebookUser.email);
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: mockFacebookUser.firstName,
        lastName: mockFacebookUser.lastName,
        email: mockFacebookUser.email,
        birthDate: mockFacebookUser.birthDate,
        gender: '',
        goals: []
      }));
      
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error) {
      alert('Facebook login failed. Please try again.');
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      // Simulate password reset - in real app, this would send an email
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Password reset link has been sent to ${email}. Please check your email.`);
    } catch (error) {
      alert('Failed to send password reset email. Please try again.');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onGetStarted={() => setCurrentScreen('login')} />;
             case 'login':
         return (
           <Login
             onLogin={handleLogin}
             onGoogleLogin={handleGoogleLogin}
             onFacebookLogin={handleFacebookLogin}
             onForgotPassword={handleForgotPassword}
             onSignUp={() => setCurrentScreen('signup')}
             onBack={() => setCurrentScreen('welcome')}
           />
         );
             case 'signup':
         return (
           <SignUp
             onSignUp={handleSignUp}
             onGoogleSignUp={handleGoogleLogin}
             onFacebookSignUp={handleFacebookLogin}
             onLogin={() => setCurrentScreen('login')}
             onBack={() => setCurrentScreen('welcome')}
           />
         );
      case 'main':
        return <MainApp onLogout={handleLogout} />;
      default:
        return <Welcome onGetStarted={() => setCurrentScreen('login')} />;
    }
  };

  return renderScreen();
};
