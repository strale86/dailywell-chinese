export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
}

export class AuthService {
  // Google OAuth Login (prava implementacija)
  static async signInWithGoogle(): Promise<AuthUser> {
    try {
      console.log('Google OAuth starting...');
      
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        throw new Error('Google Client ID not configured');
      }
      
      // Debug: proveri koji Client ID se koristi
      console.log('Using Client ID:', clientId);
      if (clientId !== '422122756546-5f1e19u72jdimb8n1nftcd5qj2s7uesu.apps.googleusercontent.com') {
        alert(`Client ID mismatch! Expected: 422122756546-5f1e19u72jdimb8n1nftcd5qj2s7uesu.apps.googleusercontent.com\nGot: ${clientId}`);
      }

      // Google OAuth starting...

      // Koristi postojeću OAuth konfiguraciju
      const { buildOAuthUrl } = await import('../config/oauth');
      const authUrl = buildOAuthUrl('google', `google_login_${Date.now()}`);

      // Direktan redirect umesto popup-a
      window.location.href = authUrl;
      
      // Funkcija se neće vratiti jer se stranica preusmerava
      return new Promise(() => {
        // Ova funkcija se neće izvršiti jer se stranica preusmerava
      });
      
    } catch (error: any) {
      console.error('Google OAuth error:', error);
      throw new Error('Google OAuth failed: ' + error.message);
    }
  }

  // Facebook OAuth Login (simulacija)
  static async signInWithFacebook(): Promise<AuthUser> {
    try {
      console.log('Facebook OAuth simulation starting...');
      
      // Simuliram OAuth delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUser: AuthUser = {
        uid: 'fb_' + Date.now(),
        email: 'user@facebook.com',
        displayName: 'Facebook User',
        photoURL: 'https://graph.facebook.com/user/picture',
        providerId: 'facebook.com'
      };

      localStorage.setItem('userToken', 'facebook-token-' + Date.now());
      localStorage.setItem('userEmail', mockUser.email || '');
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: 'Facebook',
        lastName: 'User',
        email: mockUser.email,
        birthDate: '',
        gender: '',
        goals: []
      }));

      console.log('Facebook OAuth completed successfully');
      return mockUser;
    } catch (error: any) {
      console.error('Facebook OAuth error:', error);
      throw new Error('Facebook OAuth failed');
    }
  }

  // Apple OAuth Login (simulacija)
  static async signInWithApple(): Promise<AuthUser> {
    try {
      console.log('Apple OAuth simulation starting...');
      
      // Simuliram OAuth delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUser: AuthUser = {
        uid: 'apple_' + Date.now(),
        email: 'user@icloud.com',
        displayName: 'Apple User',
        photoURL: null,
        providerId: 'apple.com'
      };

      localStorage.setItem('userToken', 'apple-token-' + Date.now());
      localStorage.setItem('userEmail', mockUser.email || '');
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: 'Apple',
        lastName: 'User',
        email: mockUser.email,
        birthDate: '',
        gender: '',
        goals: []
      }));

      console.log('Apple OAuth completed successfully');
      return mockUser;
    } catch (error: any) {
      console.error('Apple OAuth error:', error);
      throw new Error('Apple OAuth failed');
    }
  }

  // WeChat OAuth Login (simulacija)
  static async signInWithWeChat(): Promise<AuthUser> {
    try {
      console.log('WeChat OAuth simulation starting...');
      
      // Simuliram OAuth delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUser: AuthUser = {
        uid: 'wechat_' + Date.now(),
        email: 'user@wechat.com',
        displayName: 'WeChat User',
        photoURL: 'https://thirdwx.qlogo.cn/user/avatar',
        providerId: 'wechat.com'
      };

      localStorage.setItem('userToken', 'wechat-token-' + Date.now());
      localStorage.setItem('userEmail', mockUser.email || '');
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: 'WeChat',
        lastName: 'User',
        email: mockUser.email,
        birthDate: '',
        gender: '',
        goals: []
      }));

      console.log('WeChat OAuth completed successfully');
      return mockUser;
    } catch (error: any) {
      console.error('WeChat OAuth error:', error);
      throw new Error('WeChat OAuth failed');
    }
  }

  // Email/Password Login (simulacija)
  static async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    try {
      console.log('Email login:', email);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const mockUser: AuthUser = {
        uid: 'email_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        providerId: 'password'
      };

      localStorage.setItem('userToken', 'email-token-' + Date.now());
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: email.split('@')[0],
        lastName: '',
        email: email,
        birthDate: '',
        gender: '',
        goals: []
      }));

      return mockUser;
    } catch (error: any) {
      console.error('Email sign in error:', error);
      throw new Error(error.message || 'Email sign in failed');
    }
  }

  // Sign Out
  static async signOut(): Promise<void> {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userProfile');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  // Get current user
  static getCurrentUser(): AuthUser | null {
    const token = localStorage.getItem('userToken');
    const email = localStorage.getItem('userEmail');
    
    if (!token || !email) {
      return null;
    }

    return {
      uid: 'current_user',
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      providerId: 'unknown'
    };
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }
}