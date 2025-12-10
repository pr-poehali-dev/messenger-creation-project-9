import Icon from '@/components/ui/icon';
import { Upgrade } from '@/types/game';

interface UpgradesListProps {
  upgrades: Upgrade[];
  coins: number;
  onBuyUpgrade: (upgrade: Upgrade) => void;
  formatNumber: (num: number) => string;
}

export default function UpgradesList({
  upgrades,
  coins,
  onBuyUpgrade,
  formatNumber
}: UpgradesListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Улучшения
      </h2>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {upgrades.map(upgrade => {
          const canBuy = coins >= upgrade.cost;
          return (
            <button
              key={upgrade.id}
              onClick={() => onBuyUpgrade(upgrade)}
              disabled={!canBuy}
              className={`w-full bg-black/40 backdrop-blur-sm rounded-xl p-4 border-2 
                transition-all ${
                  canBuy
                    ? 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/20 cursor-pointer'
                    : 'border-gray-700/30 opacity-50 cursor-not-allowed'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Icon name={upgrade.icon as any} size={24} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="font-bold text-white">{upgrade.name}</div>
                  <div className="text-sm text-purple-300">
                    +{upgrade.profit} монет/сек
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-yellow-400">{formatNumber(upgrade.cost)}</div>
                  {upgrade.owned > 0 && (
                    <div className="text-xs text-green-400">Уровень {upgrade.owned}</div>
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
