import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReelsFeed, toggleReelLike, recordReelView } from '@/lib/reelsApi';
import type { Reel } from '@/types/chat';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ReelCommentsModal from '@/components/reels/ReelCommentsModal';

export default function Reels() {
  const navigate = useNavigate();
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    loadReels();
  }, []);

  const loadReels = async () => {
    try {
      const data = await getReelsFeed(20, 0);
      setReels(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load reels:', error);
      toast.error('Не удалось загрузить Reels');
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play();
      
      if (reels[currentIndex]) {
        recordReelView(reels[currentIndex].id);
      }

      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentIndex) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [currentIndex, reels]);

  const handleScroll = useCallback((direction: 'up' | 'down') => {
    if (isScrolling.current) return;
    
    isScrolling.current = true;
    
    if (direction === 'down' && currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, [currentIndex, reels.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleScroll('down');
      } else {
        handleScroll('up');
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleScroll('down');
    } else {
      handleScroll('up');
    }
  };

  const handleLike = async (reelId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const result = await toggleReelLike(reelId);
      
      setReels(prev => prev.map(reel =>
        reel.id === reelId
          ? { ...reel, is_liked: result.is_liked, likes_count: result.likes_count }
          : reel
      ));
    } catch (error) {
      console.error('Failed to toggle like:', error);
      toast.error('Не удалось поставить лайк');
    }
  };

  const handleDoubleClick = (reelId: number) => {
    const reel = reels.find(r => r.id === reelId);
    if (reel && !reel.is_liked) {
      handleLike(reelId, {} as React.MouseEvent);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin text-white" size={32} />
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white p-4">
        <Icon name="Film" size={64} className="mb-4 opacity-50" />
        <h2 className="text-xl font-semibold mb-2">Пока нет Reels</h2>
        <p className="text-gray-400 text-center">Будьте первым, кто загрузит видео!</p>
      </div>
    );
  }

  const currentReel = reels[currentIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-4 left-4 z-50 flex items-center space-x-3">
        <button
          onClick={() => navigate('/chat')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <button
          onClick={() => navigate('/reels/create')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <Icon name="Plus" size={24} />
        </button>
      </div>
      <div
        className="h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`
        }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="h-screen w-full relative flex items-center justify-center"
            onDoubleClick={() => handleDoubleClick(reel.id)}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              src={reel.video_url}
              className="w-full h-full object-contain"
              loop
              playsInline
              muted={false}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
              <div className="flex items-center space-x-3">
                <img
                  src={reel.avatar_url || '/placeholder.svg'}
                  alt={reel.username}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-white font-semibold">{reel.username}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-4 right-20 z-10">
              {reel.description && (
                <p className="text-white text-sm mb-2">{reel.description}</p>
              )}
              <div className="flex items-center space-x-4 text-white text-xs">
                <span className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{reel.views_count}</span>
                </span>
              </div>
            </div>

            <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6 z-10">
              <button
                onClick={(e) => handleLike(reel.id, e)}
                className="flex flex-col items-center space-y-1"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reel.is_liked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <Icon 
                    name="Heart" 
                    size={24} 
                    className={reel.is_liked ? 'text-white fill-white' : 'text-white'}
                  />
                </div>
                <span className="text-white text-xs font-semibold">{reel.likes_count}</span>
              </button>

              <button
                onClick={() => setShowComments(true)}
                className="flex flex-col items-center space-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon name="MessageCircle" size={24} className="text-white" />
                </div>
                <span className="text-white text-xs font-semibold">{reel.comments_count}</span>
              </button>

              <button className="flex flex-col items-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon name="Share2" size={24} className="text-white" />
                </div>
              </button>
            </div>

            {currentIndex < reels.length - 1 && (
              <button
                onClick={() => handleScroll('down')}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors"
              >
                <Icon name="ChevronDown" size={32} />
              </button>
            )}
            
            {currentIndex > 0 && (
              <button
                onClick={() => handleScroll('up')}
                className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors"
              >
                <Icon name="ChevronUp" size={32} />
              </button>
            )}
          </div>
        ))}
      </div>

      {showComments && currentReel && (
        <ReelCommentsModal
          reelId={currentReel.id}
          onClose={() => setShowComments(false)}
          onCommentAdded={() => {
            setReels(prev => prev.map(r =>
              r.id === currentReel.id
                ? { ...r, comments_count: r.comments_count + 1 }
                : r
            ));
          }}
        />
      )}
    </div>
  );
}