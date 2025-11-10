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

interface DatingMatchesProps {
  matches: DatingProfile[];
  onNavigateToFeed: () => void;
  onNavigateToChats?: () => void;
}

export default function DatingMatches({ matches, onNavigateToFeed, onNavigateToChats }: DatingMatchesProps) {
  if (matches.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-12">
            <Icon name="HeartCrack" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Пока нет матчей</h3>
            <p className="text-muted-foreground mb-4">Начни знакомиться, чтобы найти совпадения!</p>
            <Button onClick={onNavigateToFeed} variant="outline">
              Смотреть анкеты
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-64 bg-gradient-to-br from-pink-200 to-purple-200">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage src={match.photos?.[0]} />
                  <AvatarFallback className="text-4xl rounded-none">
                    {match.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                    <Icon name="Heart" size={14} className="mr-1" />
                    Матч
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-1">
                  {match.name}, {match.age}
                </h3>
                {match.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Icon name="MapPin" size={14} />
                    {match.location}
                  </div>
                )}
                {match.bio && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{match.bio}</p>
                )}
                {match.interests && match.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {match.interests.slice(0, 3).map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => onNavigateToChats && onNavigateToChats()}
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
