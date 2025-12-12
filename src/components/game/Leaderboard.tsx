import Icon from '@/components/ui/icon';

interface LeaderboardEntry {
  rank: number;
  username: string;
  maxCombo: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUsername: string;
  currentMaxCombo: number;
  onClose: () => void;
  onClaimReward: (rank: number, goldAmount: number) => void;
  rewardsClaimed: {
    rank1?: boolean;
    rank2?: boolean;
    rank3?: boolean;
  };
}

export default function Leaderboard({ currentUsername, currentMaxCombo, onClose, onClaimReward, rewardsClaimed }: LeaderboardProps) {
  const generateLeaderboard = (): LeaderboardEntry[] => {
    const names = [
      'DragonMaster', 'ComboKing', 'ClickerPro', 'FireStorm', 'IceWizard',
      'ThunderBolt', 'NeonWarrior', 'CrystalHunter', 'ShadowLord', 'PhoenixRider'
    ];
    
    const leaderboard: LeaderboardEntry[] = [];
    const baseCombo = currentMaxCombo > 0 ? currentMaxCombo : 50;
    
    for (let i = 0; i < 9; i++) {
      const variance = Math.floor(Math.random() * 30) - 10;
      leaderboard.push({
        rank: i + 1,
        username: names[i],
        maxCombo: Math.max(10, baseCombo + variance - (i * 5)),
      });
    }
    
    leaderboard.push({
      rank: leaderboard.length + 1,
      username: currentUsername,
      maxCombo: currentMaxCombo,
      isCurrentUser: true,
    });
    
    leaderboard.sort((a, b) => b.maxCombo - a.maxCombo);
    
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    return leaderboard.slice(0, 10);
  };

  const leaderboard = generateLeaderboard();
  const currentUserEntry = leaderboard.find(e => e.isCurrentUser);
  const currentRank = currentUserEntry?.rank || 0;

  const getRewardAmount = (rank: number) => {
    if (rank === 1) return 1000;
    if (rank === 2) return 500;
    if (rank === 3) return 250;
    return 0;
  };

  const isRewardAvailable = (rank: number) => {
    if (rank === 1) return !rewardsClaimed.rank1;
    if (rank === 2) return !rewardsClaimed.rank2;
    if (rank === 3) return !rewardsClaimed.rank3;
    return false;
  };

  const handleClaimReward = (rank: number) => {
    const reward = getRewardAmount(rank);
    if (reward > 0 && isRewardAvailable(rank)) {
      onClaimReward(rank, reward);
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-amber-500';
    if (rank === 2) return 'from-gray-400 to-gray-500';
    if (rank === 3) return 'from-orange-600 to-amber-700';
    return 'from-purple-600 to-pink-600';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-y-auto animate-fadeIn">
      <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-black border-2 border-purple-500/50 rounded-3xl max-w-4xl w-full max-h-[95vh] p-6 md:p-8 lg:p-10 relative my-auto animate-scaleIn overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-6 md:mb-8">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            🏆 Таблица лидеров 🏆
          </div>
          <div className="text-purple-300 text-sm md:text-base lg:text-lg">
            Топ игроков по максимальному комбо
          </div>
        </div>

        <div className="space-y-3 md:space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-purple-900/20">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`relative overflow-hidden rounded-xl border-2 transition-all
                ${entry.isCurrentUser 
                  ? 'border-yellow-500/50 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 shadow-lg shadow-yellow-500/20' 
                  : 'border-purple-500/30 bg-black/40 hover:bg-black/60'
                }`}
            >
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5 p-4 md:p-5">
                <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl bg-gradient-to-br ${getRankColor(entry.rank)} 
                  flex items-center justify-center font-bold text-white text-xl md:text-2xl lg:text-3xl shrink-0 shadow-lg`}>
                  {getRankIcon(entry.rank)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={`font-bold text-lg md:text-xl lg:text-2xl truncate ${
                      entry.isCurrentUser ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {entry.username}
                    </div>
                    {entry.isCurrentUser && (
                      <span className="text-xs md:text-sm bg-yellow-500/20 text-yellow-400 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-yellow-500/30 shrink-0">
                        ТЫ
                      </span>
                    )}
                  </div>
                  <div className="text-sm md:text-base text-purple-300">
                    Рекорд комбо
                  </div>
                </div>

                {entry.rank <= 3 && (
                  <div className="shrink-0 ml-2 md:ml-3">
                    <div className="text-sm md:text-base text-yellow-400 font-bold">
                      +{getRewardAmount(entry.rank)} 🪙
                    </div>
                  </div>
                )}

                <div className="text-right shrink-0">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    {entry.maxCombo}x
                  </div>
                  <div className="text-sm md:text-base text-orange-300">
                    комбо
                  </div>
                </div>
              </div>

              {entry.rank <= 3 && (
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <Icon name="Trophy" size={80} className="text-yellow-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {currentRank > 0 && currentRank <= 3 && (
          <div className="mt-6 md:mt-8">
            {isRewardAvailable(currentRank) ? (
              <button
                onClick={() => handleClaimReward(currentRank)}
                className="w-full p-4 md:p-5 lg:p-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-xl border-2 border-yellow-500/50 font-bold text-white text-lg md:text-xl lg:text-2xl transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30 animate-pulse"
              >
                🎁 Забрать награду {getRewardAmount(currentRank)} золотых монет!
              </button>
            ) : (
              <div className="w-full p-4 md:p-5 bg-green-900/30 border-2 border-green-500/30 rounded-xl text-center">
                <div className="text-green-400 font-bold text-base md:text-lg lg:text-xl">✅ Награда за {currentRank} место получена!</div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-purple-900/30 border border-purple-500/30 rounded-xl text-center">
          <div className="text-sm md:text-base lg:text-lg text-purple-300 mb-2">
            💡 Попади в топ-3 и получи золотые монеты!
          </div>
          <div className="text-xs md:text-sm lg:text-base text-purple-400 mb-2">
            🥇 1 место: 1000 золота | 🥈 2 место: 500 золота | 🥉 3 место: 250 золота
          </div>
          <div className="text-xs md:text-sm lg:text-base text-purple-400">
            Кликай быстро, чтобы набрать высокое комбо!
          </div>
        </div>
      </div>
    </div>
  );
}