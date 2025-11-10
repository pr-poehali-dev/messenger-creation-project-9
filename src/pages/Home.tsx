import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const animals = [
    {
      id: 1,
      name: 'Шарик',
      type: 'Собака',
      age: '3 года',
      story: 'Дружелюбный пёс, который очень любит играть. Найден на улице зимой, нуждается в заботливой семье.',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80'
    },
    {
      id: 2,
      name: 'Мурка',
      type: 'Кошка',
      age: '2 года',
      story: 'Ласковая кошечка с красивыми глазами. Очень игривая и любит внимание.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80'
    },
    {
      id: 3,
      name: 'Рыжик',
      type: 'Собака',
      age: '1 год',
      story: 'Активный щенок, который ищет семью с детьми. Обожает прогулки и игры.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'
    },
    {
      id: 4,
      name: 'Барсик',
      type: 'Кот',
      age: '5 лет',
      story: 'Спокойный кот, идеален для квартиры. Любит тепло и уют.',
      image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-2xl">
              🐾
            </div>
            <span className="font-bold text-xl">Добрые Лапки</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              О нас
            </button>
            <button onClick={() => scrollToSection('animals')} className="text-sm font-medium hover:text-primary transition-colors">
              Питомцы
            </button>
            <button onClick={() => scrollToSection('help')} className="text-sm font-medium hover:text-primary transition-colors">
              Как помочь
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>
          <Button onClick={() => scrollToSection('donate')} className="gap-2">
            <Icon name="Heart" size={18} />
            Помочь
          </Button>
        </div>
      </header>

      <main>
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Подарите надежду бездомным животным
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Каждый день мы спасаем жизни и помогаем найти любящих хозяев для братьев наших меньших
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => scrollToSection('donate')} className="gap-2">
                  <Icon name="Heart" size={20} />
                  Помочь деньгами
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('animals')} className="gap-2">
                  <Icon name="Search" size={20} />
                  Найти питомца
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">О нашей миссии</h2>
              <p className="text-lg text-muted-foreground">
                Мы — благотворительная организация, которая занимается спасением, лечением и пристройством 
                бездомных животных. За 10 лет работы мы помогли более 5000 питомцам найти дом.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-3xl">
                  🏥
                </div>
                <h3 className="text-xl font-semibold">Лечение и уход</h3>
                <p className="text-muted-foreground">
                  Ветеринарная помощь, вакцинация и реабилитация для всех подопечных
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-3xl">
                  🏠
                </div>
                <h3 className="text-xl font-semibold">Поиск семьи</h3>
                <p className="text-muted-foreground">
                  Помогаем найти любящих и ответственных хозяев для каждого питомца
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-3xl">
                  💚
                </div>
                <h3 className="text-xl font-semibold">Образование</h3>
                <p className="text-muted-foreground">
                  Учим людей ответственному отношению к животным
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="animals" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Наши питомцы ищут дом</h2>
              <p className="text-lg text-muted-foreground">
                Познакомьтесь с животными, которые мечтают о любящей семье
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {animals.map((animal) => (
                <div key={animal.id} className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={animal.image} 
                      alt={animal.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{animal.name}</h3>
                      <p className="text-sm text-muted-foreground">{animal.type}, {animal.age}</p>
                    </div>
                    <p className="text-sm">{animal.story}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Icon name="Heart" size={16} />
                      Забрать домой
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="help" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Как вы можете помочь</h2>
              <p className="text-lg text-muted-foreground">
                Есть много способов поддержать нашу работу и помочь животным
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="border rounded-xl p-6 space-y-4 hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Финансовая помощь</h3>
                <p className="text-muted-foreground">
                  Ваши пожертвования идут на корм, лечение и содержание приютов
                </p>
              </div>
              <div className="border rounded-xl p-6 space-y-4 hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold">Волонтёрство</h3>
                <p className="text-muted-foreground">
                  Помогайте с уходом за животными, выгулом и организацией мероприятий
                </p>
              </div>
              <div className="border rounded-xl p-6 space-y-4 hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Icon name="Home" size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">Временная передержка</h3>
                <p className="text-muted-foreground">
                  Возьмите животное на передержку, пока мы ищем постоянных хозяев
                </p>
              </div>
              <div className="border rounded-xl p-6 space-y-4 hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon name="Share2" size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Расскажите о нас</h3>
                <p className="text-muted-foreground">
                  Поделитесь информацией в соцсетях — это тоже большая помощь
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="donate" className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center text-3xl mb-4">
                    ❤️
                  </div>
                  <h2 className="text-3xl font-bold">Сделайте пожертвование</h2>
                  <p className="text-muted-foreground">
                    Любая сумма важна и помогает спасать жизни
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" size="lg" className="text-lg font-semibold">500₽</Button>
                  <Button variant="outline" size="lg" className="text-lg font-semibold">1000₽</Button>
                  <Button variant="outline" size="lg" className="text-lg font-semibold">3000₽</Button>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Или введите свою сумму</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="1000"
                      className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                  </div>
                </div>

                <Button size="lg" className="w-full gap-2 text-lg">
                  <Icon name="Heart" size={20} />
                  Помочь сейчас
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Безопасная оплата через защищённое соединение. Все средства идут на помощь животным.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Свяжитесь с нами</h2>
                <p className="text-lg text-muted-foreground">
                  Есть вопросы или хотите помочь? Мы всегда рады общению!
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">help@добрыелапки.рф</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">Адрес</h3>
                  <p className="text-muted-foreground">Москва, ул. Примерная, 1</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
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
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
