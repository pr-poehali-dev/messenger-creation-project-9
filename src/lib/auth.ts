export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'buyer' | 'seller';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'peeky_auth';
const USERS_KEY = 'peeky_users';

export const getAuthState = (): AuthState => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
};

export const setAuthState = (state: AuthState): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

export const getAllUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
};

export const saveUser = (user: User): void => {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = (email: string, password: string, name: string, phone: string, role: 'buyer' | 'seller'): { success: boolean; error?: string; user?: User } => {
  const users = getAllUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Пользователь с таким email уже существует' };
  }
  
  const user: User = {
    id: Date.now().toString(),
    email,
    name,
    phone,
    role,
    createdAt: new Date().toISOString()
  };
  
  saveUser(user);
  
  localStorage.setItem(`peeky_password_${email}`, password);
  
  const authState: AuthState = {
    user,
    isAuthenticated: true
  };
  setAuthState(authState);
  
  return { success: true, user };
};

export const login = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'Пользователь не найден' };
  }
  
  const storedPassword = localStorage.getItem(`peeky_password_${email}`);
  
  if (storedPassword !== password) {
    return { success: false, error: 'Неверный пароль' };
  }
  
  const authState: AuthState = {
    user,
    isAuthenticated: true
  };
  setAuthState(authState);
  
  return { success: true, user };
};

export const logout = (): void => {
  setAuthState({ user: null, isAuthenticated: false });
};
