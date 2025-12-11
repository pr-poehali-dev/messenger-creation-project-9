import Icon from '@/components/ui/icon';

interface PlayerStatsProps {
  coins: number;
  totalCoins: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  energy: number;
  maxEnergy: number;
  currentDragonName: string;
  ownedDragonsCount: number;
  upgradesOwned: number;
  formatNumber: (num: number) => string;
}

export default function PlayerStats({
  coins,
  totalCoins,
  coinsPerTap,
  coinsPerSecond,
  energy,
  maxEnergy,
  currentDragonName,
  ownedDragonsCount,
  upgradesOwned,
  formatNumber
}: PlayerStatsProps) {
  return (
    <>
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
    </>
  );
}
