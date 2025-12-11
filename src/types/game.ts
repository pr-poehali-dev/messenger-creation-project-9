export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Dragon {
  id: string;
  name: string;
  image: string;
  cost: number;
  goldCost?: number;
  coinsPerTap: number;
  maxEnergy: number;
  owned: boolean;
  availableFrom?: string;
  availableUntil?: string;
  isTemporary?: boolean;
}

export interface GameState {
  userId: string;
  coins: number;
  goldCoins?: number;
  totalCoins: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  energy: number;
  maxEnergy: number;
  level: number;
  upgrades: Upgrade[];
  lastSaved: string;
  energyRestoreTime?: number | null;
  currentDragonId: string;
  ownedDragons: string[];
  totalClicks?: number;
  totalEnergyUsed?: number;
  totalUpgrades?: number;
  maxCombo?: number;
  previousDragonId?: string;
  leaderboardRewardsClaimed?: {
    rank1?: boolean;
    rank2?: boolean;
    rank3?: boolean;
  };
}

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  profit: number;
  owned: number;
  icon: string;
}