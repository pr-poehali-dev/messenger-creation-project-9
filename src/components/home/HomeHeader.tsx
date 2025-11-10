import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HomeHeaderProps {
  scrollToSection: (id: string) => void;
}

export default function HomeHeader({ scrollToSection }: HomeHeaderProps) {
  return (
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
  );
}
