import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import VoiceRecorder from '@/components/VoiceRecorder';

type ChatInputProps = {
  messageText: string;
  onMessageTextChange: (value: string) => void;
  onSendMessage: () => void;
  showStickers: boolean;
  onToggleStickers: () => void;
  stickers: string[];
  onStickerClick: (sticker: string) => void;
  showVoiceRecorder: boolean;
  onToggleVoiceRecorder: () => void;
  onVoiceRecordingComplete: (audioBlob: Blob, duration: number) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export default function ChatInput({
  messageText,
  onMessageTextChange,
  onSendMessage,
  showStickers,
  onToggleStickers,
  stickers,
  onStickerClick,
  showVoiceRecorder,
  onToggleVoiceRecorder,
  onVoiceRecordingComplete,
  onFileSelect,
  fileInputRef
}: ChatInputProps) {
  return (
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
          onChange={onFileSelect}
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
              onRecordingComplete={onVoiceRecordingComplete}
              onCancel={onToggleVoiceRecorder}
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
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 md:h-8 md:w-8"
                  onClick={onToggleVoiceRecorder}
                >
                  <Icon name="Mic" size={20} />
                </Button>
              )}
            </div>
            {messageText.trim() && (
              <Button
                size="icon"
                className="rounded-full h-12 w-12 md:h-10 md:w-10 gradient-primary"
                onClick={onSendMessage}
              >
                <Icon name="Send" size={20} />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
