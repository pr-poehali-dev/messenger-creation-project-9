import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface QuestHeaderProps {
  completedQuests: number;
  totalQuests: number;
  totalRewards: number;
  onClose: () => void;
}

export default function QuestHeader({ completedQuests, totalQuests, totalRewards, onClose }: QuestHeaderProps) {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center gap-2">
            <Icon name="Trophy" size={32} />
            Ежедневные квесты
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-300 text-sm">
              Выполняй задания и зарабатывай золотые монеты!
            </p>
            <div className="flex items-center gap-1.5 bg-blue-500/20 px-3 py-1 rounded-lg border border-blue-400/30">
              <Icon name="Clock" size={14} className="text-blue-300" />
              <span className="text-blue-200 text-xs font-mono font-semibold">{timeRemaining}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Icon name="X" size={28} />
        </button>
      </div>

      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 mb-6 border border-yellow-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Icon name="Award" size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Прогресс квестов</p>
              <p className="text-gray-300 text-sm">
                Выполнено: {completedQuests} из {totalQuests}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 text-2xl font-bold flex items-center gap-1">
              <Icon name="Coins" size={24} />
              {totalRewards}
            </p>
            <p className="text-gray-400 text-xs">Заработано золота</p>
          </div>
        </div>
      </div>
    </>
  );
}