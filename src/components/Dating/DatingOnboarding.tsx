import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DatingOnboardingProps {
  onCreateProfile: () => void;
}

export default function DatingOnboarding({ onCreateProfile }: DatingOnboardingProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Начни знакомиться!</h2>
            <p className="text-muted-foreground">
              Создай анкету и находи интересных людей
            </p>
          </div>
          <Button 
            onClick={onCreateProfile}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Создать анкету
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
