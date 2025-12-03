export interface Player {
  id: number;
  username: string;
  session_token: string;
}

export interface Resources {
  coins: number;
  wood: number;
  stone: number;
  food: number;
  iron: number;
  gold: number;
  population: number;
  max_population: number;
}

export interface BuildingType {
  id: number;
  name: string;
  category: 'city' | 'farm';
  description: string;
  cost: {
    coins: number;
    wood: number;
    stone: number;
    iron: number;
  };
  build_time: number;
  produces: string | null;
  production_rate: number;
  production_interval: number;
  provides_population: number;
  image: string;
  max_level: number;
  upgrade_multiplier: number;
}

export interface Building {
  id: number;
  type_id: number;
  x: number;
  y: number;
  level: number;
  is_building: boolean;
  build_complete_at: string | null;
  last_collected: string | null;
  name: string;
  category: 'city' | 'farm';
  produces: string | null;
  production_rate: number;
  production_interval: number;
  image: string;
  max_level: number;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  type: string;
  target: number;
  rewards: {
    coins: number;
    wood: number;
    stone: number;
    food: number;
    iron: number;
    experience: number;
  };
  required_level: number;
  icon: string;
  progress: number;
  completed: boolean;
  player_quest_id: number | null;
  active: boolean;
}

export interface GameState {
  resources: Resources;
  buildings: Building[];
}