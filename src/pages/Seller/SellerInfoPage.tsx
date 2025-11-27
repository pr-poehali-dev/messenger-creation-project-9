import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

interface SellerInfoPageProps {
  onNavigateToAuth: () => void;
}

export default function SellerInfoPage({ onNavigateToAuth }: SellerInfoPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-900/40 dark:to-pink-900/40">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/80 border-b border-purple-100/50 dark:border-purple-800/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">На главную</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={onNavigateToAuth}
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти / Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50 rounded-full mb-6">
            <Icon name="TrendingUp" size={16} className="text-primary dark:text-purple-300" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Начните зарабатывать сегодня</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Станьте продавцом на Peeky
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Присоединяйтесь к тысячам успешных продавцов и начните продавать свои товары миллионам покупателей по всей России
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={onNavigateToAuth}
              className="h-14 px-8 bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl text-lg"
            >
              <Icon name="Rocket" size={22} className="mr-2" />
              Начать продавать
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-[#252538] rounded-3xl p-8 border border-purple-100 dark:border-purple-800/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Icon name="Users" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">5+ млн покупателей</h3>
            <p className="text-muted-foreground">
              Получите доступ к огромной аудитории активных покупателей
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Icon name="Percent" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Низкие комиссии</h3>
            <p className="text-muted-foreground">
              Всего 5% от продаж. Первые 3 месяца без комиссии
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Icon name="Zap" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Быстрый старт</h3>
            <p className="text-muted-foreground">
              Начните продавать за 15 минут. Простая регистрация
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}