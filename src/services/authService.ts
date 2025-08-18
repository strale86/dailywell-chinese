export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
}

export class AuthService {
  static async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    // Jednostavan localStorage login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: 'email'
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  static async signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthUser> {
    // Jednostavan localStorage signup
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Proveri da li korisnik već postoji
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      displayName,
      photoURL: '',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return {
      uid: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
      photoURL: newUser.photoURL,
      providerId: 'email'
    };
  }

  static async signOut(): Promise<void> {
    localStorage.removeItem('currentUser');
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    const user = localStorage.getItem('currentUser');
    if (!user) return null;
    
    const userData = JSON.parse(user);
    return {
      uid: userData.id,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      providerId: 'email'
    };
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}