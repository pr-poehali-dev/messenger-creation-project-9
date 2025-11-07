import { useState } from 'react';
import type { Story, User } from '@/types';

export function useStories(user: User | null) {
  const [stories, setStories] = useState<Story[]>([]);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const loadStories = async () => {
    const mockStories: Story[] = [
      {
        id: 1,
        user_id: user?.id || 0,
        username: user?.username || 'You',
        avatar: user?.avatar || '',
        viewed: false,
        items: []
      },
      {
        id: 2,
        user_id: 2,
        username: 'Алексей',
        avatar: 'АЛ',
        viewed: false,
        items: [
          {
            id: 1,
            url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
            type: 'image',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            url: 'https://images.unsplash.com/photo-1682687221038-404cb8830901',
            type: 'image',
            created_at: new Date().toISOString()
          }
        ]
      },
      {
        id: 3,
        user_id: 3,
        username: 'Мария',
        avatar: 'МА',
        viewed: true,
        items: [
          {
            id: 3,
            url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
            type: 'image',
            created_at: new Date().toISOString()
          }
        ]
      }
    ];
    setStories(mockStories);
  };

  const handleStoryClick = (story: Story) => {
    const storyIndex = stories.findIndex(s => s.id === story.id);
    setCurrentStoryIndex(storyIndex);
    setShowStoryViewer(true);
  };

  const handleCreateStory = async (files: File[]) => {
    if (!user) return;

    const newItems = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' as const : 'image' as const,
      created_at: new Date().toISOString()
    }));

    const myStory = stories.find(s => s.user_id === user.id);
    
    if (myStory && myStory.items.length > 0) {
      setStories(prev => prev.map(s => 
        s.user_id === user.id 
          ? { ...s, items: [...s.items, ...newItems] }
          : s
      ));
    } else {
      setStories(prev => [
        {
          id: Date.now(),
          user_id: user.id,
          username: user.username,
          avatar: user.avatar,
          viewed: false,
          items: newItems
        },
        ...prev.filter(s => s.user_id !== user.id)
      ]);
    }
  };

  const handleDeleteStory = (storyId: number) => {
    setStories(prev => prev.filter(s => s.id !== storyId));
    setShowStoryViewer(false);
  };

  return {
    stories,
    showStoryViewer,
    setShowStoryViewer,
    currentStoryIndex,
    loadStories,
    handleStoryClick,
    handleCreateStory,
    handleDeleteStory,
  };
}
