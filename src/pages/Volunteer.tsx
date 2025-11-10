import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Volunteer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    activities: [] as string[],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const activities = [
    { id: 'walking', label: 'Выгул собак' },
    { id: 'feeding', label: 'Кормление животных' },
    { id: 'cleaning', label: 'Уборка в приюте' },
    { id: 'transport', label: 'Транспортировка животных' },
    { id: 'events', label: 'Помощь на мероприятиях' },
    { id: 'foster', label: 'Временная передержка' },
    { id: 'photography', label: 'Фотосъёмка животных' },
    { id: 'social', label: 'Ведение соцсетей' }
  ];

  const handleActivityToggle = (activityId: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-4xl">
            ✅
          </div>
          <h2 className="text-3xl font-bold">Спасибо!</h2>
          <p className="text-muted-foreground">
            Ваша заявка принята. Мы свяжемся с вами в ближайшее время и расскажем о следующих шагах.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-2xl">
              🐾
            </div>
            <span className="font-bold text-xl">Добрые Лапки</span>
          </button>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-4xl">
                🤝
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Стать волонтёром</h1>
              <p className="text-lg text-muted-foreground">
                Присоединяйтесь к нашей команде и помогайте спасать жизни животных
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-orange-600" />
                </div>
                <h3 className="font-semibold">Команда</h3>
                <p className="text-sm text-muted-foreground">
                  Работайте вместе с единомышленниками
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-amber-600" />
                </div>
                <h3 className="font-semibold">Гибкий график</h3>
                <p className="text-sm text-muted-foreground">
                  Выбирайте удобное время для помощи
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-yellow-100 flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-yellow-600" />
                </div>
                <h3 className="font-semibold">Смысл</h3>
                <p className="text-sm text-muted-foreground">
                  Делайте мир добрее каждый день
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Возраст *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="16"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Опыт работы с животными</Label>
                  <Textarea
                    id="experience"
                    placeholder="Расскажите о вашем опыте: были ли у вас питомцы, работали ли вы с животными..."
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Чем вы хотите помогать? *</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={activity.id}
                          checked={formData.activities.includes(activity.id)}
                          onCheckedChange={() => handleActivityToggle(activity.id)}
                        />
                        <label
                          htmlFor={activity.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {activity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Дополнительная информация</Label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите о себе, своих увлечениях, почему хотите стать волонтёром..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Icon name="Send" size={20} />
                  Отправить заявку
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </div>
            </form>

            <div className="mt-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center">Что вас ждёт?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon name="GraduationCap" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Обучение</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы проведём инструктаж и расскажем всё о работе с животными
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Безопасность</h3>
                    <p className="text-sm text-muted-foreground">
                      Предоставим всё необходимое для безопасной работы
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon name="Calendar" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Гибкость</h3>
                    <p className="text-sm text-muted-foreground">
                      Помогайте в удобное для вас время, без строгих обязательств
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon name="Coffee" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Атмосфера</h3>
                    <p className="text-sm text-muted-foreground">
                      Дружная команда и приятное общение за чашкой чая
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-muted/30 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xl">
                🐾
              </div>
              <span className="font-semibold">Добрые Лапки</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Добрые Лапки. Помогаем животным найти дом.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
