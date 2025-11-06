const AUTH_API_URL = 'https://functions.poehali.dev/a314e807-6e5b-4f06-8089-b94fc502bbb6';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export type User = {
  id: number;
  email: string;
  username: string;
  avatar: string;
};

export const auth = {
  async register(email: string, password: string, username: string): Promise<{ token: string; user: User }> {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', email, password, username })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  },
  
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  },
  
  async verifyToken(): Promise<User | null> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'GET',
        headers: { 'X-Auth-Token': token }
      });
      
      if (!response.ok) {
        this.logout();
        return null;
      }
      
      const data = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data.user;
    } catch {
      this.logout();
      return null;
    }
  },
  
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
};
