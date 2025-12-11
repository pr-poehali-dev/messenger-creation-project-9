import Icon from '@/components/ui/icon';
import { Achievement } from '@/data/achievements';

interface AchievementCardProps {
  achievement: Achievement;
  formatNumber: (num: number) => string;
}

export default function AchievementCard({ achievement, formatNumber }: AchievementCardProps) {
  return (
    <div
      className={`bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 transition-all ${
        achievement.unlocked
          ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20'
          : 'border-gray-700/30 opacity-60'
      }`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${achievement.color} rounded-lg flex items-center justify-center flex-shrink-0 ${
          achievement.unlocked ? 'animate-pulse' : ''
        }`}>
          <Icon name={achievement.icon as any} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm sm:text-base text-white mb-1 flex items-center gap-2">
            <span className="truncate">{achievement.name}</span>
            {achievement.unlocked && (
              <Icon name="Check" size={14} className="text-green-400 shrink-0" />
            )}
          </div>
          <div className="text-xs text-purple-300 mb-2 line-clamp-2">{achievement.description}</div>
          
          {!achievement.unlocked && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Прогресс</span>
                <span className="text-white font-bold">
                  {formatNumber(achievement.progress)} / {formatNumber(achievement.goal)}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
                  style={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {achievement.unlocked && (
            <div className="text-xs text-green-400 font-bold">✓ Выполнено</div>
          )}
        </div>
      </div>
    </div>
  );
}
