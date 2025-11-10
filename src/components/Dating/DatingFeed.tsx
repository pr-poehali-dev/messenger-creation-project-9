import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface DatingProfile {
  id: number;
  user_id: number;
  name: string;
  age: number;
  gender?: string;
  bio?: string;
  interests?: string[];
  location?: string;
  photos?: string[];
  is_active: boolean;
}

interface DatingFeedProps {
  currentCard: DatingProfile | null;
  onSwipe: (action: 'like' | 'dislike' | 'superlike') => void;
  onReload: () => void;
}

export default function DatingFeed({ currentCard, onSwipe, onReload }: DatingFeedProps) {
  if (!currentCard) {
    return (
      <div className="w-full max-w-md mx-auto px-2">
        <Card className="text-center p-6 sm:p-12">
          <Icon name="UserX" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Анкеты закончились</h3>
          <p className="text-muted-foreground mb-4">Попробуй зайти позже</p>
          <Button onClick={onReload} variant="outline">
            Обновить
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-2">
      <Card className="overflow-hidden shadow-2xl">
        <div className="relative h-[70vh] sm:h-96 bg-gradient-to-br from-pink-200 to-purple-200">
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage src={currentCard.photos?.[0]} />
            <AvatarFallback className="text-6xl rounded-none">
              {currentCard.name[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 text-white">
            <h3 className="text-xl sm:text-3xl font-bold mb-1">
              {currentCard.name}, {currentCard.age}
            </h3>
            {currentCard.location && (
              <div className="flex items-center gap-1 text-sm mb-3">
                <Icon name="MapPin" size={16} />
                {currentCard.location}
              </div>
            )}
            {currentCard.bio && (
              <p className="text-sm mb-3">{currentCard.bio}</p>
            )}
            {currentCard.interests && currentCard.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentCard.interests.map((interest, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-0">
                    {interest}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-3 sm:p-6">
          <div className="flex justify-center gap-2 sm:gap-4">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-14 h-14 sm:w-16 sm:h-16 border-2 hover:bg-red-50 hover:border-red-500"
              onClick={() => onSwipe('dislike')}
            >
              <Icon name="X" size={24} className="text-red-500 sm:w-7 sm:h-7" />
            </Button>
            
            <Button
              size="lg"
              className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
              onClick={() => onSwipe('superlike')}
            >
              <Icon name="Star" size={24} className="text-white sm:w-7 sm:h-7" />
            </Button>
            
            <Button
              size="lg"
              className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => onSwipe('like')}
            >
              <Icon name="Heart" size={24} className="text-white sm:w-7 sm:h-7" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}