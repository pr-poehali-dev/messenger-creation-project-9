import { Button } from './ui/button';
import Icon from './ui/icon';
import { Player, Quest, Resources } from '@/types/game';
import ResourceBar from './ResourceBar';

interface GameHeaderProps {
  player: Player;
  quests: Quest[];
  resources: Resources;
  showQuests: boolean;
  onToggleQuests: () => void;
  onLogout: () => void;
}

export default function GameHeader({ 
  player, 
  quests, 
  resources, 
  showQuests, 
  onToggleQuests, 
  onLogout 
}: GameHeaderProps) {
  const completedQuestsCount = quests.filter(q => q.progress >= q.target && !q.completed).length;

  return (
    <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">🏰 City Builder</h1>
          <span className="text-gray-600">Игрок: {player.username}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onToggleQuests}
          >
            <Icon name="ScrollText" size={20} />
            Квесты
            {completedQuestsCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {completedQuestsCount}
              </span>
            )}
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Выход
          </Button>
        </div>
      </div>
      <ResourceBar resources={resources} />
    </div>
  );
}
