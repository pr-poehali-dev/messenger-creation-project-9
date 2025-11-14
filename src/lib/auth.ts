import type { User, AuthState } from '@/types/chat';

const AUTH_KEY = 'chat_auth';
const API_URL = 'https://functions.poehali.dev/a314e807-6e5b-4f06-8089-b94fc502bbb6';

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

  async register(username: string, phone: string, password: string) {
    const response = await fetch(`${API_URL}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, phone, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка регистрации');
    }
    
    const data = await response.json();
    this.setAuthState(data.user, data.token);
    return data;
  },

  async login(phone: string, password: string) {
    const response = await fetch(`${API_URL}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
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