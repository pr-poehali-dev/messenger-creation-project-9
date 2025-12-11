import { Dragon } from '@/types/game';
import { DRAGONS } from '@/data/dragons';
import DragonShopHeader from '@/components/shop/DragonShopHeader';
import DragonCard from '@/components/shop/DragonCard';

interface DragonShopProps {
  coins: number;
  goldCoins: number;
  currentDragonId: string;
  ownedDragons: string[];
  onBuyDragon: (dragon: Dragon) => void;
  onSelectDragon: (dragonId: string) => void;
  onBack: () => void;
}

export { DRAGONS };

export default function DragonShop({
  coins,
  goldCoins,
  currentDragonId,
  ownedDragons,
  onBuyDragon,
  onSelectDragon,
  onBack,
}: DragonShopProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  const isDragonAvailable = (dragon: Dragon) => {
    if (!dragon.availableFrom && !dragon.availableUntil) return true;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (dragon.availableFrom) {
      const fromDate = new Date(dragon.availableFrom);
      if (today < fromDate) return false;
    }
    
    if (dragon.availableUntil) {
      const untilDate = new Date(dragon.availableUntil);
      if (today > untilDate) return false;
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      <DragonShopHeader 
        coins={coins}
        goldCoins={goldCoins}
        onBack={onBack}
        formatNumber={formatNumber}
      />

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {DRAGONS.map((dragon) => {
            const isOwned = ownedDragons.includes(dragon.id);
            const isCurrent = currentDragonId === dragon.id;
            const isGoldDragon = dragon.goldCost !== undefined && dragon.goldCost > 0;
            const isAvailable = isDragonAvailable(dragon);
            const canBuy = isAvailable && (isGoldDragon 
              ? goldCoins >= (dragon.goldCost || 0) && !isOwned
              : coins >= dragon.cost && !isOwned);
            
            if (!isAvailable && !isOwned) return null;

            return (
              <DragonCard
                key={dragon.id}
                dragon={dragon}
                isOwned={isOwned}
                isCurrent={isCurrent}
                isGoldDragon={isGoldDragon}
                canBuy={canBuy}
                onBuyDragon={onBuyDragon}
                onSelectDragon={onSelectDragon}
                formatNumber={formatNumber}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
