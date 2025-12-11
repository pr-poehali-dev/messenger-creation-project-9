import { useState } from 'react';
import { User } from '@/types/game';
import { removeUser } from '@/utils/storage';
import DragonShop, { DRAGONS } from '@/pages/DragonShop';
import GameHeader from '@/components/game/GameHeader';
import DragonClicker from '@/components/game/DragonClicker';
import UpgradesList from '@/components/game/UpgradesList';
import PlayerProfile from '@/components/game/PlayerProfile';
import GoldExchange from '@/components/game/GoldExchange';
import { useGameState } from '@/hooks/useGameState';
import { useGameTimers } from '@/hooks/useGameTimers';
import { useGameActions } from '@/hooks/useGameActions';

interface GameProps {
  user: User;
  onLogout: () => void;
}

export default function Game({ user, onLogout }: GameProps) {
  const [showShop, setShowShop] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showGoldExchange, setShowGoldExchange] = useState(false);

  const gameState = useGameState(user);

  useGameTimers({
    coinsPerSecond: gameState.coinsPerSecond,
    energyRestoreTime: gameState.energyRestoreTime,
    maxEnergy: gameState.maxEnergy,
    totalCoins: gameState.totalCoins,
    setCoins: gameState.setCoins,
    setTotalCoins: gameState.setTotalCoins,
    setPassiveIncomeIndicator: gameState.setPassiveIncomeIndicator,
    setEnergy: gameState.setEnergy,
    setEnergyRestoreTime: gameState.setEnergyRestoreTime,
    setTimeRemaining: gameState.setTimeRemaining,
    setLevel: gameState.setLevel,
  });

  const gameActions = useGameActions({
    energy: gameState.energy,
    energyRestoreTime: gameState.energyRestoreTime,
    coinsPerTap: gameState.coinsPerTap,
    currentDragonId: gameState.currentDragonId,
    coins: gameState.coins,
    goldCoins: gameState.goldCoins,
    ownedDragons: gameState.ownedDragons,
    setCoins: gameState.setCoins,
    setTotalCoins: gameState.setTotalCoins,
    setEnergy: gameState.setEnergy,
    setClickAnimation: gameState.setClickAnimation,
    setEnergyRestoreTime: gameState.setEnergyRestoreTime,
    setFloatingTexts: gameState.setFloatingTexts,
    setSnowflakes: gameState.setSnowflakes,
    setCoinsPerSecond: gameState.setCoinsPerSecond,
    setUpgrades: gameState.setUpgrades,
    setGoldCoins: gameState.setGoldCoins,
    setOwnedDragons: gameState.setOwnedDragons,
    setDragonChangeAnimation: gameState.setDragonChangeAnimation,
    setCurrentDragonId: gameState.setCurrentDragonId,
    setCoinsPerTap: gameState.setCoinsPerTap,
    setMaxEnergy: gameState.setMaxEnergy,
  });

  const handleLogout = () => {
    removeUser();
    onLogout();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  const currentDragon = DRAGONS.find(d => d.id === gameState.currentDragonId) || DRAGONS[0];
  const upgradesOwned = gameState.upgrades.reduce((sum, u) => sum + u.owned, 0);

  if (showShop) {
    return (
      <DragonShop
        coins={gameState.coins}
        goldCoins={gameState.goldCoins}
        currentDragonId={gameState.currentDragonId}
        ownedDragons={gameState.ownedDragons}
        onBuyDragon={gameActions.handleBuyDragon}
        onSelectDragon={gameActions.handleSelectDragon}
        onBack={() => setShowShop(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen text-white relative overflow-hidden ${
      gameState.currentDragonId === 'dragon-6' 
        ? 'bg-gradient-to-b from-blue-900 via-cyan-900 to-indigo-950'
        : gameState.currentDragonId === 'dragon-25'
        ? 'bg-gradient-to-b from-red-950 via-orange-900 to-black'
        : gameState.currentDragonId === 'dragon-26'
        ? 'bg-gradient-to-b from-red-900 via-orange-950 to-black'
        : gameState.currentDragonId === 'dragon-27'
        ? 'bg-gradient-to-b from-cyan-950 via-blue-950 to-black'
        : gameState.currentDragonId === 'dragon-28'
        ? 'bg-gradient-to-b from-pink-950 via-rose-900 to-purple-950'
        : 'bg-gradient-to-b from-purple-900 via-indigo-900 to-black'
    }`}>
      {showProfile && (
        <PlayerProfile
          username={user.username}
          level={gameState.level}
          totalCoins={gameState.totalCoins}
          coins={gameState.coins}
          coinsPerTap={gameState.coinsPerTap}
          coinsPerSecond={gameState.coinsPerSecond}
          energy={gameState.energy}
          maxEnergy={gameState.maxEnergy}
          currentDragonName={currentDragon.name}
          ownedDragonsCount={gameState.ownedDragons.length}
          upgradesOwned={upgradesOwned}
          onClose={() => setShowProfile(false)}
          formatNumber={formatNumber}
        />
      )}

      {showGoldExchange && (
        <GoldExchange
          coins={gameState.coins}
          goldCoins={gameState.goldCoins}
          onExchange={gameActions.handleGoldExchange}
          onClose={() => setShowGoldExchange(false)}
          formatNumber={formatNumber}
        />
      )}
      
      {gameState.currentDragonId === 'dragon-6' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                fontSize: `${10 + Math.random() * 10}px`,
                animation: `backgroundSnowfall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        <GameHeader
          username={user.username}
          level={gameState.level}
          coins={gameState.coins}
          goldCoins={gameState.goldCoins}
          coinsPerSecond={gameState.coinsPerSecond}
          passiveIncomeIndicator={gameState.passiveIncomeIndicator}
          onShopClick={() => setShowShop(true)}
          onProfileClick={() => setShowProfile(true)}
          onGoldClick={() => setShowGoldExchange(true)}
          onLogout={handleLogout}
          formatNumber={formatNumber}
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
          <DragonClicker
            currentDragon={currentDragon}
            currentDragonId={gameState.currentDragonId}
            energy={gameState.energy}
            maxEnergy={gameState.maxEnergy}
            energyRestoreTime={gameState.energyRestoreTime}
            timeRemaining={gameState.timeRemaining}
            coinsPerTap={gameState.coinsPerTap}
            clickAnimation={gameState.clickAnimation}
            dragonChangeAnimation={gameState.dragonChangeAnimation}
            floatingTexts={gameState.floatingTexts}
            snowflakes={gameState.snowflakes}
            onDragonClick={gameActions.handleDragonClick}
          />

          <UpgradesList
            upgrades={gameState.upgrades}
            coins={gameState.coins}
            onBuyUpgrade={gameActions.handleBuyUpgrade}
            formatNumber={formatNumber}
          />
        </div>
      </div>
    </div>
  );
}