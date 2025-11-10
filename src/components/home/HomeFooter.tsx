import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HomeFooter() {
  return (
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
  );
}
