import { authService as supabaseAuth } from './supabaseService';

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
}

export class AuthService {
  static async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    try {
      const user = await supabaseAuth.signIn(email, password);
      if (!user) throw new Error('Login failed');
      
      return {
        uid: user.id,
        email: user.email || '',
        displayName: user.user_metadata?.display_name,
        photoURL: user.user_metadata?.avatar_url,
        providerId: 'email'
      };
    } catch (error) {
      console.error('Supabase auth error:', error);
      throw error;
    }
  }

  static async signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthUser> {
    try {
      const user = await supabaseAuth.signUp(email, password, displayName);
      if (!user) throw new Error('Sign up failed');
      
      return {
        uid: user.id,
        email: user.email || '',
        displayName: user.user_metadata?.display_name,
        photoURL: user.user_metadata?.avatar_url,
        providerId: 'email'
      };
    } catch (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      await supabaseAuth.signOut();
    } catch (error) {
      console.error('Supabase signout error:', error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const user = await supabaseAuth.getCurrentUser();
      if (!user) return null;
      
      return {
        uid: user.id,
        email: user.email || '',
        displayName: user.user_metadata?.display_name,
        photoURL: user.user_metadata?.avatar_url,
        providerId: 'email'
      };
    } catch (error) {
      console.error('Supabase getCurrentUser error:', error);
      return null;
    }
  }

  static isAuthenticated(): boolean {
    // This will be handled by Supabase auth state
    return false; // Will be updated with real-time auth state
  }
}