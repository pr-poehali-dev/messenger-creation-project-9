import { useState } from 'react';
import { User } from '@/types/game';
import { removeUser } from '@/utils/storage';
import DragonShop from '@/pages/DragonShop';
import { DRAGONS } from '@/data/dragons';
import GameHeader from '@/components/game/GameHeader';
import DragonClicker from '@/components/game/DragonClicker';
import UpgradesList from '@/components/game/UpgradesList';
import PlayerProfile from '@/components/game/PlayerProfile';
import GoldExchange from '@/components/game/GoldExchange';
import QuestSystem from '@/components/game/QuestSystem';
import Leaderboard from '@/components/game/Leaderboard';
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
  const [showQuests, setShowQuests] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [rewardNotification, setRewardNotification] = useState<{amount: number; rank: number} | null>(null);

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
    comboCount: gameState.comboCount,
    comboTimer: gameState.comboTimer,
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
    setTotalClicks: gameState.setTotalClicks,
    setTotalEnergyUsed: gameState.setTotalEnergyUsed,
    setTotalUpgrades: gameState.setTotalUpgrades,
    setComboCount: gameState.setComboCount,
    setComboTimer: gameState.setComboTimer,
    maxCombo: gameState.maxCombo,
    setMaxCombo: gameState.setMaxCombo,
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
          maxCombo={gameState.maxCombo}
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

      {showQuests && (
        <QuestSystem
          onClose={() => setShowQuests(false)}
          totalClicks={gameState.totalClicks}
          totalCoins={gameState.totalCoins}
          totalEnergyUsed={gameState.totalEnergyUsed}
          totalUpgrades={gameState.totalUpgrades}
          totalDragons={gameState.ownedDragons.length}
          goldCoins={gameState.goldCoins}
          onRewardClaimed={(goldAmount) => gameState.setGoldCoins(prev => prev + goldAmount)}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          currentUsername={user.username}
          currentMaxCombo={gameState.maxCombo}
          onClose={() => setShowLeaderboard(false)}
          onClaimReward={(rank, goldAmount) => {
            gameState.setGoldCoins(prev => prev + goldAmount);
            gameState.setLeaderboardRewardsClaimed(prev => ({
              ...prev,
              [`rank${rank}`]: true
            }));
            setRewardNotification({ amount: goldAmount, rank });
            setTimeout(() => setRewardNotification(null), 3000);
          }}
          rewardsClaimed={gameState.leaderboardRewardsClaimed}
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
      
      {rewardNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slideDown">
          <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-4 border-yellow-300 flex items-center gap-3 animate-bounce">
            <div className="text-4xl">
              {rewardNotification.rank === 1 && '🥇'}
              {rewardNotification.rank === 2 && '🥈'}
              {rewardNotification.rank === 3 && '🥉'}
            </div>
            <div>
              <div className="text-xl font-bold drop-shadow-lg">
                Поздравляем!
              </div>
              <div className="text-lg">
                +{rewardNotification.amount} 🪙 золотых монет
              </div>
            </div>
            <div className="text-3xl animate-spin-slow">✨</div>
          </div>
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
          onQuestClick={() => setShowQuests(true)}
          onLeaderboardClick={() => setShowLeaderboard(true)}
          onLogout={handleLogout}
          formatNumber={formatNumber}
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
          <div className="relative">
            {gameState.comboCount >= 5 && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  КОМБО x{gameState.comboCount} 🔥
                  {gameState.comboCount >= 20 && ' +50%'}
                  {gameState.comboCount >= 10 && gameState.comboCount < 20 && ' +25%'}
                  {gameState.comboCount >= 5 && gameState.comboCount < 10 && ' +10%'}
                </div>
              </div>
            )}
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
          </div>

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