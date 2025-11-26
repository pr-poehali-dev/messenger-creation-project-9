import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-2xl shadow-lg">
                  <Icon name="Sparkles" size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                  Peeky
                </h1>
                <p className="text-xs text-muted-foreground">Стиль и качество</p>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50 rounded-full mb-6">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">О компании</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            О маркетплейсе Peeky
          </h1>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Наша миссия</h2>
                  <p className="text-muted-foreground">
                    Мы создаём современную платформу для комфортных покупок, где каждый может найти качественные товары по честным ценам. Наша цель — объединить лучших продавцов и довольных покупателей на одной удобной площадке.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-900/30 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">5M+</h3>
                <p className="text-sm text-muted-foreground">Активных покупателей</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-900/30 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Store" size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">50K+</h3>
                <p className="text-sm text-muted-foreground">Проверенных продавцов</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-900/30 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">2M+</h3>
                <p className="text-sm text-muted-foreground">Товаров в каталоге</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Star" size={28} className="text-primary" />
                Наши преимущества
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Безопасность</h3>
                    <p className="text-sm text-muted-foreground">Защита покупателей и гарантия возврата денег</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Быстрая доставка</h3>
                    <p className="text-sm text-muted-foreground">Доставка по всей России от 1 дня</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Качество</h3>
                    <p className="text-sm text-muted-foreground">Проверка продавцов и контроль качества товаров</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="HeadphonesIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Поддержка 24/7</h3>
                    <p className="text-sm text-muted-foreground">Всегда готовы помочь и ответить на вопросы</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Присоединяйтесь к Peeky!</h2>
              <p className="mb-6 text-white/90">
                Станьте частью растущего сообщества довольных покупателей и успешных продавцов. Начните покупать или продавать уже сегодня!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-medium hover:scale-105 transition-transform shadow-lg">
                  <Icon name="ShoppingBag" size={20} />
                  Начать покупки
                </Link>
                <Link to="/seller" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-medium hover:bg-white/20 transition-colors">
                  <Icon name="Store" size={20} />
                  Стать продавцом
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
