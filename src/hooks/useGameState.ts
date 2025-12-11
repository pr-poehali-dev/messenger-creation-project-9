import { useState, useEffect } from 'react';
import { User, GameState, Upgrade } from '@/types/game';
import { saveGameState, getGameState } from '@/utils/storage';
import { DRAGONS } from '@/pages/DragonShop';

export const DEFAULT_UPGRADES: Upgrade[] = [
  { id: '1', name: 'Огненное дыхание', cost: 100, profit: 1, owned: 0, icon: 'Flame' },
  { id: '2', name: 'Драконья пещера', cost: 500, profit: 5, owned: 0, icon: 'Mountain' },
  { id: '3', name: 'Сокровищница', cost: 2000, profit: 20, owned: 0, icon: 'Gem' },
  { id: '4', name: 'Армия драконов', cost: 10000, profit: 100, owned: 0, icon: 'Users' },
  { id: '5', name: 'Драконий замок', cost: 50000, profit: 500, owned: 0, icon: 'Castle' },
  { id: '6', name: 'Магический портал', cost: 200000, profit: 2000, owned: 0, icon: 'Sparkles' },
];

export function useGameState(user: User) {
  const [coins, setCoins] = useState(0);
  const [goldCoins, setGoldCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [level, setLevel] = useState(1);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; value: number; x: number; y: number; dragonType?: string }>>([]);
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [passiveIncomeIndicator, setPassiveIncomeIndicator] = useState(false);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(DEFAULT_UPGRADES);
  const [energyRestoreTime, setEnergyRestoreTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [currentDragonId, setCurrentDragonId] = useState('dragon-1');
  const [ownedDragons, setOwnedDragons] = useState<string[]>(['dragon-1']);
  const [dragonChangeAnimation, setDragonChangeAnimation] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEnergyUsed, setTotalEnergyUsed] = useState(0);
  const [totalUpgrades, setTotalUpgrades] = useState(0);

  useEffect(() => {
    const savedState = getGameState();
    if (savedState && savedState.userId === user.id) {
      setCoins(savedState.coins);
      setGoldCoins(savedState.goldCoins || 0);
      setTotalCoins(savedState.totalCoins);
      setCoinsPerTap(savedState.coinsPerTap);
      setCoinsPerSecond(savedState.coinsPerSecond);
      setEnergy(savedState.energy);
      setMaxEnergy(savedState.maxEnergy || 1000);
      setLevel(savedState.level);
      setUpgrades(savedState.upgrades);
      
      // Check if temporary dragon (dragon-29) should be replaced
      const now = new Date();
      const jan1 = new Date('2026-01-01');
      
      if (savedState.currentDragonId === 'dragon-29' && now >= jan1 && savedState.previousDragonId) {
        // Restore previous dragon
        setCurrentDragonId(savedState.previousDragonId);
        const prevDragon = DRAGONS.find(d => d.id === savedState.previousDragonId);
        
        if (prevDragon) {
          setCoinsPerTap(prevDragon.coinsPerTap);
          setMaxEnergy(prevDragon.maxEnergy);
        }
      } else {
        setCurrentDragonId(savedState.currentDragonId || 'dragon-1');
      }
      
      setOwnedDragons(savedState.ownedDragons || ['dragon-1']);
      setTotalClicks(savedState.totalClicks || 0);
      setTotalEnergyUsed(savedState.totalEnergyUsed || 0);
      setTotalUpgrades(savedState.totalUpgrades || 0);
      if (savedState.energyRestoreTime) {
        setEnergyRestoreTime(savedState.energyRestoreTime);
      }
    }
  }, [user.id]);

  useEffect(() => {
    const state: GameState = {
      userId: user.id,
      coins,
      goldCoins,
      totalCoins,
      coinsPerTap,
      coinsPerSecond,
      energy,
      maxEnergy,
      level,
      upgrades,
      lastSaved: new Date().toISOString(),
      energyRestoreTime,
      currentDragonId,
      ownedDragons,
      totalClicks,
      totalEnergyUsed,
      totalUpgrades,
    };
    saveGameState(state);
  }, [user.id, coins, goldCoins, totalCoins, coinsPerTap, coinsPerSecond, energy, maxEnergy, level, upgrades, energyRestoreTime, currentDragonId, ownedDragons, totalClicks, totalEnergyUsed, totalUpgrades]);

  return {
    coins,
    setCoins,
    goldCoins,
    setGoldCoins,
    totalCoins,
    setTotalCoins,
    coinsPerTap,
    setCoinsPerTap,
    coinsPerSecond,
    setCoinsPerSecond,
    energy,
    setEnergy,
    maxEnergy,
    setMaxEnergy,
    level,
    setLevel,
    clickAnimation,
    setClickAnimation,
    floatingTexts,
    setFloatingTexts,
    snowflakes,
    setSnowflakes,
    passiveIncomeIndicator,
    setPassiveIncomeIndicator,
    upgrades,
    setUpgrades,
    energyRestoreTime,
    setEnergyRestoreTime,
    timeRemaining,
    setTimeRemaining,
    currentDragonId,
    setCurrentDragonId,
    ownedDragons,
    setOwnedDragons,
    dragonChangeAnimation,
    setDragonChangeAnimation,
    totalClicks,
    setTotalClicks,
    totalEnergyUsed,
    setTotalEnergyUsed,
    totalUpgrades,
    setTotalUpgrades,
  };
}