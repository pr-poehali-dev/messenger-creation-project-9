export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface GameState {
  userId: string;
  coins: number;
  totalCoins: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  energy: number;
  level: number;
  upgrades: Upgrade[];
  lastSaved: string;
}

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  profit: number;
  owned: number;
  icon: string;
}
