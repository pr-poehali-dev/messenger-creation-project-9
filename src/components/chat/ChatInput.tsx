import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import VoiceRecorder from './VoiceRecorder';

interface ChatInputProps {
  newMessage: string;
  uploading: boolean;
  isRecording: boolean;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVoiceRecord: () => void;
  onVoiceComplete: (audioBlob: Blob, duration: number) => void;
  onVoiceCancel: () => void;
}

export default function ChatInput({
  newMessage,
  uploading,
  isRecording,
  onMessageChange,
  onSend,
  onFileSelect,
  onVoiceRecord,
  onVoiceComplete,
  onVoiceCancel,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t p-3 md:p-4 bg-background shrink-0 safe-area-bottom">
      {isRecording ? (
        <VoiceRecorder 
          onRecordComplete={onVoiceComplete}
          onCancel={onVoiceCancel}
        />
      ) : (
        <form onSubmit={onSend} className="flex gap-2 items-center">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={onFileSelect}
            accept="image/*,application/pdf,.doc,.docx,.txt"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Paperclip" size={20} />
            )}
          </Button>
          <Input
            placeholder="Сообщение..."
            value={newMessage}
            onChange={onMessageChange}
            className="flex-1"
            disabled={uploading}
          />
          <Button type="button" variant="ghost" size="icon" className="hidden md:flex h-10 w-10 shrink-0">
            <Icon name="Smile" size={20} />
          </Button>
          {newMessage.trim() ? (
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0" disabled={uploading}>
              <Icon name="Send" size={20} />
            </Button>
          ) : (
            <Button 
              type="button" 
              size="icon" 
              className="h-10 w-10 shrink-0" 
              onClick={onVoiceRecord}
              disabled={uploading}
            >
              <Icon name="Mic" size={20} />
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
