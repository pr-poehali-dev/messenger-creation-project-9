import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '@/types/chat';
import { authService } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, fullName?: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    setAuthState({ user: data.user, token: data.token, isAuthenticated: true });
  };

  const register = async (username: string, email: string, password: string, fullName?: string) => {
    const data = await authService.register(username, email, password, fullName);
    setAuthState({ user: data.user, token: data.token, isAuthenticated: true });
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
