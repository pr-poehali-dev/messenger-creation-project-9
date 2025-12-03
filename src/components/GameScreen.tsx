import { useState, useEffect, useCallback } from 'react';
import { Building, BuildingType, GameState, Player, Quest } from '@/types/game';
import { getGameState, getBuildingTypes, buildBuilding, collectResources, completeBuilding, upgradeBuilding, getQuests, startQuest, claimQuestReward } from '@/lib/api';
import GameBackground from './GameBackground';
import GameHeader from './GameHeader';
import GameContent from './GameContent';

interface GameScreenProps {
  player: Player;
  onLogout: () => void;
}

export default function GameScreen({ player, onLogout }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [buildMode, setBuildMode] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  const loadGameData = useCallback(async () => {
    try {
      const [state, types, questsData] = await Promise.all([
        getGameState(player.id.toString()),
        getBuildingTypes(player.id.toString()),
        getQuests(player.id.toString())
      ]);
      setGameState(state);
      setBuildingTypes(types.building_types);
      setQuests(questsData.quests);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      setLoading(false);
    }
  }, [player.id]);

  useEffect(() => {
    loadGameData();
    const interval = setInterval(loadGameData, 5000);
    return () => clearInterval(interval);
  }, [loadGameData]);

  const handleBuild = async (x: number, y: number) => {
    if (!selectedBuildingType || !gameState) return;

    try {
      await buildBuilding(player.id.toString(), selectedBuildingType.id, x, y);
      await loadGameData();
      setBuildMode(false);
      setSelectedBuildingType(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка строительства');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCollect = async (building: Building) => {
    try {
      const result = await collectResources(player.id.toString(), building.id);
      setError(`Собрано: ${result.collected.amount} ${result.collected.resource}`);
      setTimeout(() => setError(''), 2000);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сбора');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCompleteBuilding = async (buildingId: number) => {
    try {
      await completeBuilding(player.id.toString(), buildingId);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка завершения');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleUpgrade = async (building: Building) => {
    try {
      const result = await upgradeBuilding(player.id.toString(), building.id);
      setError(result.message);
      setTimeout(() => setError(''), 2000);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка улучшения');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStartQuest = async (questId: number) => {
    try {
      await startQuest(player.id.toString(), questId);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка начала квеста');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleClaimQuest = async (questId: number) => {
    try {
      const result = await claimQuestReward(player.id.toString(), questId);
      setError(`Награда получена! 🎁`);
      setTimeout(() => setError(''), 2000);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка получения награды');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Загрузка игры...</div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-red-700">Ошибка загрузки игры</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameBackground />

      <GameHeader
        player={player}
        quests={quests}
        resources={gameState.resources}
        showQuests={showQuests}
        onToggleQuests={() => setShowQuests(!showQuests)}
        onLogout={onLogout}
      />

      {error && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <GameContent
        gameState={gameState}
        buildingTypes={buildingTypes}
        quests={quests}
        buildMode={buildMode}
        showQuests={showQuests}
        selectedBuildingType={selectedBuildingType}
        onBuild={handleBuild}
        onCollect={handleCollect}
        onCompleteBuilding={handleCompleteBuilding}
        onUpgrade={handleUpgrade}
        onSelectType={(type) => {
          setSelectedBuildingType(type);
          setBuildMode(true);
        }}
        onCancelBuild={() => {
          setBuildMode(false);
          setSelectedBuildingType(null);
        }}
        onStartQuest={handleStartQuest}
        onClaimQuest={handleClaimQuest}
      />
    </div>
  );
}
