import Icon from '@/components/ui/icon';
import { Achievement } from '@/types/game';

interface AchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
  onClaimReward: (achievementId: string) => void;
  formatNumber: (num: number) => string;
}

export default function AchievementsModal({
  achievements,
  onClose,
  onClaimReward,
  formatNumber
}: AchievementsModalProps) {
  const categories = {
    clicks: { name: 'Клики', icon: 'MousePointerClick', color: 'from-blue-500 to-cyan-500' },
    coins: { name: 'Монеты', icon: 'Coins', color: 'from-yellow-500 to-amber-500' },
    upgrades: { name: 'Улучшения', icon: 'TrendingUp', color: 'from-purple-500 to-pink-500' },
    dragons: { name: 'Драконы', icon: 'Flame', color: 'from-red-500 to-orange-500' },
    combo: { name: 'Комбо', icon: 'Zap', color: 'from-orange-500 to-yellow-500' },
    energy: { name: 'Энергия', icon: 'Battery', color: 'from-green-500 to-emerald-500' }
  };

  const completedCount = achievements.filter(a => a.completed).length;
  const totalCount = achievements.length;
  const completionPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-950/95 to-pink-950/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-purple-500/30 shadow-2xl animate-scaleIn">
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-3">
                <Icon name="Award" size={32} />
                Достижения
              </h2>
              <p className="text-purple-300 mt-2">
                Выполнено: {completedCount} из {totalCount} ({completionPercent}%)
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-purple-300 hover:text-white transition-colors p-2"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="mt-4 w-full bg-black/40 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
          {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
            const categoryAchievements = achievements.filter(
              a => a.category === categoryKey
            );
            
            if (categoryAchievements.length === 0) return null;

            return (
              <div key={categoryKey} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center`}>
                    <Icon name={categoryInfo.icon as any} size={18} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{categoryInfo.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryAchievements.map(achievement => {
                    const progress = Math.min((achievement.current / achievement.target) * 100, 100);
                    const isCompleted = achievement.completed;

                    return (
                      <div
                        key={achievement.id}
                        className={`bg-black/40 backdrop-blur-sm rounded-xl p-4 border-2 transition-all ${
                          isCompleted
                            ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-amber-900/20'
                            : 'border-purple-500/20 hover:border-purple-400/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-yellow-500 to-amber-500' 
                              : 'bg-gradient-to-br from-gray-700 to-gray-800'
                          }`}>
                            <Icon name={achievement.icon as any} size={24} className="text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-white text-sm">{achievement.name}</h4>
                              {isCompleted && (
                                <Icon name="Check" size={20} className="text-yellow-400 flex-shrink-0" />
                              )}
                            </div>
                            
                            <p className="text-xs text-purple-300 mt-1">{achievement.description}</p>

                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-purple-300">
                                  {formatNumber(achievement.current)} / {formatNumber(achievement.target)}
                                </span>
                                <span className="text-purple-400 font-bold">{Math.round(progress)}%</span>
                              </div>
                              <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-500 ${
                                    isCompleted 
                                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500' 
                                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                  }`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-xs">
                              <span className="text-purple-300">Награда:</span>
                              {achievement.reward.coins && (
                                <span className="text-yellow-400 font-bold">
                                  +{formatNumber(achievement.reward.coins)} 💰
                                </span>
                              )}
                              {achievement.reward.goldCoins && (
                                <span className="text-amber-400 font-bold">
                                  +{achievement.reward.goldCoins} 🪙
                                </span>
                              )}
                            </div>

                            {isCompleted && (
                              <button
                                onClick={() => onClaimReward(achievement.id)}
                                className="mt-2 w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white font-bold py-1.5 px-3 rounded-lg transition-all active:scale-95 text-xs"
                              >
                                Забрать награду
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
