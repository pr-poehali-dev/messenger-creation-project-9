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
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-black border-2 border-purple-500/50 rounded-3xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-bold text-white border-4 border-purple-500">
            {username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{username}</h2>
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full border-2 border-purple-400">
            <span className="font-bold text-xl">Уровень {level}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Icon name="Coins" size={20} />
              </div>
              <div>
                <div className="text-sm text-purple-300">Текущий баланс</div>
                <div className="text-2xl font-bold text-yellow-400">{formatNumber(coins)}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} />
              </div>
              <div>
                <div className="text-sm text-purple-300">Всего заработано</div>
                <div className="text-2xl font-bold text-purple-400">{formatNumber(totalCoins)}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Icon name="HandCoins" size={20} />
              </div>
              <div>
                <div className="text-sm text-purple-300">Монет за клик</div>
                <div className="text-2xl font-bold text-green-400">+{coinsPerTap}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} />
              </div>
              <div>
                <div className="text-sm text-purple-300">Монет в секунду</div>
                <div className="text-2xl font-bold text-cyan-400">{coinsPerSecond}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Icon name="Battery" size={20} />
              </div>
              <div>
                <div className="text-sm text-purple-300">Энергия</div>
                <div className="text-2xl font-bold text-orange-400">{energy} / {maxEnergy}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
                <Icon name="Flame" size={20} />
              </div>
              <div>
                <div className="text-sm text-purple-300">Текущий дракон</div>
                <div className="text-lg font-bold text-pink-400">{currentDragonName}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{ownedDragonsCount}</div>
            <div className="text-sm text-purple-300">Драконов куплено</div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">{upgradesOwned}</div>
            <div className="text-sm text-cyan-300">Улучшений куплено</div>
          </div>
        </div>
      </div>
    </div>
  );
}
