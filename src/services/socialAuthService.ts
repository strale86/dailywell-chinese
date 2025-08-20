import { buildOAuthUrl, exchangeCodeForToken, getUserInfo, isOAuthConfigured } from '../config/oauth';

// Social Authentication Service with Real OAuth Integration
export interface SocialUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  provider: 'google' | 'apple' | 'wechat' | 'alipay';
  accessToken?: string;
}

class SocialAuthService {

  // Google OAuth with real implementation
  async signInWithGoogle(): Promise<SocialUser> {
    try {
      // Check if we have real OAuth credentials
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || import.meta.env.REACT_APP_GOOGLE_CLIENT_SECRET;
      
      if (!clientId || clientId === 'your_google_client_id' || !clientSecret || clientSecret === 'your_google_client_secret' || clientSecret === 'your_google_client_secret_here') {
        // Fallback to demo mode if no real credentials
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create demo user
        const mockUser: SocialUser = {
          id: `google_${Date.now()}`,
          email: 'demo@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          profilePicture: 'https://via.placeholder.com/150',
          provider: 'google'
        };
        
        localStorage.setItem('dailywell-social-user', JSON.stringify(mockUser));
        return mockUser;
      }
      
      // Real OAuth implementation with popup
      const state = `google_${Date.now()}`;
      const authUrl = buildOAuthUrl('google', state);
      
      // Store state for verification
      sessionStorage.setItem('oauth_state', state);
      
      // Open OAuth popup
      const popup = window.open(authUrl, 'google_oauth', 'width=500,height=600');
      
      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      
      // Wait for OAuth callback
      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            reject(new Error('OAuth popup was closed'));
          }
        }, 1000);
        
        // Listen for OAuth callback
        const messageHandler = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'oauth_callback') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            
            try {
              // Close popup first
              if (popup && !popup.closed) {
                popup.close();
              }
              
              const { code, state: returnedState } = event.data;
              
              // Verify state
              const storedState = sessionStorage.getItem('oauth_state');
              if (returnedState !== storedState) {
                throw new Error('OAuth state mismatch');
              }
              
              // Exchange code for token
              const tokenResponse = await exchangeCodeForToken('google', code);
              
              // Get user info
              const userInfo = await getUserInfo('google', tokenResponse.access_token);
              
              const user: SocialUser = {
                id: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                profilePicture: userInfo.picture,
                provider: 'google',
                accessToken: tokenResponse.access_token
              };
              
              localStorage.setItem('dailywell-social-user', JSON.stringify(user));
              resolve(user);
            } catch (error) {
              reject(error);
            }
          }
        };
        
        window.addEventListener('message', messageHandler);
      });
    } catch (error) {
      throw new Error('Google sign-in failed');
    }
  }

  // Apple OAuth with demo mode
  async signInWithApple(): Promise<SocialUser> {
    try {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create demo user
      const mockUser: SocialUser = {
        id: `apple_${Date.now()}`,
        email: 'demo@icloud.com',
        firstName: 'Jane',
        lastName: 'Smith',
        profilePicture: 'https://via.placeholder.com/150',
        provider: 'apple'
      };
      
      localStorage.setItem('dailywell-social-user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      throw new Error('Apple sign-in failed');
    }
  }

  // WeChat OAuth with real implementation
  async signInWithWeChat(): Promise<SocialUser> {
    try {
      // Check if OAuth is properly configured
      if (!isOAuthConfigured('wechat')) {
        // Fallback to demo mode if no real credentials
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser: SocialUser = {
          id: `wechat_${Date.now()}`,
          email: 'demo@wechat.com',
          firstName: 'Li',
          lastName: 'Wei',
          profilePicture: 'https://via.placeholder.com/150',
          provider: 'wechat'
        };
        
        localStorage.setItem('dailywell-social-user', JSON.stringify(mockUser));
        return mockUser;
      }
      
      // Real OAuth implementation
      const state = `wechat_${Date.now()}`;
      const authUrl = buildOAuthUrl('wechat', state);
      
      // Store state for verification
      sessionStorage.setItem('oauth_state', state);
      
      // Open OAuth popup
      const popup = window.open(authUrl, 'wechat_oauth', 'width=500,height=600');
      
      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      
      // Wait for OAuth callback
      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            reject(new Error('OAuth popup was closed'));
          }
        }, 1000);
        
        // Listen for OAuth callback
        window.addEventListener('message', async (event) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'oauth_callback') {
            clearInterval(checkClosed);
            popup.close();
            
            try {
              const { code, state: returnedState } = event.data;
              
              // Verify state
              const storedState = sessionStorage.getItem('oauth_state');
              if (returnedState !== storedState) {
                throw new Error('OAuth state mismatch');
              }
              
              // Exchange code for token
              const tokenResponse = await exchangeCodeForToken('wechat', code);
              
              // Get user info
              const userInfo = await getUserInfo('wechat', tokenResponse.access_token, tokenResponse.openid);
              
              const user: SocialUser = {
                id: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                profilePicture: userInfo.picture,
                provider: 'wechat',
                accessToken: tokenResponse.access_token
              };
              
              localStorage.setItem('dailywell-social-user', JSON.stringify(user));
              resolve(user);
            } catch (error) {
              reject(error);
            }
          }
        });
      });
    } catch (error) {
      throw new Error('WeChat sign-in failed');
    }
  }

  // Alipay OAuth with real implementation
  async signInWithAlipay(): Promise<SocialUser> {
    try {
      // Check if OAuth is properly configured
      if (!isOAuthConfigured('alipay')) {
        // Fallback to demo mode if no real credentials
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser: SocialUser = {
          id: `alipay_${Date.now()}`,
          email: 'demo@alipay.com',
          firstName: 'Zhang',
          lastName: 'Ming',
          profilePicture: 'https://via.placeholder.com/150',
          provider: 'alipay'
        };
        
        localStorage.setItem('dailywell-social-user', JSON.stringify(mockUser));
        return mockUser;
      }
      
      // Real OAuth implementation
      const state = `alipay_${Date.now()}`;
      const authUrl = buildOAuthUrl('alipay', state);
      
      // Store state for verification
      sessionStorage.setItem('oauth_state', state);
      
      // Open OAuth popup
      const popup = window.open(authUrl, 'alipay_oauth', 'width=500,height=600');
      
      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      
      // Wait for OAuth callback
      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            reject(new Error('OAuth popup was closed'));
          }
        }, 1000);
        
        // Listen for OAuth callback
        window.addEventListener('message', async (event) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'oauth_callback') {
            clearInterval(checkClosed);
            popup.close();
            
            try {
              const { code, state: returnedState } = event.data;
              
              // Verify state
              const storedState = sessionStorage.getItem('oauth_state');
              if (returnedState !== storedState) {
                throw new Error('OAuth state mismatch');
              }
              
              // Exchange code for token
              const tokenResponse = await exchangeCodeForToken('alipay', code);
              
              // Get user info
              const userInfo = await getUserInfo('alipay', tokenResponse.access_token);
              
              const user: SocialUser = {
                id: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                profilePicture: userInfo.picture,
                provider: 'alipay',
                accessToken: tokenResponse.access_token
              };
              
              localStorage.setItem('dailywell-social-user', JSON.stringify(user));
              resolve(user);
            } catch (error) {
              reject(error);
            }
          }
        });
      });
    } catch (error) {
      throw new Error('Alipay sign-in failed');
    }
  }

  // Get current social user
  getCurrentSocialUser(): SocialUser | null {
    const user = localStorage.getItem('dailywell-social-user');
    return user ? JSON.parse(user) : null;
  }

  // Sign out
  signOut(): void {
    localStorage.removeItem('dailywell-social-user');
  }

  // Check if user is signed in
  isSignedIn(): boolean {
    return !!this.getCurrentSocialUser();
  }
}

export const socialAuthService = new SocialAuthService();
