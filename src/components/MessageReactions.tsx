import { useState } from 'react';
import type { MessageReaction } from '@/types';

interface MessageReactionsProps {
  reactions: MessageReaction[];
  onAddReaction: (reaction: string) => void;
  onRemoveReaction: (reactionId: number) => void;
  currentUserId: number;
}

const COMMON_REACTIONS = ['❤️', '👍', '😂', '😮', '😢', '🔥', '👏', '🎉'];

export default function MessageReactions({ 
  reactions, 
  onAddReaction, 
  onRemoveReaction,
  currentUserId 
}: MessageReactionsProps) {
  const [showPicker, setShowPicker] = useState(false);

  const groupedReactions = reactions.reduce((acc, r) => {
    if (!acc[r.reaction]) {
      acc[r.reaction] = [];
    }
    acc[r.reaction].push(r);
    return acc;
  }, {} as Record<string, MessageReaction[]>);

  const handleReactionClick = (reaction: string) => {
    const existingReaction = reactions.find(
      r => r.reaction === reaction && r.user_id === currentUserId
    );

    if (existingReaction) {
      onRemoveReaction(existingReaction.id);
    } else {
      onAddReaction(reaction);
    }
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 flex-wrap">
        {Object.entries(groupedReactions).map(([emoji, reactionList]) => {
          const hasUserReacted = reactionList.some(r => r.user_id === currentUserId);
          return (
            <button
              key={emoji}
              onClick={() => handleReactionClick(emoji)}
              className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-colors ${
                hasUserReacted
                  ? 'bg-primary/20 border border-primary'
                  : 'bg-muted hover:bg-muted/80'
              }`}
              title={reactionList.map(r => r.username).join(', ')}
            >
              <span>{emoji}</span>
              <span className="text-[10px]">{reactionList.length}</span>
            </button>
          );
        })}

        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <span className="text-xs">+</span>
        </button>
      </div>

      {showPicker && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowPicker(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 bg-white border rounded-lg shadow-lg p-2 flex gap-1 z-50">
            {COMMON_REACTIONS.map(emoji => (
              <button
                key={emoji}
                onClick={() => handleReactionClick(emoji)}
                className="w-8 h-8 hover:bg-muted rounded transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
