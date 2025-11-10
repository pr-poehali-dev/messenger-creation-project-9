import { useState, useEffect } from 'react';
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

interface DatingProps {
  currentUser: User;
  onNavigateToChats?: () => void;
}

export default function Dating({ currentUser, onNavigateToChats }: DatingProps) {
  const [hasProfile, setHasProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<DatingProfile | null>(null);
  const [profiles, setProfiles] = useState<DatingProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<DatingProfile | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'matches'>('feed');
  const [matches, setMatches] = useState<DatingProfile[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
    interests: '',
    location: ''
  });

  useEffect(() => {
    checkProfile();
    loadProfiles();
    loadMatches();
  }, []);

  const checkProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({ action: 'dating_profile_get' })
      });
      if (response.ok) {
        const profile = await response.json();
        setHasProfile(true);
        setCurrentProfile(profile);
      }
    } catch (err) {
      console.error('Failed to check profile:', err);
    }
  };

  const loadProfiles = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({ action: 'dating_feed' })
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (err) {
      console.error('Failed to load profiles:', err);
    }
  };

  const loadMatches = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({ action: 'dating_matches' })
      });
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          action: 'dating_profile_create',
          ...formData,
          age: parseInt(formData.age),
          interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean)
        })
      });
      
      if (response.ok) {
        setShowForm(false);
        checkProfile();
        loadProfiles();
      }
    } catch (err) {
      console.error('Failed to create profile:', err);
    }
  };

  const handleSwipe = async (action: 'like' | 'dislike' | 'superlike') => {
    const profile = profiles[currentIndex];
    if (!profile) return;

    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          action: 'dating_swipe',
          to_user_id: profile.user_id,
          swipe_action: action
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.matched) {
          setMatchedProfile(profile);
          setShowMatchModal(true);
        }
        setCurrentIndex(prev => prev + 1);
      }
    } catch (err) {
      console.error('Failed to swipe:', err);
    }
  };

  if (!hasProfile && !showForm) {
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
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Создать анкету
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Создание анкеты</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    placeholder="Мужской/Женский"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">О себе</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Расскажи о себе..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Интересы</label>
                <Input
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  placeholder="Путешествия, музыка, спорт (через запятую)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Город</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
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

  const currentCard = profiles[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="flex justify-center gap-2 p-4 bg-white/50 backdrop-blur-sm border-b">
        <Button
          variant={activeTab === 'feed' ? 'default' : 'ghost'}
          className={activeTab === 'feed' ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}
          onClick={() => setActiveTab('feed')}
        >
          <Icon name="Heart" size={18} className="mr-2" />
          Знакомства
        </Button>
        <Button
          variant={activeTab === 'matches' ? 'default' : 'ghost'}
          className={activeTab === 'matches' ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}
          onClick={() => setActiveTab('matches')}
        >
          <Icon name="Sparkles" size={18} className="mr-2" />
          Мои матчи ({matches.length})
        </Button>
      </div>

      {activeTab === 'matches' ? (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {matches.length === 0 ? (
              <Card className="text-center p-12">
                <Icon name="HeartCrack" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Пока нет матчей</h3>
                <p className="text-muted-foreground mb-4">Начни знакомиться, чтобы найти совпадения!</p>
                <Button onClick={() => setActiveTab('feed')} variant="outline">
                  Смотреть анкеты
                </Button>
              </Card>
            ) : (
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
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
        {currentCard ? (
          <Card className="overflow-hidden shadow-2xl">
            <div className="relative h-96 bg-gradient-to-br from-pink-200 to-purple-200">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage src={currentCard.photos?.[0]} />
                <AvatarFallback className="text-6xl rounded-none">
                  {currentCard.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-3xl font-bold mb-1">
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

            <CardContent className="p-6">
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full w-16 h-16 border-2 hover:bg-red-50 hover:border-red-500"
                  onClick={() => handleSwipe('dislike')}
                >
                  <Icon name="X" size={28} className="text-red-500" />
                </Button>
                
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                  onClick={() => handleSwipe('superlike')}
                >
                  <Icon name="Star" size={28} className="text-white" />
                </Button>
                
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => handleSwipe('like')}
                >
                  <Icon name="Heart" size={28} className="text-white" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center p-12">
            <Icon name="UserX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Анкеты закончились</h3>
            <p className="text-muted-foreground mb-4">Попробуй зайти позже</p>
            <Button onClick={loadProfiles} variant="outline">
              Обновить
            </Button>
          </Card>
        )}
          </div>
        </div>
      )}

      {showMatchModal && matchedProfile && (
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
                    onClick={() => {
                      setShowMatchModal(false);
                      setMatchedProfile(null);
                    }}
                  >
                    Продолжить смотреть
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    onClick={() => {
                      setShowMatchModal(false);
                      setMatchedProfile(null);
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
      )}
    </div>
  );
}