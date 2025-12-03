import { useState } from 'react';
import { Quest } from '@/types/game';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface QuestsPanelProps {
  quests: Quest[];
  onStart: (questId: number) => void;
  onClaim: (questId: number) => void;
}

export default function QuestsPanel({ quests, onStart, onClaim }: QuestsPanelProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredQuests = quests.filter(q => {
    if (filter === 'active') return q.active && !q.completed;
    if (filter === 'completed') return q.completed;
    return true;
  });

  const getProgressPercent = (quest: Quest) => {
    return Math.min(100, (quest.progress / quest.target) * 100);
  };

  const isQuestComplete = (quest: Quest) => {
    return quest.progress >= quest.target && !quest.completed;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Icon name="ScrollText" size={24} />
          Квесты
        </h2>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className="flex-1"
        >
          Все
        </Button>
        <Button
          size="sm"
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          className="flex-1"
        >
          Активные
        </Button>
        <Button
          size="sm"
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className="flex-1"
        >
          Завершённые
        </Button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {filteredQuests.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Нет доступных квестов
          </div>
        ) : (
          filteredQuests.map((quest) => (
            <div
              key={quest.id}
              className={`
                p-3 rounded-lg border-2 transition-all
                ${quest.completed ? 'bg-gray-50 border-gray-300' : 
                  quest.active ? 'bg-blue-50 border-blue-300' : 
                  'bg-white border-gray-200'}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{quest.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-sm mb-1">
                    {quest.title}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {quest.description}
                  </div>

                  {(quest.active || quest.completed) && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Прогресс</span>
                        <span className="font-semibold">
                          {quest.progress}/{quest.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            quest.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${getProgressPercent(quest)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-2">
                    {quest.rewards.coins > 0 && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        💰 {quest.rewards.coins}
                      </span>
                    )}
                    {quest.rewards.wood > 0 && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        🪵 {quest.rewards.wood}
                      </span>
                    )}
                    {quest.rewards.stone > 0 && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        🪨 {quest.rewards.stone}
                      </span>
                    )}
                    {quest.rewards.food > 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        🌾 {quest.rewards.food}
                      </span>
                    )}
                    {quest.rewards.iron > 0 && (
                      <span className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">
                        ⚙️ {quest.rewards.iron}
                      </span>
                    )}
                    {quest.rewards.experience > 0 && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        ⭐ {quest.rewards.experience} опыта
                      </span>
                    )}
                  </div>

                  {!quest.active && !quest.completed && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => onStart(quest.id)}
                    >
                      Начать квест
                    </Button>
                  )}

                  {isQuestComplete(quest) && (
                    <Button
                      size="sm"
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={() => onClaim(quest.id)}
                    >
                      Получить награду! 🎁
                    </Button>
                  )}

                  {quest.completed && (
                    <div className="text-center text-sm text-green-600 font-semibold">
                      ✓ Завершено
                    </div>
                  )}

                  {quest.active && !isQuestComplete(quest) && (
                    <div className="text-center text-xs text-blue-600">
                      В процессе выполнения...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
