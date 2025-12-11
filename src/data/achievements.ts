import { Achievement } from '@/types/game';

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'clicks_100',
    name: 'Первые клики',
    description: 'Кликните по дракону 100 раз',
    icon: 'MousePointerClick',
    category: 'clicks',
    target: 100,
    current: 0,
    completed: false,
    reward: { coins: 1000 }
  },
  {
    id: 'clicks_1000',
    name: 'Активный игрок',
    description: 'Кликните по дракону 1000 раз',
    icon: 'Hand',
    category: 'clicks',
    target: 1000,
    current: 0,
    completed: false,
    reward: { coins: 10000, goldCoins: 1 }
  },
  {
    id: 'clicks_10000',
    name: 'Мастер кликов',
    description: 'Кликните по дракону 10000 раз',
    icon: 'Zap',
    category: 'clicks',
    target: 10000,
    current: 0,
    completed: false,
    reward: { coins: 100000, goldCoins: 5 }
  },
  {
    id: 'coins_10000',
    name: 'Первый капитал',
    description: 'Накопите 10000 монет',
    icon: 'Coins',
    category: 'coins',
    target: 10000,
    current: 0,
    completed: false,
    reward: { coins: 5000 }
  },
  {
    id: 'coins_1000000',
    name: 'Миллионер',
    description: 'Накопите 1000000 монет',
    icon: 'DollarSign',
    category: 'coins',
    target: 1000000,
    current: 0,
    completed: false,
    reward: { coins: 50000, goldCoins: 2 }
  },
  {
    id: 'coins_1000000000',
    name: 'Миллиардер',
    description: 'Накопите 1000000000 монет',
    icon: 'Landmark',
    category: 'coins',
    target: 1000000000,
    current: 0,
    completed: false,
    reward: { coins: 500000, goldCoins: 10 }
  },
  {
    id: 'upgrades_5',
    name: 'Начинающий инвестор',
    description: 'Купите 5 улучшений',
    icon: 'TrendingUp',
    category: 'upgrades',
    target: 5,
    current: 0,
    completed: false,
    reward: { coins: 5000 }
  },
  {
    id: 'upgrades_20',
    name: 'Опытный инвестор',
    description: 'Купите 20 улучшений',
    icon: 'BarChart3',
    category: 'upgrades',
    target: 20,
    current: 0,
    completed: false,
    reward: { coins: 25000, goldCoins: 1 }
  },
  {
    id: 'upgrades_50',
    name: 'Магнат',
    description: 'Купите 50 улучшений',
    icon: 'LineChart',
    category: 'upgrades',
    target: 50,
    current: 0,
    completed: false,
    reward: { coins: 100000, goldCoins: 5 }
  },
  {
    id: 'dragons_3',
    name: 'Коллекционер',
    description: 'Получите 3 разных дракона',
    icon: 'BookOpen',
    category: 'dragons',
    target: 3,
    current: 0,
    completed: false,
    reward: { coins: 10000, goldCoins: 1 }
  },
  {
    id: 'dragons_10',
    name: 'Драконий повелитель',
    description: 'Получите 10 разных драконов',
    icon: 'Crown',
    category: 'dragons',
    target: 10,
    current: 0,
    completed: false,
    reward: { coins: 50000, goldCoins: 5 }
  },
  {
    id: 'dragons_20',
    name: 'Легендарный тренер',
    description: 'Получите 20 разных драконов',
    icon: 'Trophy',
    category: 'dragons',
    target: 20,
    current: 0,
    completed: false,
    reward: { coins: 200000, goldCoins: 15 }
  },
  {
    id: 'combo_10',
    name: 'Комбо мастер',
    description: 'Достигните комбо x10',
    icon: 'Flame',
    category: 'combo',
    target: 10,
    current: 0,
    completed: false,
    reward: { coins: 15000, goldCoins: 1 }
  },
  {
    id: 'combo_25',
    name: 'Комбо легенда',
    description: 'Достигните комбо x25',
    icon: 'Sparkles',
    category: 'combo',
    target: 25,
    current: 0,
    completed: false,
    reward: { coins: 50000, goldCoins: 3 }
  },
  {
    id: 'combo_50',
    name: 'Бог комбо',
    description: 'Достигните комбо x50',
    icon: 'Star',
    category: 'combo',
    target: 50,
    current: 0,
    completed: false,
    reward: { coins: 150000, goldCoins: 10 }
  },
  {
    id: 'energy_1000',
    name: 'Энергичный',
    description: 'Потратьте 1000 энергии',
    icon: 'Battery',
    category: 'energy',
    target: 1000,
    current: 0,
    completed: false,
    reward: { coins: 5000 }
  },
  {
    id: 'energy_10000',
    name: 'Неутомимый',
    description: 'Потратьте 10000 энергии',
    icon: 'BatteryCharging',
    category: 'energy',
    target: 10000,
    current: 0,
    completed: false,
    reward: { coins: 25000, goldCoins: 2 }
  },
  {
    id: 'energy_100000',
    name: 'Вечный двигатель',
    description: 'Потратьте 100000 энергии',
    icon: 'Bolt',
    category: 'energy',
    target: 100000,
    current: 0,
    completed: false,
    reward: { coins: 150000, goldCoins: 8 }
  }
];
