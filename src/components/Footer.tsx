import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl mt-12 md:mt-20 mb-16 md:mb-0">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-2xl">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Peeky
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Современный маркетплейс с лучшими товарами и проверенными продавцами. Покупайте с удовольствием!
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center hover:scale-110 transition-transform">
                <Icon name="Mail" size={18} className="text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center hover:scale-110 transition-transform">
                <Icon name="Phone" size={18} className="text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center hover:scale-110 transition-transform">
                <Icon name="MessageCircle" size={18} className="text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Info" size={18} className="text-primary" />
              О компании
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/seller" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Продавцам
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="ShoppingBag" size={18} className="text-primary" />
              Покупателям
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/delivery" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Оплата
                </Link>
              </li>
              <li>
                <Link to="/return" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Возврат товара
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="HelpCircle" size={18} className="text-primary" />
              Поддержка
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Помощь
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Icon name="ChevronRight" size={14} />
                  Личный кабинет
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Icon name="Phone" size={16} />
                <span className="font-bold text-sm">8 (800) 555-35-35</span>
              </div>
              <p className="text-xs text-muted-foreground">Ежедневно 9:00 - 21:00</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-purple-100 dark:border-purple-900/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">© 2024 Peeky. Все права защищены.</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Пользовательское соглашение</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Правила продажи</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}