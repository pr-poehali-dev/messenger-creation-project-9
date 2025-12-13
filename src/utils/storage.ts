import { User, GameState } from '@/types/game';

const STORAGE_KEYS = {
  USER: 'dragon_empire_user',
  GAME_STATE: 'dragon_empire_game',
  USERS_DB: 'dragon_empire_users',
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to localStorage:', error);
  }
};

export const getUser = (): User | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get user from localStorage:', error);
    return null;
  }
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const saveGameState = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify({
      ...state,
      lastSaved: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
};

export const getGameState = (): GameState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get game state from localStorage:', error);
    return null;
  }
};

export const getAllUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get users from localStorage:', error);
    return [];
  }
};

export const addUserToDB = (user: User): void => {
  try {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to add user to localStorage:', error);
  }
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserByUsername = (username: string): User | undefined => {
  const users = getAllUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
};