export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  progress: number;
  goal: number;
  unlocked: boolean;
  color: string;
}

export function getAchievements(
  totalCoins: number,
  ownedDragonsCount: number,
  upgradesOwned: number,
  level: number
): Achievement[] {
  return [
    {
      id: 1,
      name: 'Первые шаги',
      description: 'Заработай 1,000 монет',
      icon: 'Coins',
      progress: Math.min(totalCoins, 1000),
      goal: 1000,
      unlocked: totalCoins >= 1000,
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 2,
      name: 'Богатей',
      description: 'Заработай 100,000 монет',
      icon: 'TrendingUp',
      progress: Math.min(totalCoins, 100000),
      goal: 100000,
      unlocked: totalCoins >= 100000,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 3,
      name: 'Миллионер',
      description: 'Заработай 1,000,000 монет',
      icon: 'Crown',
      progress: Math.min(totalCoins, 1000000),
      goal: 1000000,
      unlocked: totalCoins >= 1000000,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 4,
      name: 'Коллекционер',
      description: 'Купи 3 драконов',
      icon: 'Flame',
      progress: ownedDragonsCount,
      goal: 3,
      unlocked: ownedDragonsCount >= 3,
      color: 'from-red-600 to-orange-600'
    },
    {
      id: 5,
      name: 'Повелитель драконов',
      description: 'Купи всех драконов',
      icon: 'Trophy',
      progress: ownedDragonsCount,
      goal: 14,
      unlocked: ownedDragonsCount >= 14,
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 6,
      name: 'Прокачанный',
      description: 'Купи 10 улучшений',
      icon: 'Zap',
      progress: upgradesOwned,
      goal: 10,
      unlocked: upgradesOwned >= 10,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 7,
      name: 'Мастер улучшений',
      description: 'Купи 50 улучшений',
      icon: 'Sparkles',
      progress: Math.min(upgradesOwned, 50),
      goal: 50,
      unlocked: upgradesOwned >= 50,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 8,
      name: 'Кликер-профи',
      description: 'Достигни 10 уровня',
      icon: 'Star',
      progress: level,
      goal: 10,
      unlocked: level >= 10,
      color: 'from-cyan-600 to-blue-600'
    }
  ];
}
