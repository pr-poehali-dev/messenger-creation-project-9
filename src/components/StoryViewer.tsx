import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import type { Story, StoryItem } from '@/types';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  currentUserId: number;
  onClose: () => void;
  onDeleteStory: (storyId: number) => void;
  onReplyToStory?: (userId: number, username: string, message: string) => void;
}

export default function StoryViewer({ 
  stories, 
  initialStoryIndex, 
  currentUserId,
  onClose,
  onDeleteStory,
  onReplyToStory
}: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items[currentItemIndex];
  const isVideo = currentItem?.type === 'video';
  const isMyStory = currentStory?.user_id === currentUserId;

  const STORY_DURATION = 5000;

  useEffect(() => {
    if (!currentItem || isPaused) return;

    setProgress(0);

    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      return;
    }

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        goToNext();
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentItemIndex, currentStoryIndex, isPaused]);

  const goToNext = () => {
    if (currentItemIndex < currentStory.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentItemIndex(0);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      const prevStory = stories[currentStoryIndex - 1];
      setCurrentItemIndex(prevStory.items.length - 1);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleVideoEnded = () => {
    goToNext();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickPosition = x / rect.width;

    if (clickPosition < 0.3) {
      goToPrev();
    } else if (clickPosition > 0.7) {
      goToNext();
    }
  };

  const handleDeleteStory = () => {
    onDeleteStory(currentStory.id);
  };

  const handleSendReply = () => {
    if (replyText.trim() && onReplyToStory && !isMyStory) {
      onReplyToStory(currentStory.user_id, currentStory.username, replyText);
      setReplyText('');
      setShowReplyInput(false);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  if (!currentStory || !currentItem) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="gradient-primary text-white font-semibold">
              {currentStory.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <div className="font-semibold">{currentStory.username}</div>
            <div className="text-xs text-white/70">
              {new Date(currentItem.created_at).toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setIsPaused(!isPaused)}
          >
            <Icon name={isPaused ? 'Play' : 'Pause'} size={20} />
          </Button>
          {isMyStory && (
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={handleDeleteStory}
            >
              <Icon name="Trash2" size={20} />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <Icon name="X" size={24} />
          </Button>
        </div>
      </div>

      <div className="absolute top-16 left-4 right-4 z-10 flex gap-1">
        {currentStory.items.map((_, idx) => (
          <div key={idx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all"
              style={{
                width: idx < currentItemIndex ? '100%' : idx === currentItemIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="relative w-full max-w-md h-full max-h-[80vh] bg-black flex items-center justify-center cursor-pointer"
        onClick={handleClick}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={currentItem.url}
            className="w-full h-full object-contain"
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            playsInline
          />
        ) : (
          <img
            src={currentItem.url}
            alt="Story"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {(currentStoryIndex > 0 || currentItemIndex > 0) && (
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={goToPrev}
          >
            <Icon name="ChevronLeft" size={32} />
          </Button>
        )}
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        {(currentStoryIndex < stories.length - 1 || currentItemIndex < currentStory.items.length - 1) && (
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={goToNext}
          >
            <Icon name="ChevronRight" size={32} />
          </Button>
        )}
      </div>

      {!isMyStory && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
          {showReplyInput ? (
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full p-2 border border-white/20">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ответить ${currentStory.username}...`}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
              />
              <Button
                size="icon"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="rounded-full bg-white/20 hover:bg-white/30 text-white h-9 w-9 flex-shrink-0"
              >
                <Icon name="Send" size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyText('');
                }}
                className="rounded-full text-white hover:bg-white/20 h-9 w-9 flex-shrink-0"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowReplyInput(true)}
              className="w-full rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/20"
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Ответить {currentStory.username}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}