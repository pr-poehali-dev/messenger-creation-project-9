import Icon from '@/components/ui/icon';
import { Upgrade } from '@/types/game';

interface UpgradesListProps {
  upgrades: Upgrade[];
  coins: number;
  goldCoins: number;
  onBuyUpgrade: (upgrade: Upgrade) => void;
  formatNumber: (num: number) => string;
}

export default function UpgradesList({
  upgrades,
  coins,
  goldCoins,
  onBuyUpgrade,
  formatNumber
}: UpgradesListProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Улучшения
        </h2>
        <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
          Пассивный доход — монеты начисляются автоматически
        </p>
      </div>
      
      <div className="space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {upgrades.map(upgrade => {
          const isGoldUpgrade = upgrade.goldCost !== undefined;
          const canBuy = isGoldUpgrade 
            ? goldCoins >= (upgrade.goldCost || 0)
            : coins >= upgrade.cost;
          
          return (
            <button
              key={upgrade.id}
              onClick={() => onBuyUpgrade(upgrade)}
              disabled={!canBuy}
              className={`w-full bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 
                transition-all ${
                  canBuy
                    ? `${isGoldUpgrade ? 'border-amber-500/50 hover:border-amber-400 hover:bg-amber-900/20' : 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/20'} cursor-pointer active:scale-95`
                    : 'border-gray-700/30 opacity-50 cursor-not-allowed'
                }`}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${isGoldUpgrade ? 'from-amber-600 to-yellow-600' : 'from-purple-600 to-pink-600'} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={upgrade.icon as any} size={20} />
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="font-bold text-white text-sm sm:text-base truncate">{upgrade.name}</div>
                  <div className="text-xs sm:text-sm text-purple-300">
                    +{upgrade.profit} монет/с
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0">
                  {isGoldUpgrade ? (
                    <div className="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-1 justify-end">
                      {formatNumber(upgrade.goldCost || 0)} 🪙
                    </div>
                  ) : (
                    <div className="font-bold text-yellow-400 text-sm sm:text-base">{formatNumber(upgrade.cost)}</div>
                  )}
                  {upgrade.owned > 0 && (
                    <div className="text-xs text-green-400">Ур. {upgrade.owned}</div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}