import React, { useState, useEffect } from 'react';
import { AuthService, AuthUser } from '../services/authService';

import { Welcome } from '../components/Welcome';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { MainApp } from '../components/MainApp';

type Screen = 'welcome' | 'login' | 'signup' | 'main';

export const AppNavigator = () => {
  console.log('AppNavigator component rendering...');
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const user = AuthService.getCurrentUser();
    if (user && AuthService.isAuthenticated()) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('AppNavigator: Starting email login...');
      const user = await AuthService.signInWithEmail(email, password);
      console.log('AppNavigator: Email login successful, user:', user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
      console.log('AppNavigator: Navigated to main screen');
    } catch (error) {
      console.error('AppNavigator: Email login error:', error);
      alert('Login failed: ' + (error as Error).message);
    }
  };

  const handleSignUp = async (userData: any) => {
    try {
      const user = await AuthService.signInWithEmail(userData.email, userData.password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setCurrentUser(null);
      setIsAuthenticated(false);
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('AppNavigator: Starting Google login...');
      const user = await AuthService.signInWithGoogle();
      console.log('AppNavigator: Google login successful, user:', user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
      console.log('AppNavigator: Navigated to main screen');
    } catch (error) {
      console.error('AppNavigator: Google login error:', error);
      alert('Google login failed: ' + (error as Error).message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const user = await AuthService.signInWithFacebook();
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
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
