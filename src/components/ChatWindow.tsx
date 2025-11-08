import { useEffect, useRef, useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import HighlightText from '@/components/HighlightText';
import VoiceRecorder from '@/components/VoiceRecorder';
import MediaMessage from '@/components/MediaMessage';
import MessageReactions from '@/components/MessageReactions';
import CallWindow from '@/components/CallWindow';
import { chatsApi } from '@/lib/chats';
import { webrtc } from '@/lib/webrtc';
import type { Chat, Message, User } from '@/types';

type ChatWindowProps = {
  selectedChat: Chat | null;
  messages: Message[];
  currentUser: User;
  messageText: string;
  onMessageTextChange: (value: string) => void;
  onSendMessage: () => void;
  showStickers: boolean;
  onToggleStickers: () => void;
  stickers: string[];
  reactions: string[];
  onStickerClick: (sticker: string) => void;
  onAddReaction: (messageId: number, reaction: string) => void;
  messageSearchQuery: string;
  onMessageSearchChange: (value: string) => void;
};

export default function ChatWindow({
  selectedChat,
  messages,
  currentUser,
  messageText,
  onMessageTextChange,
  onSendMessage,
  showStickers,
  onToggleStickers,
  stickers,
  reactions,
  onStickerClick,
  onAddReaction,
  messageSearchQuery,
  onMessageSearchChange
}: ChatWindowProps) {
  const messageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [activeCall, setActiveCall] = useState<{ type: 'video' | 'audio', user: { id: number, name: string, avatar?: string } } | null>(null);
  const [messageMenuId, setMessageMenuId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const matchedIndices = useMemo(() => {
    if (!messageSearchQuery.trim()) return [];
    const query = messageSearchQuery.toLowerCase();
    return messages
      .map((msg, idx) => msg.text.toLowerCase().includes(query) ? idx : -1)
      .filter(idx => idx !== -1);
  }, [messages, messageSearchQuery]);

  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [messageSearchQuery]);

  useEffect(() => {
    if (matchedIndices.length > 0 && messageRefs.current.size > 0) {
      const messageIndex = matchedIndices[currentMatchIndex];
      const element = messageRefs.current.get(messageIndex);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentMatchIndex, matchedIndices]);

  const handlePrevMatch = () => {
    setCurrentMatchIndex(prev => 
      prev > 0 ? prev - 1 : matchedIndices.length - 1
    );
  };

  const handleNextMatch = () => {
    setCurrentMatchIndex(prev => 
      prev < matchedIndices.length - 1 ? prev + 1 : 0
    );
  };

  const handleVoiceRecordingComplete = async (audioBlob: Blob, duration: number) => {
    try {
      const text = 'Голосовое сообщение';
      const response = await chatsApi.sendMessage(selectedChat!.id, text);
      const messageId = response.message.id;
      await chatsApi.uploadMedia(messageId, 'audio', audioBlob, duration);
      setShowVoiceRecorder(false);
      onSendMessage();
    } catch (error) {
      console.error('Failed to send voice message:', error);
    }
  };

  const handleStartCall = async (callType: 'video' | 'audio') => {
    if (!selectedChat) return;
    try {
      const callId = await webrtc.initiateCall(selectedChat.other_user_id!, callType);
      setActiveCall({
        type: callType,
        user: {
          id: selectedChat.other_user_id!,
          name: selectedChat.name,
          avatar: selectedChat.avatar
        }
      });
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      if (activeCall) {
        await webrtc.endCall(`call_${currentUser.id}_${activeCall.user.id}`);
      }
      setActiveCall(null);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handleAddReactionToMessage = async (messageId: number, reaction: string) => {
    try {
      await chatsApi.addReaction(messageId, reaction);
      onAddReaction(messageId, reaction);
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  const handleRemoveReaction = async (reactionId: number) => {
    try {
      await chatsApi.removeReaction(reactionId);
      onSendMessage();
    } catch (error) {
      console.error('Failed to remove reaction:', error);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await chatsApi.deleteMessage(messageId);
      setMessageMenuId(null);
      onSendMessage();
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat) return;

    try {
      const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : null;
      if (!fileType) {
        console.error('Unsupported file type');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const mediaData = e.target?.result as string;
        const text = fileType === 'image' ? 'Изображение' : 'Видео';
        const response = await chatsApi.sendMessage(selectedChat.id, text);
        const messageId = response.message.id;
        
        let duration = 0;
        if (fileType === 'video') {
          const video = document.createElement('video');
          video.src = mediaData;
          await new Promise(resolve => {
            video.onloadedmetadata = () => {
              duration = Math.floor(video.duration);
              resolve(null);
            };
          });
        }

        await chatsApi.uploadMedia(messageId, fileType, mediaData, duration);
        onSendMessage();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-32 h-32 mx-auto gradient-primary rounded-full flex items-center justify-center text-6xl">
            💬
          </div>
          <h2 className="text-3xl font-bold gradient-text">Добро пожаловать, {currentUser.username}!</h2>
          <p className="text-muted-foreground">
            Выберите чат слева или создайте новый
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-16 md:h-20 glass border-b border-border px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-xl">
              {selectedChat.avatar}
            </div>
            {selectedChat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-base md:text-lg">{selectedChat.name}</h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              {selectedChat.online ? 'в сети' : 'был(а) недавно'}
            </p>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск в сообщениях..."
              value={messageSearchQuery}
              onChange={(e) => onMessageSearchChange(e.target.value)}
              className="pl-9 pr-32 rounded-full bg-muted border-0 h-9 text-sm"
            />
            {messageSearchQuery && matchedIndices.length > 0 && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1">
                <span className="text-xs text-muted-foreground px-1">
                  {currentMatchIndex + 1} / {matchedIndices.length}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-6 w-6"
                  onClick={handlePrevMatch}
                >
                  <Icon name="ChevronUp" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-6 w-6"
                  onClick={handleNextMatch}
                >
                  <Icon name="ChevronDown" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-6 w-6"
                  onClick={() => onMessageSearchChange('')}
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            )}
            {messageSearchQuery && matchedIndices.length === 0 && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-7 w-7"
                onClick={() => onMessageSearchChange('')}
              >
                <Icon name="X" size={14} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="rounded-full h-10 w-10" onClick={() => handleStartCall('audio')}>
            <Icon name="Phone" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full h-10 w-10" onClick={() => handleStartCall('video')}>
            <Icon name="Video" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full h-10 w-10">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => {
            const isSent = message.sender_id === currentUser.id;
            const isMatch = matchedIndices.includes(index);
            
            return (
              <div
                key={message.id}
                ref={(el) => {
                  if (el && isMatch) {
                    messageRefs.current.set(index, el);
                  }
                }}
                className={`flex items-end gap-2 group ${isSent ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isSent && (
                  <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                    {message.avatar}
                  </div>
                )}
                <div className="relative max-w-[85%] md:max-w-md">
                  <div
                    className={`px-4 py-3 rounded-2xl animate-scale-in active:scale-95 relative ${
                      isSent
                        ? 'gradient-primary text-white rounded-br-md'
                        : 'glass rounded-bl-md'
                    }`}
                    onClick={() => setMessageMenuId(messageMenuId === message.id ? null : message.id)}
                  >
                    {message.message_type ? (
                      <MediaMessage message={message} />
                    ) : (
                      <HighlightText text={message.text} highlight={messageSearchQuery} className="text-sm leading-relaxed block" />
                    )}
                    <span
                      className={`text-xs mt-1 block ${
                        isSent ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {messageMenuId === message.id && isSent && (
                      <div className="absolute top-full right-0 mt-1 bg-card border rounded-lg shadow-lg p-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                          }}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded text-sm text-red-600 w-full"
                        >
                          <Icon name="Trash2" size={16} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="mt-1">
                      <MessageReactions
                        reactions={message.reactions}
                        onAddReaction={(reaction) => handleAddReactionToMessage(message.id, reaction)}
                        onRemoveReaction={handleRemoveReaction}
                        currentUserId={currentUser.id}
                      />
                    </div>
                  )}
                  {(!message.reactions || message.reactions.length === 0) && (
                    <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageReactions
                        reactions={[]}
                        onAddReaction={(reaction) => handleAddReactionToMessage(message.id, reaction)}
                        onRemoveReaction={handleRemoveReaction}
                        currentUserId={currentUser.id}
                      />
                    </div>
                  )}
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
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 md:p-6 glass border-t border-border">
        {showStickers && (
          <div className="mb-4 p-4 bg-card rounded-2xl border border-border animate-scale-in">
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {stickers.map(sticker => (
                <button
                  key={sticker}
                  onClick={() => onStickerClick(sticker)}
                  className="text-3xl md:text-2xl p-3 md:p-2 active:scale-95 hover:scale-110 transition-transform hover:bg-muted rounded-xl"
                >
                  {sticker}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-12 w-12 md:h-10 md:w-10"
            onClick={onToggleStickers}
          >
            <Icon name="Smile" size={24} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-12 w-12 md:h-10 md:w-10"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="Image" size={24} />
          </Button>
          {showVoiceRecorder ? (
            <div className="flex-1">
              <VoiceRecorder
                onRecordingComplete={handleVoiceRecordingComplete}
                onCancel={() => setShowVoiceRecorder(false)}
              />
            </div>
          ) : (
            <>
              <div className="flex-1 relative">
                <Input
                  placeholder="Написать сообщение..."
                  value={messageText}
                  onChange={(e) => onMessageTextChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                  className="rounded-full bg-muted border-0 pr-12 h-12 md:h-10 text-base md:text-sm"
                />
                {!messageText.trim() && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={() => setShowVoiceRecorder(true)}
                  >
                    <Icon name="Mic" size={20} />
                  </Button>
                )}
              </div>
              {messageText.trim() && (
                <Button
                  size="icon"
                  className="rounded-full gradient-primary border-0 h-12 w-12 md:h-10 md:w-10 active:scale-95 hover:scale-110 transition-transform"
                  onClick={onSendMessage}
                >
                  <Icon name="Send" size={22} />
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {activeCall && (
        <CallWindow
          callType={activeCall.type}
          isOutgoing={true}
          otherUser={activeCall.user}
          onEndCall={handleEndCall}
        />
      )}
    </>
  );
}