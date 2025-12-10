import Icon from '@/components/ui/icon';

interface PlayerProfileProps {
  username: string;
  level: number;
  totalCoins: number;
  coins: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  energy: number;
  maxEnergy: number;
  currentDragonName: string;
  ownedDragonsCount: number;
  upgradesOwned: number;
  onClose: () => void;
  formatNumber: (num: number) => string;
}

export default function PlayerProfile({
  username,
  level,
  totalCoins,
  coins,
  coinsPerTap,
  coinsPerSecond,
  energy,
  maxEnergy,
  currentDragonName,
  ownedDragonsCount,
  upgradesOwned,
  onClose,
  formatNumber
}: PlayerProfileProps) {
  const achievements = [
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
      goal: 6,
      unlocked: ownedDragonsCount >= 6,
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

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-black border-2 border-purple-500/50 rounded-3xl max-w-4xl w-full p-4 sm:p-6 md:p-8 relative my-4 sm:my-8 max-h-[95vh] overflow-y-auto animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold text-white border-2 sm:border-4 border-purple-500">
            {username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{username}</h2>
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border-2 border-purple-400">
            <span className="font-bold text-base sm:text-lg md:text-xl">Уровень {level}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="Coins" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-purple-300">Текущий баланс</div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-400 truncate">{formatNumber(coins)}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="TrendingUp" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-purple-300">Всего заработано</div>
                <div className="text-lg sm:text-2xl font-bold text-purple-400 truncate">{formatNumber(totalCoins)}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="HandCoins" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-purple-300">Монет за клик</div>
                <div className="text-lg sm:text-2xl font-bold text-green-400 truncate">+{coinsPerTap}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="Zap" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-purple-300">Монет в секунду</div>
                <div className="text-lg sm:text-2xl font-bold text-cyan-400 truncate">{coinsPerSecond}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="Battery" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-purple-300">Энергия</div>
                <div className="text-lg sm:text-2xl font-bold text-orange-400 truncate">{energy} / {maxEnergy}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name="Flame" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-purple-300">Текущий дракон</div>
                <div className="text-base sm:text-lg font-bold text-pink-400 truncate">{currentDragonName}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">{ownedDragonsCount}</div>
            <div className="text-xs sm:text-sm text-purple-300">Драконов куплено</div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">{upgradesOwned}</div>
            <div className="text-xs sm:text-sm text-cyan-300">Улучшений куплено</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Достижения
            </h3>
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-yellow-500/50">
              <span className="font-bold text-sm sm:text-base">{unlockedCount} / {achievements.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                    : 'border-gray-700/30 opacity-60'
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${achievement.color} rounded-lg flex items-center justify-center flex-shrink-0 ${
                    achievement.unlocked ? 'animate-pulse' : ''
                  }`}>
                    <Icon name={achievement.icon as any} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-base text-white mb-1 flex items-center gap-2">
                      <span className="truncate">{achievement.name}</span>
                      {achievement.unlocked && (
                        <Icon name="Check" size={14} className="text-green-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-purple-300 mb-2 line-clamp-2">{achievement.description}</div>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Прогресс</span>
                          <span className="text-white font-bold">
                            {formatNumber(achievement.progress)} / {formatNumber(achievement.goal)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
                            style={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {achievement.unlocked && (
                      <div className="text-xs text-green-400 font-bold">✓ Выполнено</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}