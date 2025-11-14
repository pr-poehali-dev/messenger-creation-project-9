import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import StoryViewer from '@/components/stories/StoryViewer';

const STORIES_URL = 'https://functions.poehali.dev/17805d36-3b7d-454a-a234-d68790671878';

interface MentionStory {
  id: number;
  user_id: number;
  username: string;
  avatar_url: string | null;
  media_url: string;
  media_type: string;
  caption: string | null;
  created_at: string;
}

export default function Mentions() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<MentionStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showStoryViewer, setShowStoryViewer] = useState(false);

  useEffect(() => {
    loadMentions();
  }, []);

  const loadMentions = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch(`${STORIES_URL}?action=mentions`, {
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
      console.error('Failed to load mentions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStoryClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowStoryViewer(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/chat')}
            className="shrink-0"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Упоминания</h1>
            <p className="text-sm text-muted-foreground">
              {stories.length} {stories.length === 1 ? 'упоминание' : 'упоминаний'}
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
          </div>
        ) : stories.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="AtSign" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Нет упоминаний</p>
            <p className="text-xs text-muted-foreground mt-1">
              Когда вас упомянут в историях, они появятся здесь
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {stories.map((story) => (
              <div
                key={story.id}
                className="p-4 cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted/70"
                onClick={() => handleStoryClick(story.user_id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage src={story.avatar_url || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {story.username?.[0]?.toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <Icon name="AtSign" size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{story.username}</p>
                    <p className="text-xs text-muted-foreground">
                      Упомянул вас в истории
                    </p>
                    {story.caption && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {story.caption}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(story.created_at).toLocaleDateString('ru', { 
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {story.media_type === 'text' ? (
                      <div 
                        className="w-12 h-16 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: story.media_url || '#FF6B6B' }}
                      >
                        Aa
                      </div>
                    ) : (
                      <img
                        src={story.media_url}
                        alt="Story preview"
                        className="w-12 h-16 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {showStoryViewer && selectedUserId && (
        <StoryViewer
          userId={selectedUserId}
          onClose={() => {
            setShowStoryViewer(false);
            setSelectedUserId(null);
            loadMentions();
          }}
          onNext={() => {}}
          onPrev={() => {}}
        />
      )}
    </div>
  );
}
