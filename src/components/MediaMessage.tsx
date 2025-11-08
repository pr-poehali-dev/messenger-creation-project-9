import Icon from '@/components/ui/icon';
import type { Message } from '@/types';

interface MediaMessageProps {
  message: Message;
}

export default function MediaMessage({ message }: MediaMessageProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (message.message_type === 'audio' || message.message_type === 'video') {
    return (
      <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-2 min-w-[200px]">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon 
            name={message.message_type === 'audio' ? 'Volume2' : 'Video'} 
            size={20} 
            className="text-primary" 
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {message.message_type === 'audio' ? 'Голосовое сообщение' : 'Видео'}
          </p>
          {message.media_duration && (
            <p className="text-xs text-muted-foreground">
              {formatDuration(message.media_duration)}
            </p>
          )}
        </div>
        {message.media_url && (
          message.message_type === 'audio' ? (
            <audio src={message.media_url} controls className="max-w-[200px]" />
          ) : (
            <video 
              src={message.media_url} 
              controls 
              poster={message.media_thumbnail}
              className="max-w-[300px] rounded-lg"
            />
          )
        )}
      </div>
    );
  }

  if (message.message_type === 'image') {
    return (
      <div className="max-w-[300px]">
        {message.media_url && (
          <img 
            src={message.media_url} 
            alt="Изображение"
            className="rounded-lg w-full"
          />
        )}
      </div>
    );
  }

  if (message.message_type === 'sticker') {
    return (
      <div className="w-32 h-32">
        {message.media_url && (
          <img 
            src={message.media_url} 
            alt="Стикер"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    );
  }

  return <p className="text-sm">{message.text}</p>;
}
