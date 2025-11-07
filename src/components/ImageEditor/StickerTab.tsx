import type { StickerOverlay } from './types';

type StickerTabProps = {
  stickerOverlays: StickerOverlay[];
  onAddSticker: (emoji: string) => void;
  onDeleteSticker: (id: string) => void;
};

const stickers = [
  '😀', '😂', '🥰', '😎', '🤔', '😱', '🔥', '❤️', '💯', '✨', '🎉', '👍',
  '👏', '🙌', '💪', '🚀', '⭐', '🌈', '☀️', '🌙', '💕', '💖', '🎈', '🎊'
];

export default function StickerTab({
  stickerOverlays,
  onAddSticker,
  onDeleteSticker,
}: StickerTabProps) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-sm font-medium mb-3">Выберите стикер</p>
      <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
        {stickers.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => onAddSticker(emoji)}
            className="text-4xl p-3 rounded-xl hover:bg-muted transition-all hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>
      {stickerOverlays.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Добавленные стикеры:</p>
          <div className="flex flex-wrap gap-2">
            {stickerOverlays.map(overlay => (
              <button
                key={overlay.id}
                onClick={() => onDeleteSticker(overlay.id)}
                className="text-2xl p-2 bg-muted rounded-lg hover:bg-destructive/20 transition-all"
                title="Нажмите для удаления"
              >
                {overlay.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
