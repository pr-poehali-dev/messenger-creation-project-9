import Icon from '@/components/ui/icon';
import PlayerStats from '@/components/profile/PlayerStats';
import AchievementCard from '@/components/profile/AchievementCard';
import { getAchievements } from '@/data/achievements';

interface PlayerProfileProps {
  username: string;
  level: number;
  totalCoins: number;
  coins: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  energy: number;
  maxEnergy: number;
  currentDragonName: string;
  ownedDragonsCount: number;
  upgradesOwned: number;
  onClose: () => void;
  formatNumber: (num: number) => string;
}

export default function PlayerProfile({
  username,
  level,
  totalCoins,
  coins,
  coinsPerTap,
  coinsPerSecond,
  energy,
  maxEnergy,
  currentDragonName,
  ownedDragonsCount,
  upgradesOwned,
  onClose,
  formatNumber
}: PlayerProfileProps) {
  const achievements = getAchievements(totalCoins, ownedDragonsCount, upgradesOwned, level);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-black border-2 border-purple-500/50 rounded-3xl max-w-4xl w-full p-4 sm:p-6 md:p-8 relative my-4 sm:my-8 max-h-[95vh] overflow-y-auto animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold text-white border-2 sm:border-4 border-purple-500">
            {username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{username}</h2>
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border-2 border-purple-400">
            <span className="font-bold text-base sm:text-lg md:text-xl">Уровень {level}</span>
          </div>
        </div>

        <PlayerStats
          coins={coins}
          totalCoins={totalCoins}
          coinsPerTap={coinsPerTap}
          coinsPerSecond={coinsPerSecond}
          energy={energy}
          maxEnergy={maxEnergy}
          currentDragonName={currentDragonName}
          ownedDragonsCount={ownedDragonsCount}
          upgradesOwned={upgradesOwned}
          formatNumber={formatNumber}
        />

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Достижения
            </h3>
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-yellow-500/50">
              <span className="font-bold text-sm sm:text-base">{unlockedCount} / {achievements.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2">
            {achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                formatNumber={formatNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
