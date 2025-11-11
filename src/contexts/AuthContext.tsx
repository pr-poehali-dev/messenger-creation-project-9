import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_URL = 'https://functions.poehali.dev/a314e807-6e5b-4f06-8089-b94fc502bbb6';

interface User {
  id: number;
  username: string;
  email: string;
  avatar_url: string;
  bio?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  sessionToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return localStorage.getItem('sessionToken');
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('sessionToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(AUTH_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Session-Token': token,
          },
          body: JSON.stringify({ action: 'verify' }),
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setSessionToken(token);
        } else {
          localStorage.removeItem('sessionToken');
          setSessionToken(null);
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        localStorage.removeItem('sessionToken');
        setSessionToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка входа');
    }

    const data = await response.json();
    setUser(data);
    setSessionToken(data.session_token);
    localStorage.setItem('sessionToken', data.session_token);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка регистрации');
    }

    const data = await response.json();
    setUser(data);
    setSessionToken(data.session_token);
    localStorage.setItem('sessionToken', data.session_token);
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('sessionToken');
  };

  return (
    <AuthContext.Provider value={{ user, sessionToken, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
