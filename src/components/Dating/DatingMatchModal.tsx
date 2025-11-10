import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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

interface DatingMatchModalProps {
  matchedProfile: DatingProfile;
  onClose: () => void;
  onNavigateToChats?: () => void;
}

export default function DatingMatchModal({ 
  matchedProfile, 
  onClose, 
  onNavigateToChats 
}: DatingMatchModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-8 text-center text-white">
            <div className="mb-4 animate-bounce">
              <Icon name="Heart" size={64} className="mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Это взаимность! 🎉</h2>
            <p className="text-lg opacity-90">
              Вы понравились друг другу с {matchedProfile.name}
            </p>
          </div>
          
          <div className="p-6 text-center space-y-4">
            <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg -mt-16">
              <AvatarImage src={matchedProfile.photos?.[0]} />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-pink-200 to-purple-200">
                {matchedProfile.name[0]}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-xl font-semibold mb-1">
                {matchedProfile.name}, {matchedProfile.age}
              </h3>
              {matchedProfile.location && (
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  {matchedProfile.location}
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Продолжить смотреть
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => {
                  onClose();
                  if (onNavigateToChats) {
                    onNavigateToChats();
                  }
                }}
              >
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Написать
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
