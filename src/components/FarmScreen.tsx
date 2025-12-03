import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface Player {
  id: number;
  username: string;
  coins: number;
  crystals: number;
  energy: number;
  max_energy: number;
  experience: number;
  level: number;
}

interface Bed {
  id: number;
  bed_number: number;
  plant_type_id: number | null;
  planted_at: string | null;
  ready_at: string | null;
  is_ready: boolean;
  is_withered: boolean;
  plant_name: string | null;
  plant_emoji: string | null;
  grow_time: number | null;
}

interface Plant {
  id: number;
  name: string;
  emoji: string;
  plant_type: string;
  grow_time: number;
  yield_coins: number;
  yield_energy: number;
  energy_cost: number;
  price_coins: number;
  required_level: number;
}

interface FarmScreenProps {
  playerId: number;
  username: string;
  onLogout: () => void;
}

export default function FarmScreen({ playerId, username, onLogout }: FarmScreenProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadGameState = async () => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/3876dc69-d831-4782-8a84-75f0ee87a7c2?player_id=${playerId}&action=state`
      );
      const data = await response.json();
      setPlayer(data.player);
      setBeds(data.beds);
      setPlants(data.discovered_plants);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGameState();
    const interval = setInterval(loadGameState, 3000);
    return () => clearInterval(interval);
  }, [playerId]);

  const handlePlant = async (bedNumber: number) => {
    if (!selectedPlant) {
      setMessage('Выберите растение');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/3876dc69-d831-4782-8a84-75f0ee87a7c2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          action: 'plant',
          bed_number: bedNumber,
          plant_type_id: selectedPlant.id
        })
      });

      const data = await response.json();
      setMessage(data.message || data.error);
      await loadGameState();
      setSelectedPlant(null);
    } catch (err) {
      setMessage('Ошибка посадки');
    }
  };

  const handleHarvest = async (bedNumber: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/3876dc69-d831-4782-8a84-75f0ee87a7c2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          action: 'harvest',
          bed_number: bedNumber
        })
      });

      const data = await response.json();
      setMessage(data.message || data.error);
      await loadGameState();
    } catch (err) {
      setMessage('Ошибка сбора');
    }
  };

  const getTimeLeft = (readyAt: string) => {
    const now = new Date();
    const ready = new Date(readyAt);
    const diff = Math.max(0, ready.getTime() - now.getTime());
    const seconds = Math.floor(diff / 1000);
    
    if (seconds === 0) return 'Готово!';
    if (seconds < 60) return `${seconds}с`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}м ${secs}с`;
  };

  if (loading || !player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-emerald-700">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      <div className="bg-white/90 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onLogout} size="sm">
              <Icon name="ArrowLeft" size={18} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
                🧬 Нано-Ферма <span className="text-sm font-normal text-gray-600">Лвл {player.level}</span>
              </h1>
              <p className="text-sm text-gray-600">{player.username}</p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-2 flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-xl">💰</span>
            <span className="font-bold">{player.coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl">💎</span>
            <span className="font-bold">{player.crystals}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl">⚡</span>
            <span className="font-bold">{player.energy}/{player.max_energy}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl">⭐</span>
            <span className="font-bold">{player.experience} XP</span>
          </div>
        </div>
      </div>

      {message && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded">
            {message}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-emerald-800 mb-4">🌱 Грядки</h2>
              
              <div className="grid grid-cols-3 gap-3">
                {beds.map((bed) => {
                  const isReady = bed.ready_at && new Date(bed.ready_at) <= new Date();
                  
                  return (
                    <div
                      key={bed.bed_number}
                      className={`
                        relative border-4 rounded-lg p-4 min-h-[120px] flex flex-col items-center justify-center cursor-pointer transition-all
                        ${bed.plant_type_id ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-300 hover:bg-emerald-50 hover:border-emerald-400'}
                        ${isReady && bed.plant_type_id ? 'animate-pulse border-yellow-400' : ''}
                      `}
                      onClick={() => {
                        if (!bed.plant_type_id && selectedPlant) {
                          handlePlant(bed.bed_number);
                        }
                      }}
                    >
                      {bed.plant_type_id ? (
                        <>
                          <div className="text-5xl mb-2">{bed.plant_emoji}</div>
                          <div className="text-xs font-semibold text-center">{bed.plant_name}</div>
                          {bed.ready_at && (
                            <div className="text-xs text-gray-600 mt-1">
                              {getTimeLeft(bed.ready_at)}
                            </div>
                          )}
                          {isReady && (
                            <Button
                              size="sm"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHarvest(bed.bed_number);
                              }}
                            >
                              Собрать
                            </Button>
                          )}
                        </>
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-3xl mb-1">📍</div>
                          <div className="text-xs">Пусто</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-emerald-800 mb-4">🌿 Растения</h2>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {plants.map((plant) => (
                  <div
                    key={plant.id}
                    className={`
                      p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${selectedPlant?.id === plant.id ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-300' : 'bg-gray-50 border-gray-200 hover:bg-emerald-50'}
                      ${player.energy < plant.energy_cost || player.coins < plant.price_coins ? 'opacity-50' : ''}
                    `}
                    onClick={() => setSelectedPlant(plant.id === selectedPlant?.id ? null : plant)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{plant.emoji}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{plant.name}</div>
                        <div className="text-xs text-gray-600 mb-1">🕐 {plant.grow_time}с</div>
                        <div className="flex gap-2 text-xs">
                          <span>💰 {plant.price_coins}</span>
                          <span>⚡ {plant.energy_cost}</span>
                          <span>→ 💰 {plant.yield_coins}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}