import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { Story } from '@/types';

interface StoriesBarProps {
  stories: Story[];
  currentUserId: number;
  onStoryClick: (story: Story) => void;
  onCreateStory: () => void;
}

export default function StoriesBar({ stories, currentUserId, onStoryClick, onCreateStory }: StoriesBarProps) {
  const myStories = stories.filter(s => s.user_id === currentUserId);
  const otherStories = stories.filter(s => s.user_id !== currentUserId);

  return (
    <div className="flex items-center gap-4 p-4 border-b border-border overflow-x-auto scrollbar-hide touch-pan-x">
      <div className="flex flex-col items-center gap-2 min-w-[80px] md:min-w-[72px] cursor-pointer group active:scale-95" onClick={onCreateStory}>
        <div className="relative">
          <Avatar className="w-20 h-20 md:w-16 md:h-16 border-2 border-primary">
            <AvatarImage src="" />
            <AvatarFallback className="gradient-primary text-white font-semibold text-lg">
              Вы
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-7 h-7 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background group-hover:scale-110 transition-transform">
            <Icon name="Plus" size={14} className="text-white" />
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Добавить</span>
      </div>

      {myStories.length > 0 && myStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 min-w-[80px] md:min-w-[72px] cursor-pointer group active:scale-95"
          onClick={() => onStoryClick(story)}
        >
          <div className="relative">
            <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-primary to-accent p-0.5">
              <Avatar className="w-full h-full border-2 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="gradient-primary text-white font-semibold text-lg">
                  {story.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-xs text-foreground font-medium truncate max-w-[72px]">Моя история</span>
        </div>
      ))}

      {otherStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 min-w-[80px] md:min-w-[72px] cursor-pointer group active:scale-95"
          onClick={() => onStoryClick(story)}
        >
          <div className="relative">
            <div className={`w-20 h-20 md:w-16 md:h-16 rounded-full p-0.5 ${story.viewed ? 'bg-muted' : 'bg-gradient-to-tr from-primary to-accent'}`}>
              <Avatar className="w-full h-full border-2 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="gradient-primary text-white font-semibold text-lg">
                  {story.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-xs text-foreground truncate max-w-[72px]">{story.username}</span>
        </div>
      ))}
    </div>
  );
}