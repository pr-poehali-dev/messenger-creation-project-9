import type { User, AuthState } from '@/types/chat';

const AUTH_KEY = 'chat_auth';
const EXPIRY_KEY = 'chat_auth_expiry';
const API_URL = 'https://functions.poehali.dev/a314e807-6e5b-4f06-8089-b94fc502bbb6';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const authService = {
  getAuthState(): AuthState {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) {
      return { user: null, token: null, isAuthenticated: false };
    }
    try {
      const parsed = JSON.parse(data);
      if (this.isSessionExpired()) {
        this.clearAuthState();
        return { user: null, token: null, isAuthenticated: false };
      }
      return { ...parsed, isAuthenticated: !!parsed.token };
    } catch {
      return { user: null, token: null, isAuthenticated: false };
    }
  },

  isSessionExpired(): boolean {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) return false;
    return Date.now() > parseInt(expiry, 10);
  },

  setAuthState(user: User, token: string, rememberMe = true): void {
    const state: AuthState = { user, token, isAuthenticated: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
    
    if (rememberMe) {
      const expiryTime = Date.now() + THIRTY_DAYS_MS;
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
    } else {
      localStorage.removeItem(EXPIRY_KEY);
    }
  },

  clearAuthState(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  },

  async register(username: string, phone: string, password: string, rememberMe = true) {
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
    this.setAuthState(data.user, data.token, rememberMe);
    return data;
  },

  async login(phone: string, password: string, rememberMe = true) {
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
    this.setAuthState(data.user, data.token, rememberMe);
    return data;
  },

  logout(): void {
    this.clearAuthState();
  },

  getSessionInfo(): { hasExpiry: boolean; daysRemaining: number; expiryDate: Date | null } {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) {
      return { hasExpiry: false, daysRemaining: 0, expiryDate: null };
    }
    
    const expiryTime = parseInt(expiry, 10);
    const now = Date.now();
    const msRemaining = expiryTime - now;
    const daysRemaining = Math.ceil(msRemaining / (24 * 60 * 60 * 1000));
    
    return {
      hasExpiry: true,
      daysRemaining: Math.max(0, daysRemaining),
      expiryDate: new Date(expiryTime)
    };
  }
};