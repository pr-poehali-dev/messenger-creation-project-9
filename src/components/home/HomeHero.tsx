import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HomeHeroProps {
  scrollToSection: (id: string) => void;
}

export default function HomeHero({ scrollToSection }: HomeHeroProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/53f20789-545b-4f39-a5c0-ccab563bf79e.jpg"
          alt="Добрые Лапки"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            Подарите надежду бездомным животным
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
            Каждый день мы спасаем жизни и помогаем найти любящих хозяев для братьев наших меньших
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('donate')} className="gap-2 bg-white text-primary hover:bg-white/90 shadow-xl">
              <Icon name="Heart" size={20} />
              Помочь деньгами
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('animals')} className="gap-2 border-white text-white hover:bg-white/10 shadow-xl">
              <Icon name="Search" size={20} />
              Найти питомца
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
