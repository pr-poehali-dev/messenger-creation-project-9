import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import MessageItem from './MessageItem';
import type { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  userId: number | undefined;
  editingMessageId: number | null;
  editingContent: string;
  scrollRef: React.RefObject<HTMLDivElement>;
  onEdit: (messageId: number, content: string) => void;
  onSaveEdit: (messageId: number) => void;
  onCancelEdit: () => void;
  onDelete: (messageId: number) => void;
  onForward: (message: Message) => void;
  setEditingContent: (content: string) => void;
}

export default function MessageList({
  messages,
  loading,
  userId,
  editingMessageId,
  editingContent,
  scrollRef,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onForward,
  setEditingContent,
}: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-3 md:p-6">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Нет сообщений</p>
            <p className="text-sm text-muted-foreground">Начните общение</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.sender_id === userId;
            
            return (
              <MessageItem
                key={message.id}
                message={message}
                isOwn={isOwn}
                editingMessageId={editingMessageId}
                editingContent={editingContent}
                onEdit={onEdit}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onDelete={onDelete}
                onForward={onForward}
                setEditingContent={setEditingContent}
              />
            );
          })}
          <div ref={scrollRef} />
        </div>
      )}
    </ScrollArea>
  );
}
