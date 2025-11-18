import { useState, useEffect } from 'react';
import { getReelComments, addReelComment } from '@/lib/reelsApi';
import type { ReelComment } from '@/types/chat';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ReelCommentsModalProps {
  reelId: number;
  onClose: () => void;
  onCommentAdded: () => void;
}

export default function ReelCommentsModal({ reelId, onClose, onCommentAdded }: ReelCommentsModalProps) {
  const [comments, setComments] = useState<ReelComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadComments();
  }, [reelId]);

  const loadComments = async () => {
    try {
      const data = await getReelComments(reelId);
      setComments(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load comments:', error);
      toast.error('Не удалось загрузить комментарии');
      setLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    setSending(true);
    try {
      await addReelComment(reelId, newComment);
      setNewComment('');
      await loadComments();
      onCommentAdded();
      toast.success('Комментарий добавлен');
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Не удалось добавить комментарий');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center">
      <div
        className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Комментарии</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Icon name="Loader2" className="animate-spin" size={24} />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Нет комментариев</p>
              <p className="text-sm">Будьте первым!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.avatar_url || '/placeholder.svg'}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">{comment.username}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Написать комментарий..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
              disabled={sending}
            />
            <Button
              onClick={handleSendComment}
              disabled={!newComment.trim() || sending}
              size="icon"
            >
              {sending ? (
                <Icon name="Loader2" className="animate-spin" size={18} />
              ) : (
                <Icon name="Send" size={18} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
