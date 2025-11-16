import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '@/types/chat';
import { authService } from '@/lib/auth';
import { registerPushToken } from '@/lib/pushNotifications';

interface AuthContextType extends AuthState {
  login: (phone: string, password: string) => Promise<void>;
  register: (username: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => authService.getAuthState());

  useEffect(() => {
    const state = authService.getAuthState();
    setAuthState(state);
  }, []);

  const login = async (phone: string, password: string) => {
    const data = await authService.login(phone, password);
    setAuthState({ user: data.user, token: data.token, isAuthenticated: true });
    
    if (data.token) {
      registerPushToken(data.token).catch(console.error);
    }
  };

  const register = async (username: string, phone: string, password: string) => {
    const data = await authService.register(username, phone, password);
    setAuthState({ user: data.user, token: data.token, isAuthenticated: true });
    
    if (data.token) {
      registerPushToken(data.token).catch(console.error);
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({ user: null, token: null, isAuthenticated: false });
  };

  const updateUser = (user: User) => {
    if (authState.token) {
      authService.setAuthState(user, authState.token);
      setAuthState(prev => ({ ...prev, user }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}