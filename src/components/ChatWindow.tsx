import { useEffect, useRef, useState, useMemo } from 'react';
import { chatsApi } from '@/lib/chats';
import { webrtc } from '@/lib/webrtc';
import CallWindow from '@/components/CallWindow';
import ChatHeader from '@/components/ChatWindow/ChatHeader';
import ChatMessages from '@/components/ChatWindow/ChatMessages';
import ChatInput from '@/components/ChatWindow/ChatInput';
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
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState('');
  const typingTimeoutRef = useRef<number>();

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

  useEffect(() => {
    if (!selectedChat) return;

    const checkTypingStatus = async () => {
      try {
        const status = await chatsApi.getTypingStatus(selectedChat.id);
        if (status.isTyping && status.userId !== currentUser.id) {
          setIsTyping(true);
          setTypingUsername(status.username || 'Собеседник');
        } else {
          setIsTyping(false);
          setTypingUsername('');
        }
      } catch (error) {
        console.error('Failed to check typing status:', error);
      }
    };

    const interval = setInterval(checkTypingStatus, 1000);
    return () => clearInterval(interval);
  }, [selectedChat, currentUser.id]);

  const handleMessageTextChange = (value: string) => {
    onMessageTextChange(value);
    
    if (!selectedChat) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim().length > 0) {
      chatsApi.setTyping(selectedChat.id, true).catch(err => 
        console.error('Failed to set typing status:', err)
      );

      typingTimeoutRef.current = window.setTimeout(() => {
        chatsApi.setTyping(selectedChat.id, false).catch(err => 
          console.error('Failed to clear typing status:', err)
        );
      }, 3000);
    } else {
      chatsApi.setTyping(selectedChat.id, false).catch(err => 
        console.error('Failed to clear typing status:', err)
      );
    }
  };

  const setMessageRef = (index: number, element: HTMLDivElement | null) => {
    if (element) {
      messageRefs.current.set(index, element);
    } else {
      messageRefs.current.delete(index);
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto gradient-primary rounded-full flex items-center justify-center text-4xl sm:text-6xl">
            💬
          </div>
          <h2 className="text-xl sm:text-3xl font-bold gradient-text">Добро пожаловать, {currentUser.username}!</h2>
          <p className="text-muted-foreground">
            Выберите чат слева или создайте новый
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        <ChatHeader
          selectedChat={selectedChat}
          isTyping={isTyping}
          messageSearchQuery={messageSearchQuery}
          onMessageSearchChange={onMessageSearchChange}
          matchedIndices={matchedIndices}
          currentMatchIndex={currentMatchIndex}
          onPrevMatch={handlePrevMatch}
          onNextMatch={handleNextMatch}
          onStartCall={handleStartCall}
        />

        <ChatMessages
          messages={messages}
          currentUser={currentUser}
          messageSearchQuery={messageSearchQuery}
          messageMenuId={messageMenuId}
          onSetMessageMenuId={setMessageMenuId}
          onDeleteMessage={handleDeleteMessage}
          onAddReaction={handleAddReactionToMessage}
          onRemoveReaction={handleRemoveReaction}
          reactions={reactions}
          setMessageRef={setMessageRef}
        />

        <ChatInput
          messageText={messageText}
          onMessageTextChange={handleMessageTextChange}
          onSendMessage={onSendMessage}
          showStickers={showStickers}
          onToggleStickers={onToggleStickers}
          stickers={stickers}
          onStickerClick={onStickerClick}
          showVoiceRecorder={showVoiceRecorder}
          onToggleVoiceRecorder={() => setShowVoiceRecorder(!showVoiceRecorder)}
          onVoiceRecordingComplete={handleVoiceRecordingComplete}
          onFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
        />
      </div>

      {activeCall && (
        <CallWindow
          callType={activeCall.type}
          user={activeCall.user}
          onEndCall={handleEndCall}
        />
      )}
    </>
  );
}