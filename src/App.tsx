import { useState } from 'react';
import { Block } from './types/builder';
import Toolbar from './components/builder/Toolbar';
import BlockRenderer from './components/builder/BlockRenderer';
import BlockEditor from './components/builder/BlockEditor';

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleAddBlock = (type: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: type as Block['type'],
      content: {},
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleEditBlock = (blockId: string) => {
    const block = blocks.find((b) => b.id === blockId);
    if (block) {
      setEditingBlock(block);
    }
  };

  const handleSaveBlock = (updatedBlock: Block) => {
    setBlocks(blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b)));
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === blockId);
    if (index === -1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleSave = () => {
    const data = JSON.stringify(blocks, null, 2);
    localStorage.setItem('website-builder-data', data);
    alert('Сайт сохранён!');
  };

  const handleExport = () => {
    const data = JSON.stringify(blocks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
        <h1 className="text-3xl font-bold">🚀 Конструктор сайтов</h1>
        <p className="text-blue-100 mt-1">Создавайте современные сайты без кода</p>
      </div>

      <Toolbar
        onAddBlock={handleAddBlock}
        onPreview={() => setIsPreview(!isPreview)}
        onSave={handleSave}
        onExport={handleExport}
      />

      <div className="container mx-auto py-8">
        {blocks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Начните создавать свой сайт
            </h2>
            <p className="text-gray-600 mb-6">
              Добавьте первый блок из панели инструментов выше
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                isEditing={!isPreview}
                onEdit={() => handleEditBlock(block.id)}
                onDelete={() => handleDeleteBlock(block.id)}
                onMoveUp={() => handleMoveBlock(block.id, 'up')}
                onMoveDown={() => handleMoveBlock(block.id, 'down')}
              />
            ))}
          </div>
        )}
      </div>

      {editingBlock && (
        <BlockEditor
          block={editingBlock}
          onSave={handleSaveBlock}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
}
