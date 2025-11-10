import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface DatingProfileFormProps {
  formData: {
    name: string;
    age: string;
    gender: string;
    bio: string;
    interests: string;
    location: string;
  };
  onFormDataChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function DatingProfileForm({ 
  formData, 
  onFormDataChange, 
  onSubmit, 
  onClose 
}: DatingProfileFormProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-2 sm:p-4">
      <Card className="w-full max-w-2xl mx-2">
        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Создание анкеты</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя</label>
              <Input
                value={formData.name}
                onChange={(e) => onFormDataChange({...formData, name: e.target.value})}
                placeholder="Как тебя зовут?"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Возраст</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => onFormDataChange({...formData, age: e.target.value})}
                  placeholder="18"
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Пол</label>
                <Input
                  value={formData.gender}
                  onChange={(e) => onFormDataChange({...formData, gender: e.target.value})}
                  placeholder="Мужской/Женский"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">О себе</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => onFormDataChange({...formData, bio: e.target.value})}
                placeholder="Расскажи о себе..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Интересы</label>
              <Input
                value={formData.interests}
                onChange={(e) => onFormDataChange({...formData, interests: e.target.value})}
                placeholder="Путешествия, музыка, спорт (через запятую)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Город</label>
              <Input
                value={formData.location}
                onChange={(e) => onFormDataChange({...formData, location: e.target.value})}
                placeholder="Москва"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Сохранить анкету
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}