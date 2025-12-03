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
}

export interface GameState {
  resources: Resources;
  buildings: Building[];
}
