import { useEffect } from 'react';

interface UseGameTimersProps {
  coinsPerSecond: number;
  energyRestoreTime: number | null;
  maxEnergy: number;
  totalCoins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  setTotalCoins: React.Dispatch<React.SetStateAction<number>>;
  setPassiveIncomeIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  setEnergy: React.Dispatch<React.SetStateAction<number>>;
  setEnergyRestoreTime: React.Dispatch<React.SetStateAction<number | null>>;
  setTimeRemaining: React.Dispatch<React.SetStateAction<string>>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

export function useGameTimers({
  coinsPerSecond,
  energyRestoreTime,
  maxEnergy,
  totalCoins,
  setCoins,
  setTotalCoins,
  setPassiveIncomeIndicator,
  setEnergy,
  setEnergyRestoreTime,
  setTimeRemaining,
  setLevel,
}: UseGameTimersProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (coinsPerSecond > 0 && !energyRestoreTime) {
        setCoins(prev => prev + coinsPerSecond);
        setTotalCoins(prev => prev + coinsPerSecond);
        setPassiveIncomeIndicator(true);
        setTimeout(() => setPassiveIncomeIndicator(false), 800);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [coinsPerSecond, energyRestoreTime, setCoins, setTotalCoins, setPassiveIncomeIndicator]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (energyRestoreTime) {
        const now = Date.now();
        if (now >= energyRestoreTime) {
          setEnergy(maxEnergy);
          setEnergyRestoreTime(null);
          setTimeRemaining('');
        } else {
          const diff = energyRestoreTime - now;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}ч ${minutes}м ${seconds}с`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [energyRestoreTime, maxEnergy, setEnergy, setEnergyRestoreTime, setTimeRemaining]);

  useEffect(() => {
    setLevel(Math.floor(totalCoins / 10000) + 1);
  }, [totalCoins, setLevel]);
}
