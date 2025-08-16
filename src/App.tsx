import React, { useState } from 'react';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { MainApp } from './components/MainApp';
import { AuthService } from './services/authService';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup' | 'main'>('welcome');
  
  console.log('App component loaded, current screen:', currentScreen);
  
  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', email);
      const user = await AuthService.signInWithEmail(email, password);
      console.log('Login successful, navigating to main');
      setCurrentScreen('main');
    } catch (error) {
      console.error('Login error:', error);
      console.log('Login failed: ' + (error as Error).message);
    }
  };

  const handleSignUp = async (userData: any) => {
    try {
      console.log('Attempting sign up with:', userData.email);
      const user = await AuthService.signInWithEmail(userData.email, userData.password);
      console.log('Sign up successful, navigating to login');
      setCurrentScreen('login');
    } catch (error) {
      console.error('Sign up error:', error);
      console.log('Sign up failed: ' + (error as Error).message);
    }
  };

  const handleForgotPassword = async (email: string) => {
    // Generišem 6-cifreni kod
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    
    console.log(`Reset code sent to: ${email}, Code: ${resetCode}`);
    
    // Simuliram slanje email-a
    setTimeout(() => {
      console.log('Reset code email sent successfully');
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Logout error:', error);
      setCurrentScreen('welcome');
    }
  };
  
  const renderScreen = () => {
    try {
      console.log('Rendering screen:', currentScreen);
      
      switch (currentScreen) {
        case 'welcome':
          console.log('Rendering Welcome component');
          return <Welcome onGetStarted={() => setCurrentScreen('login')} />;
        case 'login':
          console.log('Rendering Login component');
          return (
            <Login 
              onLogin={handleLogin}
              onGoogleLogin={() => {}}
              onFacebookLogin={() => {}}
              onForgotPassword={handleForgotPassword}
              onSignUp={() => setCurrentScreen('signup')}
              onBack={() => setCurrentScreen('welcome')}
            />
          );
        case 'signup':
          console.log('Rendering SignUp component');
          return (
            <SignUp
              onSignUp={handleSignUp}
              onGoogleSignUp={() => {}}
              onFacebookSignUp={() => {}}
              onLogin={() => setCurrentScreen('login')}
              onBack={() => setCurrentScreen('welcome')}
            />
          );
        case 'main':
          console.log('Rendering MainApp component');
          return <MainApp onLogout={handleLogout} />;
        default:
          console.log('Rendering default Welcome component');
          return <Welcome onGetStarted={() => setCurrentScreen('login')} />;
      }
    } catch (error) {
      console.error('Error rendering screen:', error);
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-red-500">Something went wrong: {error instanceof Error ? error.message : 'Unknown error'}</p>
            <button 
              onClick={() => setCurrentScreen('welcome')} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Go to Welcome
            </button>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="App">
      <div className="debug-info" style={{position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', padding: '10px', zIndex: 9999}}>
        Current Screen: {currentScreen}
      </div>
      {renderScreen()}
    </div>
  );
}

export default App;