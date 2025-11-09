import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import HighlightText from '@/components/HighlightText';
import MediaMessage from '@/components/MediaMessage';
import MessageReactions from '@/components/MessageReactions';
import type { Message, User } from '@/types';

type ChatMessagesProps = {
  messages: Message[];
  currentUser: User;
  messageSearchQuery: string;
  messageMenuId: number | null;
  onSetMessageMenuId: (id: number | null) => void;
  onDeleteMessage: (messageId: number) => void;
  onAddReaction: (messageId: number, reaction: string) => void;
  onRemoveReaction: (reactionId: number) => void;
  reactions: string[];
  setMessageRef: (index: number, element: HTMLDivElement | null) => void;
};

export default function ChatMessages({
  messages,
  currentUser,
  messageSearchQuery,
  messageMenuId,
  onSetMessageMenuId,
  onDeleteMessage,
  onAddReaction,
  onRemoveReaction,
  reactions,
  setMessageRef
}: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 px-4 md:px-6 py-4">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender_id === currentUser.id;
          const isHighlighted = messageSearchQuery.trim() && 
            message.text.toLowerCase().includes(messageSearchQuery.toLowerCase());

          return (
            <div
              key={message.id}
              ref={(el) => setMessageRef(index, el)}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group relative`}
            >
              <div className={`max-w-[75%] md:max-w-[65%] ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {!isCurrentUser && (
                  <span className="text-xs text-muted-foreground px-3">{message.username}</span>
                )}
                <div className="relative">
                  {message.media_url && message.media_type && (
                    <MediaMessage
                      url={message.media_url}
                      type={message.media_type}
                      duration={message.media_duration}
                    />
                  )}
                  {message.text && (message.text !== 'Изображение' && message.text !== 'Видео' && message.text !== 'Голосовое сообщение') && (
                    <div
                      className={`px-4 py-3 md:px-4 md:py-2 rounded-2xl break-words ${
                        isCurrentUser
                          ? 'gradient-primary text-white'
                          : 'bg-muted text-foreground'
                      } ${isHighlighted ? 'ring-2 ring-primary' : ''}`}
                    >
                      <HighlightText text={message.text} highlight={messageSearchQuery} />
                    </div>
                  )}
                  <MessageReactions
                    reactions={message.reactions || []}
                    onRemoveReaction={onRemoveReaction}
                    currentUserId={currentUser.id}
                  />
                  {isCurrentUser && (
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full h-8 w-8"
                        onClick={() => onSetMessageMenuId(messageMenuId === message.id ? null : message.id)}
                      >
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                      {messageMenuId === message.id && (
                        <div className="absolute left-full ml-2 top-0 bg-card border border-border rounded-xl shadow-lg p-1 min-w-32 z-10">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm h-8"
                            onClick={() => onDeleteMessage(message.id)}
                          >
                            <Icon name="Trash2" size={14} className="mr-2" />
                            Удалить
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  {!isCurrentUser && (
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1 bg-card border border-border rounded-full px-2 py-1">
                        {reactions.slice(0, 3).map(reaction => (
                          <button
                            key={reaction}
                            onClick={() => onAddReaction(message.id, reaction)}
                            className="hover:scale-125 transition-transform text-sm"
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}