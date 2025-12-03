import { Resources } from '@/types/game';

interface ResourceBarProps {
  resources: Resources;
}

export default function ResourceBar({ resources }: ResourceBarProps) {
  const resourceItems = [
    { label: 'Монеты', value: resources.coins, icon: '💰' },
    { label: 'Дерево', value: resources.wood, icon: '🪵' },
    { label: 'Камень', value: resources.stone, icon: '🪨' },
    { label: 'Еда', value: resources.food, icon: '🌾' },
    { label: 'Железо', value: resources.iron, icon: '⚙️' },
    { label: 'Население', value: `${resources.population}/${resources.max_population}`, icon: '👥' }
  ];

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {resourceItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
              <span className="text-xl">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">{item.label}</span>
                <span className="text-sm font-bold text-gray-800">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
