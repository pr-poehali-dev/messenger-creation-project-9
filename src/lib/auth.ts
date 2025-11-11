import type { User, AuthState } from '@/types/chat';

const AUTH_KEY = 'chat_auth';
const API_URL = 'https://functions.yandexcloud.net/d4e6bshlnmvdj7vdg6d5';

export const authService = {
  getAuthState(): AuthState {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) {
      return { user: null, token: null, isAuthenticated: false };
    }
    try {
      const parsed = JSON.parse(data);
      return { ...parsed, isAuthenticated: !!parsed.token };
    } catch {
      return { user: null, token: null, isAuthenticated: false };
    }
  },

  setAuthState(user: User, token: string): void {
    const state: AuthState = { user, token, isAuthenticated: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  },

  clearAuthState(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  async register(username: string, email: string, password: string, fullName?: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, full_name: fullName })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка регистрации');
    }
    
    const data = await response.json();
    this.setAuthState(data.user, data.token);
    return data;
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка входа');
    }
    
    const data = await response.json();
    this.setAuthState(data.user, data.token);
    return data;
  },

  logout(): void {
    this.clearAuthState();
  }
};
