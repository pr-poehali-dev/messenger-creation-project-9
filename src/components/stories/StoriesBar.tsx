import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const STORIES_URL = 'https://functions.poehali.dev/17805d36-3b7d-454a-a234-d68790671878';

interface Story {
  id: number;
  user_id: number;
  username: string;
  avatar_url: string | null;
  media_url: string;
  is_viewed: boolean;
  stories_count: number;
  created_at: string;
}

interface StoriesBarProps {
  onStoryClick: (userId: number) => void;
  onAddStory: () => void;
}

export default function StoriesBar({ onStoryClick, onAddStory }: StoriesBarProps) {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
    const interval = setInterval(loadStories, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStories = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch(`${STORIES_URL}?action=all`, {
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

  const myStory = stories.find(s => s.user_id === user?.id);
  const otherStories = stories.filter(s => s.user_id !== user?.id);

  return (
    <div className="border-b bg-background">
      <ScrollArea className="w-full">
        <div className="flex gap-3 md:gap-4 p-3 md:p-4">
          <div className="flex flex-col items-center gap-1.5 md:gap-2 min-w-[64px] md:min-w-[72px]">
            <button
              onClick={onAddStory}
              className="relative group touch-manipulation"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full p-[2.5px] md:p-[3px] ${
                myStory 
                  ? myStory.is_viewed 
                    ? 'bg-gray-300' 
                    : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
                  : 'bg-gray-200'
              }`}>
                <div className="w-full h-full bg-white rounded-full p-[2px]">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={user?.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm md:text-base">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <Icon name="Plus" size={12} className="text-primary-foreground" />
              </div>
            </button>
            <p className="text-[10px] md:text-xs text-center truncate w-full">
              {myStory ? 'Моя история' : 'Добавить'}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center flex-1 py-4">
              <Icon name="Loader2" size={20} className="animate-spin text-muted-foreground" />
            </div>
          ) : otherStories.length === 0 ? (
            <div className="flex items-center justify-center flex-1 py-4">
              <p className="text-xs md:text-sm text-muted-foreground">Нет новых историй</p>
            </div>
          ) : (
            <>
              {otherStories.map((story) => (
                <div
                  key={story.user_id}
                  className="flex flex-col items-center gap-1.5 md:gap-2 min-w-[64px] md:min-w-[72px] cursor-pointer touch-manipulation"
                  onClick={() => onStoryClick(story.user_id)}
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full p-[2.5px] md:p-[3px] ${
                    story.is_viewed 
                      ? 'bg-gray-300' 
                      : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
                  }`}>
                    <div className="w-full h-full bg-white rounded-full p-[2px]">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={story.avatar_url || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm md:text-base">
                          {story.username?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-xs text-center truncate w-full">{story.username}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}