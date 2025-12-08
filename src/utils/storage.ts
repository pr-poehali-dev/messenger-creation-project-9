import { User, GameState } from '@/types/game';

const STORAGE_KEYS = {
  USER: 'dragon_empire_user',
  GAME_STATE: 'dragon_empire_game',
  USERS_DB: 'dragon_empire_users',
};

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const saveGameState = (state: GameState): void => {
  localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify({
    ...state,
    lastSaved: new Date().toISOString(),
  }));
};

export const getGameState = (): GameState | null => {
  const data = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
  return data ? JSON.parse(data) : null;
};

export const getAllUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS_DB);
  return data ? JSON.parse(data) : [];
};

export const addUserToDB = (user: User): void => {
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserByUsername = (username: string): User | undefined => {
  const users = getAllUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
};
