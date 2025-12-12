import { useState, useEffect } from 'react';
import { Quest } from '@/components/game/QuestSystem';
import { generateDailyQuests } from '@/data/quests';

interface UseQuestManagerProps {
  totalClicks: number;
  totalCoins: number;
  totalEnergyUsed: number;
  totalUpgrades: number;
  totalDragons: number;
}

export function useQuestManager({
  totalClicks,
  totalCoins,
  totalEnergyUsed,
  totalUpgrades,
  totalDragons
}: UseQuestManagerProps) {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const checkAndResetQuests = () => {
      const savedQuests = localStorage.getItem('dragonQuests');
      const lastReset = localStorage.getItem('questsLastReset');
      const now = new Date();
      
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const lastResetDate = lastReset ? parseInt(lastReset) : 0;
      const lastResetDay = new Date(lastResetDate);
      const lastResetDayStart = new Date(lastResetDay.getFullYear(), lastResetDay.getMonth(), lastResetDay.getDate()).getTime();

      if (savedQuests && today === lastResetDayStart) {
        setQuests(JSON.parse(savedQuests));
      } else {
        const newQuests = generateDailyQuests();
        setQuests(newQuests);
        localStorage.setItem('dragonQuests', JSON.stringify(newQuests));
        localStorage.setItem('questsLastReset', today.toString());
      }
    };

    checkAndResetQuests();

    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      checkAndResetQuests();
      
      const dailyInterval = setInterval(checkAndResetQuests, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  useEffect(() => {
    const updatedQuests = quests.map(quest => {
      let current = quest.current;
      
      switch (quest.type) {
        case 'clicks':
          current = Math.min(totalClicks, quest.target);
          break;
        case 'coins':
          current = Math.min(totalCoins, quest.target);
          break;
        case 'energy':
          current = Math.min(totalEnergyUsed, quest.target);
          break;
        case 'upgrades':
          current = Math.min(totalUpgrades, quest.target);
          break;
        case 'dragons':
          current = Math.min(totalDragons, quest.target);
          break;
      }
      
      return { ...quest, current };
    });

    if (JSON.stringify(updatedQuests) !== JSON.stringify(quests)) {
      setQuests(updatedQuests);
      localStorage.setItem('dragonQuests', JSON.stringify(updatedQuests));
    }
  }, [totalClicks, totalCoins, totalEnergyUsed, totalUpgrades, totalDragons]);

  const handleClaimReward = (quest: Quest) => {
    if (quest.current >= quest.target && !quest.completed) {
      const updatedQuests = quests.map(q => 
        q.id === quest.id ? { ...q, completed: true } : q
      );
      setQuests(updatedQuests);
      localStorage.setItem('dragonQuests', JSON.stringify(updatedQuests));
      return quest.reward;
    }
    return 0;
  };

  return {
    quests,
    handleClaimReward
  };
}