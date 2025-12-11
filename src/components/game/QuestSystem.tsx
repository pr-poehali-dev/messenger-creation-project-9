import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'clicks' | 'coins' | 'energy' | 'upgrades' | 'dragons';
  target: number;
  current: number;
  reward: number;
  icon: string;
  completed: boolean;
}

interface QuestSystemProps {
  onClose: () => void;
  totalClicks: number;
  totalCoins: number;
  totalEnergyUsed: number;
  totalUpgrades: number;
  totalDragons: number;
  goldCoins: number;
  onRewardClaimed: (goldAmount: number) => void;
}

export default function QuestSystem({
  onClose,
  totalClicks,
  totalCoins,
  totalEnergyUsed,
  totalUpgrades,
  totalDragons,
  goldCoins,
  onRewardClaimed
}: QuestSystemProps) {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const savedQuests = localStorage.getItem('dragonQuests');
    const lastReset = localStorage.getItem('questsLastReset');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (savedQuests && lastReset && now - parseInt(lastReset) < oneDay) {
      setQuests(JSON.parse(savedQuests));
    } else {
      const newQuests = generateDailyQuests();
      setQuests(newQuests);
      localStorage.setItem('dragonQuests', JSON.stringify(newQuests));
      localStorage.setItem('questsLastReset', now.toString());
    }
  }, []);

  useEffect(() => {
    const updatedQuests = quests.map(quest => {
      let current = quest.current;
      
      switch (quest.type) {
        case 'clicks':
          current = Math.min(totalClicks, quest.target);
          break;
        case 'coins':
          current = Math.min(totalCoins, quest.target);
          break;
        case 'energy':
          current = Math.min(totalEnergyUsed, quest.target);
          break;
        case 'upgrades':
          current = Math.min(totalUpgrades, quest.target);
          break;
        case 'dragons':
          current = Math.min(totalDragons, quest.target);
          break;
      }
      
      return { ...quest, current };
    });

    if (JSON.stringify(updatedQuests) !== JSON.stringify(quests)) {
      setQuests(updatedQuests);
      localStorage.setItem('dragonQuests', JSON.stringify(updatedQuests));
    }
  }, [totalClicks, totalCoins, totalEnergyUsed, totalUpgrades, totalDragons]);

  const generateDailyQuests = (): Quest[] => {
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
  };

  const handleClaimReward = (quest: Quest) => {
    if (quest.current >= quest.target && !quest.completed) {
      const updatedQuests = quests.map(q => 
        q.id === quest.id ? { ...q, completed: true } : q
      );
      setQuests(updatedQuests);
      localStorage.setItem('dragonQuests', JSON.stringify(updatedQuests));
      onRewardClaimed(quest.reward);
    }
  };

  const completedQuests = quests.filter(q => q.completed).length;
  const totalRewards = quests.reduce((sum, q) => sum + (q.completed ? q.reward : 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-500/30 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center gap-2">
              <Icon name="Trophy" size={32} />
              Ежедневные квесты
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Выполняй задания и зарабатывай золотые монеты!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="X" size={28} />
          </button>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 mb-6 border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Icon name="Award" size={24} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Прогресс квестов</p>
                <p className="text-gray-300 text-sm">
                  Выполнено: {completedQuests} из {quests.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 text-2xl font-bold flex items-center gap-1">
                <Icon name="Coins" size={24} />
                {totalRewards}
              </p>
              <p className="text-gray-400 text-xs">Заработано золота</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {quests.map((quest, index) => {
              const progress = Math.min((quest.current / quest.target) * 100, 100);
              const canClaim = quest.current >= quest.target && !quest.completed;

              return (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${
                    quest.completed
                      ? 'from-green-900/40 to-emerald-900/40 border-green-500/30'
                      : canClaim
                      ? 'from-yellow-900/40 to-orange-900/40 border-yellow-500/50'
                      : 'from-purple-900/40 to-indigo-900/40 border-purple-500/30'
                  } rounded-xl p-4 border-2 transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      quest.completed
                        ? 'bg-green-500/20'
                        : canClaim
                        ? 'bg-yellow-500/20'
                        : 'bg-purple-500/20'
                    }`}>
                      <Icon 
                        name={quest.icon as any} 
                        size={28} 
                        className={
                          quest.completed
                            ? 'text-green-400'
                            : canClaim
                            ? 'text-yellow-400'
                            : 'text-purple-400'
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            {quest.title}
                            {quest.completed && (
                              <Icon name="CheckCircle2" size={20} className="text-green-400" />
                            )}
                          </h3>
                          <p className="text-gray-300 text-sm">{quest.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 font-bold">
                          <Icon name="Coins" size={20} />
                          +{quest.reward}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            Прогресс: {quest.current.toLocaleString()} / {quest.target.toLocaleString()}
                          </span>
                          <span className={`font-semibold ${
                            quest.completed
                              ? 'text-green-400'
                              : canClaim
                              ? 'text-yellow-400'
                              : 'text-purple-400'
                          }`}>
                            {progress.toFixed(0)}%
                          </span>
                        </div>

                        <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`h-full ${
                              quest.completed
                                ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                                : canClaim
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                                : 'bg-gradient-to-r from-purple-500 to-indigo-400'
                            }`}
                          />
                        </div>

                        {canClaim && (
                          <motion.button
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleClaimReward(quest)}
                            className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                          >
                            <Icon name="Gift" size={20} />
                            Забрать награду!
                          </motion.button>
                        )}

                        {quest.completed && (
                          <div className="text-center text-green-400 font-semibold text-sm mt-2 flex items-center justify-center gap-2">
                            <Icon name="CheckCircle" size={18} />
                            Награда получена!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-6 bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 text-blue-300">
            <Icon name="Info" size={20} />
            <p className="text-sm">
              Квесты обновляются каждые 24 часа. Золотые монеты можно обменять на эксклюзивных драконов!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
