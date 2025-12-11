import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { Quest } from '@/components/game/QuestSystem';

interface QuestCardProps {
  quest: Quest;
  index: number;
  onClaimReward: (quest: Quest) => void;
}

export default function QuestCard({ quest, index, onClaimReward }: QuestCardProps) {
  const progress = Math.min((quest.current / quest.target) * 100, 100);
  const canClaim = quest.current >= quest.target && !quest.completed;

  return (
    <motion.div
      key={quest.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gradient-to-r ${
        quest.completed
          ? 'from-green-900/40 to-emerald-900/40 border-green-500/30'
          : canClaim
          ? 'from-yellow-900/40 to-orange-900/40 border-yellow-500/50'
          : 'from-purple-900/40 to-indigo-900/40 border-purple-500/30'
      } rounded-xl p-4 border-2 transition-all`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          quest.completed
            ? 'bg-green-500/20'
            : canClaim
            ? 'bg-yellow-500/20'
            : 'bg-purple-500/20'
        }`}>
          <Icon 
            name={quest.icon as any} 
            size={28} 
            className={
              quest.completed
                ? 'text-green-400'
                : canClaim
                ? 'text-yellow-400'
                : 'text-purple-400'
            }
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white font-bold text-lg">{quest.title}</h3>
              <p className="text-gray-400 text-sm">{quest.description}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-400 font-bold">
              <img 
                src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                alt="Gold"
                className="w-5 h-5"
              />
              <span>{quest.reward}</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Прогресс</span>
              <span className={`font-semibold ${
                quest.completed
                  ? 'text-green-400'
                  : canClaim
                  ? 'text-yellow-400'
                  : 'text-purple-400'
              }`}>
                {quest.current} / {quest.target}
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full ${
                  quest.completed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : canClaim
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                }`}
              />
            </div>
          </div>

          {quest.completed ? (
            <div className="flex items-center gap-2 text-green-400 font-semibold">
              <Icon name="CheckCircle2" size={20} />
              <span>Выполнено!</span>
            </div>
          ) : canClaim ? (
            <button
              onClick={() => onClaimReward(quest)}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 px-4 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Icon name="Gift" size={20} />
              Забрать награду
            </button>
          ) : (
            <div className="text-gray-500 text-sm">
              Продолжай выполнять задание...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
