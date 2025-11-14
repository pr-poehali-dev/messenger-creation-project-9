import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import MessageMenu from './MessageMenu';
import VoicePlayer from './VoicePlayer';
import type { Message } from '@/types/chat';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  editingMessageId: number | null;
  editingContent: string;
  onEdit: (messageId: number, content: string) => void;
  onSaveEdit: (messageId: number) => void;
  onCancelEdit: () => void;
  onDelete: (messageId: number) => void;
  onForward: (message: Message) => void;
  setEditingContent: (content: string) => void;
}

export default function MessageItem({
  message,
  isOwn,
  editingMessageId,
  editingContent,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onForward,
  setEditingContent,
}: MessageItemProps) {
  const isEditing = editingMessageId === message.id;

  return (
    <div
      className={`flex gap-3 group ${isOwn ? 'flex-row-reverse' : ''}`}
    >
      {!isOwn && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={message.sender_avatar || undefined} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
            {message.sender_name?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-md flex-1`}>
        <div className="flex items-center gap-2 mb-1">
          {!isOwn && (
            <span className="text-xs font-medium px-1">
              {message.sender_name}
            </span>
          )}
          <MessageMenu
            onEdit={() => onEdit(message.id, message.content)}
            onDelete={() => onDelete(message.id)}
            onForward={() => onForward(message)}
            isOwnMessage={isOwn}
          />
        </div>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwn
              ? 'bg-blue-600 text-white'
              : 'bg-muted'
          }`}
        >
          {message.voice_url && (
            <VoicePlayer 
              voiceUrl={message.voice_url} 
              duration={message.voice_duration || 0} 
            />
          )}
          {message.file_url && (
            <div className="mb-2">
              {message.file_type?.startsWith('image/') ? (
                <img
                  src={message.file_url}
                  alt={message.file_name || 'Image'}
                  className="max-w-full max-h-64 rounded-lg"
                />
              ) : (
                <a
                  href={message.file_url}
                  download={message.file_name}
                  className="flex items-center gap-2 p-2 rounded bg-background/10 hover:bg-background/20 transition-colors"
                >
                  <Icon name="FileText" size={20} />
                  <span className="text-sm">{message.file_name || 'Файл'}</span>
                </a>
              )}
            </div>
          )}
          {isEditing ? (
            <div className="space-y-2 w-full">
              <Input
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onSaveEdit(message.id)}>
                  Сохранить
                </Button>
                <Button size="sm" variant="outline" onClick={onCancelEdit}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            message.content && (
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            )
          )}
        </div>
        {!isEditing && (
          <span className="text-xs text-muted-foreground mt-1 px-1">
            {format(new Date(message.created_at), 'HH:mm', { locale: ru })}
            {message.is_edited && ' (изменено)'}
          </span>
        )}
      </div>
    </div>
  );
}
