import { Quest } from '@/components/game/QuestSystem';

export function generateDailyQuests(): Quest[] {
  return [
    {
      id: 'daily-clicks',
      title: 'Мастер кликов',
      description: 'Сделай 1000 кликов по дракону',
      type: 'clicks',
      target: 1000,
      current: 0,
      reward: 1,
      icon: 'MousePointerClick',
      completed: false
    },
    {
      id: 'daily-coins',
      title: 'Сборщик монет',
      description: 'Собери 100,000 обычных монет',
      type: 'coins',
      target: 100000,
      current: 0,
      reward: 1,
      icon: 'Coins',
      completed: false
    },
    {
      id: 'daily-energy',
      title: 'Неутомимый',
      description: 'Потрать 5000 энергии',
      type: 'energy',
      target: 5000,
      current: 0,
      reward: 2,
      icon: 'Zap',
      completed: false
    },
    {
      id: 'daily-upgrades',
      title: 'Улучшатель',
      description: 'Купи 10 улучшений',
      type: 'upgrades',
      target: 10,
      current: 0,
      reward: 3,
      icon: 'TrendingUp',
      completed: false
    },
    {
      id: 'daily-dragons',
      title: 'Коллекционер',
      description: 'Открой 5 новых драконов',
      type: 'dragons',
      target: 5,
      current: 0,
      reward: 5,
      icon: 'Sparkles',
      completed: false
    }
  ];
}
