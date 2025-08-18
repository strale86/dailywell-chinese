import React, { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { MainApp } from './components/MainApp';
import { OAuthCallback } from './components/OAuthCallback';
import { AuthService } from './services/authService';
import { socialAuthService } from './services/socialAuthService';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup' | 'main' | 'oauth-callback'>('main');
  const [oauthProvider, setOauthProvider] = useState<'google' | 'apple' | 'wechat' | 'alipay'>('google');

  // Debug logging removed for production

  // Check for OAuth callback on app load and auto-login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const screen = urlParams.get('screen');
    
    if (code && state && screen === 'oauth-callback') {
      // Determine provider from state
      if (state.startsWith('google_')) {
        setOauthProvider('google');
      } else if (state.startsWith('apple_')) {
        setOauthProvider('apple');
      } else if (state.startsWith('wechat_')) {
        setOauthProvider('wechat');
      } else if (state.startsWith('alipay_')) {
        setOauthProvider('alipay');
      }
      
      setCurrentScreen('oauth-callback');
    } else {
      // Auto-login check
      const checkAutoLogin = async () => {
        const currentUser = await AuthService.getCurrentUser();
        const socialUser = socialAuthService.getCurrentSocialUser();
        
        if (currentUser || socialUser) {
          setCurrentScreen('main');
        } else {
          // Auto-login with demo user
          const demoUser = {
            id: 'demo_user',
            email: 'demo@example.com',
            firstName: 'Demo',
            lastName: 'User',
            photoURL: '',
            providerId: 'email'
          };
          localStorage.setItem('currentUser', JSON.stringify(demoUser));
          setCurrentScreen('main');
        }
      };
      
      checkAutoLogin();
    }
  }, []);
  
  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await AuthService.signInWithEmail(email, password);
      setCurrentScreen('main');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignUp = async (userData: any) => {
    try {
      const user = await AuthService.signUpWithEmail(userData.email, userData.password, userData.firstName);
      setCurrentScreen('login');
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleForgotPassword = async (email: string) => {
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    // Reset code generated: ${resetCode} for ${email}
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await socialAuthService.signInWithGoogle();
      setCurrentScreen('main');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const user = await socialAuthService.signInWithApple();
      setCurrentScreen('main');
    } catch (error) {
      console.error('Apple login error:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const user = await socialAuthService.signInWithGoogle();
      setCurrentScreen('main');
    } catch (error) {
      console.error('Google sign up error:', error);
    }
  };

  const handleAppleSignUp = async () => {
    try {
      const user = await socialAuthService.signInWithApple();
      setCurrentScreen('main');
    } catch (error) {
      console.error('Apple sign up error:', error);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      const user = await socialAuthService.signInWithWeChat();
      setCurrentScreen('main');
    } catch (error) {
      console.error('WeChat login error:', error);
    }
  };

  const handleAlipayLogin = async () => {
    try {
      const user = await socialAuthService.signInWithAlipay();
      setCurrentScreen('main');
    } catch (error) {
      console.error('Alipay login error:', error);
    }
  };

  const handleWeChatSignUp = async () => {
    try {
      const user = await socialAuthService.signInWithWeChat();
      setCurrentScreen('main');
    } catch (error) {
      console.error('WeChat sign up error:', error);
    }
  };

  const handleAlipaySignUp = async () => {
    try {
      const user = await socialAuthService.signInWithAlipay();
      setCurrentScreen('main');
    } catch (error) {
      console.error('Alipay sign up error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      socialAuthService.signOut();
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Logout error:', error);
      setCurrentScreen('welcome');
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
            onWeChatLogin={handleWeChatLogin}
            onAlipayLogin={handleAlipayLogin}
            onForgotPassword={handleForgotPassword}
            onSignUp={() => setCurrentScreen('signup')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      case 'signup':
        return (
          <SignUp
            onSignUp={handleSignUp}
            onWeChatSignUp={handleWeChatSignUp}
            onAlipaySignUp={handleAlipaySignUp}
            onLogin={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'main':
        return <MainApp onLogout={handleLogout} />;
      case 'oauth-callback':
        return <OAuthCallback provider={oauthProvider} />;
      default:
        return <Welcome onGetStarted={() => setCurrentScreen('login')} />;
    }
  };
  
  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;