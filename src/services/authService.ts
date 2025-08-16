export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
}

export class AuthService {
  // Google OAuth Login (simulacija)
  static async signInWithGoogle(): Promise<AuthUser> {
    try {
      console.log('Google OAuth simulation starting...');
      
      // Simuliram OAuth delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUser: AuthUser = {
        uid: 'google_' + Date.now(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user',
        providerId: 'google.com'
      };

      localStorage.setItem('userToken', 'google-token-' + Date.now());
      localStorage.setItem('userEmail', mockUser.email || '');
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: 'Google',
        lastName: 'User',
        email: mockUser.email,
        birthDate: '',
        gender: '',
        goals: []
      }));

      console.log('Google OAuth completed successfully');
      return mockUser;
    } catch (error: any) {
      console.error('Google OAuth error:', error);
      throw new Error('Google OAuth failed');
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
