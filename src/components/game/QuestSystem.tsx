import { motion, AnimatePresence } from 'framer-motion';
import QuestHeader from '@/components/quest/QuestHeader';
import QuestCard from '@/components/quest/QuestCard';
import { useQuestManager } from '@/hooks/useQuestManager';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'clicks' | 'coins' | 'energy' | 'upgrades' | 'dragons';
  target: number;
  current: number;
  reward: number;
  icon: string;
  completed: boolean;
}

interface QuestSystemProps {
  onClose: () => void;
  totalClicks: number;
  totalCoins: number;
  totalEnergyUsed: number;
  totalUpgrades: number;
  totalDragons: number;
  goldCoins: number;
  onRewardClaimed: (goldAmount: number) => void;
}

export default function QuestSystem({
  onClose,
  totalClicks,
  totalCoins,
  totalEnergyUsed,
  totalUpgrades,
  totalDragons,
  goldCoins,
  onRewardClaimed
}: QuestSystemProps) {
  const { quests, handleClaimReward } = useQuestManager({
    totalClicks,
    totalCoins,
    totalEnergyUsed,
    totalUpgrades,
    totalDragons
  });

  const handleClaim = (quest: Quest) => {
    const reward = handleClaimReward(quest);
    if (reward > 0) {
      onRewardClaimed(reward);
    }
  };

  const completedQuests = quests.filter(q => q.completed).length;
  const totalRewards = quests.reduce((sum, q) => sum + (q.completed ? q.reward : 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-500/30 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <QuestHeader 
          completedQuests={completedQuests}
          totalQuests={quests.length}
          totalRewards={totalRewards}
          onClose={onClose}
        />

        <div className="space-y-3">
          <AnimatePresence>
            {quests.map((quest, index) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={index}
                onClaimReward={handleClaim}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
