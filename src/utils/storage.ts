import { User, GameState } from '@/types/game';

const STORAGE_KEYS = {
  USER: 'dragon_empire_user',
  GAME_STATE: 'dragon_empire_game',
  USERS_DB: 'dragon_empire_users',
};

// In-memory fallback storage
const memoryStorage: { [key: string]: string } = {};

// Check if localStorage is available
let isLocalStorageAvailable = false;
try {
  const testKey = '__storage_test__';
  localStorage.setItem(testKey, 'test');
  localStorage.removeItem(testKey);
  isLocalStorageAvailable = true;
  console.log('[Storage] localStorage is available');
} catch (error) {
  console.warn('[Storage] localStorage is NOT available, using memory fallback', error);
  isLocalStorageAvailable = false;
}

// Safe storage wrapper
const safeStorage = {
  getItem: (key: string): string | null => {
    if (isLocalStorageAvailable) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('[Storage] Error reading from localStorage:', error);
        return memoryStorage[key] || null;
      }
    }
    return memoryStorage[key] || null;
  },
  
  setItem: (key: string, value: string): void => {
    if (isLocalStorageAvailable) {
      try {
        localStorage.setItem(key, value);
        // Also save to memory as backup
        memoryStorage[key] = value;
      } catch (error) {
        console.error('[Storage] Error writing to localStorage:', error);
        memoryStorage[key] = value;
      }
    } else {
      memoryStorage[key] = value;
    }
  },
  
  removeItem: (key: string): void => {
    if (isLocalStorageAvailable) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('[Storage] Error removing from localStorage:', error);
      }
    }
    delete memoryStorage[key];
  }
};

export const saveUser = (user: User): void => {
  try {
    safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    console.log('[Storage] User saved:', user.username);
  } catch (error) {
    console.error('[Storage] Failed to save user:', error);
  }
};

export const getUser = (): User | null => {
  try {
    const data = safeStorage.getItem(STORAGE_KEYS.USER);
    const user = data ? JSON.parse(data) : null;
    if (user) {
      console.log('[Storage] User loaded:', user.username);
    }
    return user;
  } catch (error) {
    console.error('[Storage] Failed to get user:', error);
    return null;
  }
};

export const removeUser = (): void => {
  try {
    safeStorage.removeItem(STORAGE_KEYS.USER);
    console.log('[Storage] User removed');
  } catch (error) {
    console.error('[Storage] Failed to remove user:', error);
  }
};

export const saveGameState = (state: GameState): void => {
  try {
    safeStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify({
      ...state,
      lastSaved: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('[Storage] Failed to save game state:', error);
  }
};

export const getGameState = (): GameState | null => {
  try {
    const data = safeStorage.getItem(STORAGE_KEYS.GAME_STATE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('[Storage] Failed to get game state:', error);
    return null;
  }
};

export const getAllUsers = (): User[] => {
  try {
    const data = safeStorage.getItem(STORAGE_KEYS.USERS_DB);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[Storage] Failed to get users:', error);
    return [];
  }
};

export const addUserToDB = (user: User): void => {
  try {
    const users = getAllUsers();
    users.push(user);
    safeStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
    console.log('[Storage] User added to DB:', user.username);
  } catch (error) {
    console.error('[Storage] Failed to add user to DB:', error);
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

// Export storage status
export const getStorageStatus = () => ({
  isLocalStorageAvailable,
  storageType: isLocalStorageAvailable ? 'localStorage' : 'memory',
});
