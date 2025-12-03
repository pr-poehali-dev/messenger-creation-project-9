import { BuildingType, Resources } from '@/types/game';
import { Button } from './ui/button';
import { useState } from 'react';

interface BuildMenuProps {
  buildingTypes: BuildingType[];
  resources: Resources;
  selectedType: BuildingType | null;
  onSelectType: (type: BuildingType) => void;
  onCancel: () => void;
  buildMode: boolean;
}

export default function BuildMenu({
  buildingTypes,
  resources,
  selectedType,
  onSelectType,
  onCancel,
  buildMode
}: BuildMenuProps) {
  const [category, setCategory] = useState<'all' | 'city' | 'farm'>('all');

  const canAfford = (type: BuildingType) => {
    return (
      resources.coins >= type.cost.coins &&
      resources.wood >= type.cost.wood &&
      resources.stone >= type.cost.stone &&
      resources.iron >= type.cost.iron
    );
  };

  const filteredTypes = buildingTypes.filter(
    type => category === 'all' || type.category === category
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🏗️ Строительство</h2>

      {buildMode && selectedType ? (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-center mb-2">
            <div className="text-5xl mb-2">{selectedType.image}</div>
            <div className="font-bold text-gray-800">{selectedType.name}</div>
            <div className="text-sm text-gray-600">{selectedType.description}</div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={onCancel}
          >
            Отменить
          </Button>
        </div>
      ) : null}

      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant={category === 'all' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setCategory('all')}
        >
          Все
        </Button>
        <Button
          size="sm"
          variant={category === 'city' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setCategory('city')}
        >
          🏙️ Город
        </Button>
        <Button
          size="sm"
          variant={category === 'farm' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setCategory('farm')}
        >
          🌾 Ферма
        </Button>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredTypes.map((type) => {
          const affordable = canAfford(type);
          
          return (
            <div
              key={type.id}
              className={`
                p-3 rounded-lg border-2 transition-all cursor-pointer
                ${affordable ? 'border-green-300 bg-green-50 hover:bg-green-100' : 'border-gray-200 bg-gray-50 opacity-60'}
                ${selectedType?.id === type.id ? 'ring-2 ring-blue-500' : ''}
              `}
              onClick={() => affordable && onSelectType(type)}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{type.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-sm mb-1">{type.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{type.description}</div>
                  
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {type.cost.coins > 0 && (
                      <div className={resources.coins >= type.cost.coins ? 'text-green-700' : 'text-red-700'}>
                        💰 {type.cost.coins}
                      </div>
                    )}
                    {type.cost.wood > 0 && (
                      <div className={resources.wood >= type.cost.wood ? 'text-green-700' : 'text-red-700'}>
                        🪵 {type.cost.wood}
                      </div>
                    )}
                    {type.cost.stone > 0 && (
                      <div className={resources.stone >= type.cost.stone ? 'text-green-700' : 'text-red-700'}>
                        🪨 {type.cost.stone}
                      </div>
                    )}
                    {type.cost.iron > 0 && (
                      <div className={resources.iron >= type.cost.iron ? 'text-green-700' : 'text-red-700'}>
                        ⚙️ {type.cost.iron}
                      </div>
                    )}
                  </div>

                  {type.produces && (
                    <div className="mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      +{type.production_rate} {type.produces} / {Math.floor(type.production_interval / 60)}мин
                    </div>
                  )}

                  <div className="mt-1 text-xs text-gray-500">
                    ⏱️ Время: {Math.floor(type.build_time / 60)}мин {type.build_time % 60}с
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
