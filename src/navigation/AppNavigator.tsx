import React, { useState, useEffect } from 'react';
import { AuthService, AuthUser } from '../services/authService';

import { Welcome } from '../components/Welcome';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { MainApp } from '../components/MainApp';
import { OAuthCallback } from '../components/OAuthCallback';

type Screen = 'welcome' | 'login' | 'signup' | 'main' | 'oauth-callback';

export const AppNavigator = () => {
  console.log('AppNavigator component rendering...');
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    checkAuthStatus();
    
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');
    
    if (code && state && state === 'google_login') {
      // OAuth callback detected - handle Google login
      handleOAuthCallback(code);
    } else if (error) {
      // OAuth error
      alert(`OAuth error: ${error}`);
    }
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
      const user = await AuthService.signUpWithEmail(userData.email, userData.password, userData.firstName);
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

  const handleAppleLogin = async () => {
    try {
      console.log('AppNavigator: Starting Apple login...');
      const user = await AuthService.signInWithApple();
      console.log('AppNavigator: Apple login successful, user:', user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
      console.log('AppNavigator: Navigated to main screen');
    } catch (error) {
      console.error('AppNavigator: Apple login error:', error);
      alert('Apple login failed: ' + (error as Error).message);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      console.log('AppNavigator: Starting WeChat login...');
      const user = await socialAuthService.signInWithWeChat();
      console.log('AppNavigator: WeChat login successful, user:', user);
      
      // Convert SocialUser to AuthUser
      const authUser: AuthUser = {
        uid: user.id,
        email: user.email,
        displayName: `${user.firstName} ${user.lastName}`,
        photoURL: user.profilePicture,
        providerId: user.provider
      };
      
      setCurrentUser(authUser);
      setIsAuthenticated(true);
      setCurrentScreen('main');
      console.log('AppNavigator: Navigated to main screen');
    } catch (error) {
      console.error('AppNavigator: WeChat login error:', error);
      alert('WeChat login failed: ' + (error as Error).message);
    }
  };

  const handleAlipayLogin = async () => {
    try {
      // Placeholder za Alipay OAuth
      alert('Alipay OAuth not implemented yet');
    } catch (error) {
      console.error('Alipay login error:', error);
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

  const handleOAuthCallback = async (code: string) => {
    try {
      console.log('AppNavigator: Handling OAuth callback with code:', code);
      
      // Import OAuth functions
      const { exchangeCodeForToken, getUserInfo } = await import('../config/oauth');
      
      // Exchange code for token
      const tokenResponse = await exchangeCodeForToken('google', code);
      console.log('AppNavigator: Token exchange successful');
      
      // Get user info
      const userInfo = await getUserInfo('google', tokenResponse.access_token);
      console.log('AppNavigator: User info received:', userInfo);
      
      // Create user object
      const user: AuthUser = {
        uid: userInfo.id,
        email: userInfo.email,
        displayName: userInfo.name,
        photoURL: userInfo.picture,
        providerId: 'google.com'
      };
      
      // Set user and navigate to main
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      console.log('AppNavigator: OAuth login successful, navigated to main');
    } catch (error) {
      console.error('AppNavigator: OAuth callback error:', error);
      alert('OAuth login failed: ' + (error as Error).message);
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
            onAppleLogin={handleAppleLogin}
            onWeChatLogin={handleWeChatLogin}
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
                          onAppleSignUp={handleAppleLogin}
              onWeChatSignUp={handleWeChatLogin}
            onLogin={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'main':
        return <MainApp onLogout={handleLogout} />;
      case 'oauth-callback':
        return <OAuthCallback provider="google" />;
      default:
        return <Welcome onGetStarted={() => setCurrentScreen('login')} />;
    }
  };

  return renderScreen();
};
