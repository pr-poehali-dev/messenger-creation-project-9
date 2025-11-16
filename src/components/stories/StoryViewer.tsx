import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const STORIES_URL = 'https://functions.poehali.dev/17805d36-3b7d-454a-a234-d68790671878';

interface StoryItem {
  id: number;
  user_id: number;
  username: string;
  avatar_url: string | null;
  media_url: string;
  media_type: string;
  caption: string | null;
  background_color: string | null;
  font_style: string | null;
  duration: number;
  views_count: number;
  created_at: string;
  is_viewed: boolean;
}

interface StoryViewerProps {
  userId: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const reactions = ['❤️', '😂', '😮', '😢', '👏', '🔥'];

export default function StoryViewer({ userId, onClose, onNext, onPrev }: StoryViewerProps) {
  const { user } = useAuth();
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    loadUserStories();
  }, [userId]);

  useEffect(() => {
    if (stories.length > 0 && !isPaused) {
      startProgress();
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, stories, isPaused]);

  useEffect(() => {
    if (stories[currentIndex]) {
      markAsViewed(stories[currentIndex].id);
    }
  }, [currentIndex, stories]);

  const loadUserStories = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch(`${STORIES_URL}?action=user&user_id=${userId}`, {
        method: 'GET',
        headers: {
          'X-Auth-Token': authData.token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStories(data.stories || []);
      }
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = async (storyId: number) => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      await fetch(`${STORIES_URL}?action=view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authData.token
        },
        body: JSON.stringify({ story_id: storyId })
      });
    } catch (error) {
      console.error('Failed to mark as viewed:', error);
    }
  };

  const startProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    setProgress(0);
    const duration = (stories[currentIndex]?.duration || 5) * 1000;
    const updateInterval = 50;
    const increment = (updateInterval / duration) * 100;

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          handleNext();
          return 0;
        }
        return newProgress;
      });
    }, updateInterval);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    } else {
      onPrev();
    }
  };

  const handleReaction = async (reaction: string) => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      await fetch(`${STORIES_URL}?action=react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authData.token
        },
        body: JSON.stringify({
          story_id: stories[currentIndex].id,
          reaction
        })
      });

      toast.success('Реакция отправлена!');
      setShowReactions(false);
    } catch (error) {
      toast.error('Ошибка отправки реакции');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        handlePrev();
      } else if (deltaX < -50) {
        handleNext();
      }
    } else if (deltaY > 100) {
      onClose();
    }

    setIsPaused(false);
  };

  const handleDownload = async () => {
    const currentStory = stories[currentIndex];
    if (!currentStory) return;

    try {
      const response = await fetch(currentStory.media_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const extension = currentStory.media_type === 'video' ? 'mp4' : 'jpg';
      link.download = `story_${currentStory.username}_${Date.now()}.${extension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Story сохранена в галерею!');
    } catch (error) {
      toast.error('Ошибка сохранения');
      console.error('Download error:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-white" />
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Нет историй</p>
          <Button onClick={onClose} variant="outline">Закрыть</Button>
        </div>
      </div>
    );
  }

  const currentStory = stories[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <div className="absolute top-0 left-0 right-0 z-10 p-2 md:p-2.5 flex gap-1 safe-top">
          {stories.map((_, idx) => (
            <div key={idx} className="flex-1 h-0.5 md:h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-50"
                style={{
                  width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-3 md:top-4 left-0 right-0 z-10 px-3 md:px-4 flex items-center justify-between safe-top">
          <div className="flex items-center gap-2 md:gap-3">
            <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-white">
              <AvatarImage src={currentStory.avatar_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs md:text-sm">
                {currentStory.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-semibold text-xs md:text-sm">{currentStory.username}</p>
              <p className="text-white/70 text-[10px] md:text-xs">
                {new Date(currentStory.created_at).toLocaleDateString('ru', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="text-white hover:bg-white/20 h-9 w-9 md:h-10 md:w-10 touch-manipulation"
            >
              <Icon name="Download" size={18} className="md:w-5 md:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="text-white hover:bg-white/20 h-9 w-9 md:h-10 md:w-10 touch-manipulation"
            >
              <Icon name={isPaused ? 'Play' : 'Pause'} size={18} className="md:w-5 md:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-9 w-9 md:h-10 md:w-10 touch-manipulation"
            >
              <Icon name="X" size={18} className="md:w-5 md:h-5" />
            </Button>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center bg-black">
          {currentStory.media_type === 'video' ? (
            <video
              src={currentStory.media_url}
              className="w-full h-full object-contain"
              autoPlay
              loop={false}
              playsInline
              onEnded={handleNext}
            />
          ) : (
            <img
              src={currentStory.media_url}
              alt="Story"
              className="w-full h-full object-contain"
              style={currentStory.background_color ? { backgroundColor: currentStory.background_color } : {}}
            />
          )}
        </div>

        {currentStory.caption && (
          <div className="absolute bottom-20 md:bottom-24 left-0 right-0 px-4 md:px-6 safe-bottom">
            <p className="text-white text-center text-xs md:text-sm drop-shadow-lg">
              {currentStory.caption}
            </p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/60 to-transparent safe-bottom">
          {showReactions ? (
            <div className="flex gap-2 md:gap-3 justify-center mb-3 md:mb-4 bg-black/80 rounded-full px-4 md:px-6 py-2.5 md:py-3">
              {reactions.map((reaction) => (
                <button
                  key={reaction}
                  onClick={() => handleReaction(reaction)}
                  className="text-2xl md:text-3xl hover:scale-125 active:scale-110 transition-transform touch-manipulation"
                >
                  {reaction}
                </button>
              ))}
            </div>
          ) : null}

          {userId !== user?.id && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReactions(!showReactions)}
                className="text-white hover:bg-white/20 shrink-0 h-10 w-10 md:h-11 md:w-11 touch-manipulation"
              >
                <Icon name="Heart" size={20} className="md:w-6 md:h-6" />
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder="Ответить..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 pr-10 md:pr-12 h-10 md:h-11 text-sm md:text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && replyText.trim()) {
                      toast.success('Ответ отправлен!');
                      setReplyText('');
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (replyText.trim()) {
                      toast.success('Ответ отправлен!');
                      setReplyText('');
                    }
                  }}
                  className="absolute right-0 top-0 text-white hover:bg-white/20 h-10 w-10 md:h-11 md:w-11 touch-manipulation"
                >
                  <Icon name="Send" size={18} className="md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full"
        />
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full"
        />
      </div>
    </div>
  );
}