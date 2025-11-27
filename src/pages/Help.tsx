import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { useState } from 'react';

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Как сделать заказ?',
      answer: 'Выберите товар, нажмите "В корзину", затем перейдите в корзину и оформите заказ. Укажите адрес доставки и способ оплаты.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки, оплату при получении и переводы по СБП.'
    },
    {
      question: 'Как отследить заказ?',
      answer: 'После оформления заказа вы получите трек-номер на email. Отслеживайте статус в личном кабинете в разделе "Мои заказы".'
    },
    {
      question: 'Можно ли вернуть товар?',
      answer: 'Да, вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и без следов использования.'
    },
    {
      question: 'Как связаться с продавцом?',
      answer: 'На странице товара есть кнопка "Связаться с продавцом". Также можете написать через чат в личном кабинете.'
    },
    {
      question: 'Что делать, если товар не подошёл?',
      answer: 'Оформите возврат в личном кабинете. Мы организуем бесплатный возврат, и деньги вернутся на ваш счёт в течение 3-5 рабочих дней.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-900/40 dark:to-pink-900/40">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/80 border-b border-purple-100/50 dark:border-purple-800/30 sticky top-0 z-50">
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
            <Icon name="HelpCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Центр помощи</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Помощь
          </h1>

          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/delivery" className="bg-white dark:bg-[#252538] rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800/30 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon name="Truck" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Доставка</h2>
                <p className="text-sm text-muted-foreground">Сроки и условия доставки</p>
                <Icon name="ArrowRight" size={20} className="text-primary mt-4 group-hover:translate-x-2 transition-transform" />
              </Link>

              <Link to="/payment" className="bg-white dark:bg-[#252538] rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800/30 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon name="CreditCard" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Оплата</h2>
                <p className="text-sm text-muted-foreground">Способы и безопасность</p>
                <Icon name="ArrowRight" size={20} className="text-primary mt-4 group-hover:translate-x-2 transition-transform" />
              </Link>

              <Link to="/return" className="bg-white dark:bg-[#252538] rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800/30 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon name="RotateCcw" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Возврат</h2>
                <p className="text-sm text-muted-foreground">Как вернуть товар</p>
                <Icon name="ArrowRight" size={20} className="text-primary mt-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="MessageSquare" size={28} className="text-primary" />
                Часто задаваемые вопросы
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-purple-100 dark:border-purple-800/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-50 dark:hover:bg-purple-800/30 transition-colors"
                    >
                      <span className="font-bold text-gray-900 dark:text-white">{faq.question}</span>
                      <Icon 
                        name={openFaq === index ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-primary flex-shrink-0 ml-4"
                      />
                    </button>
                    {openFaq === index && (
                      <div className="p-4 pt-0 text-muted-foreground border-t border-purple-100 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-800/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Headphones" size={28} className="text-primary" />
                Служба поддержки
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Телефон</h3>
                    <p className="text-xl font-bold text-primary mb-1">8 (800) 555-35-35</p>
                    <p className="text-sm text-muted-foreground">Ежедневно 9:00 - 21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Email</h3>
                    <p className="text-lg font-bold text-primary mb-1">support@peeky.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Не нашли ответ?</h2>
                  <p className="text-white/90">Свяжитесь с нами, и мы обязательно поможем!</p>
                </div>
                <Link to="/contacts" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-medium hover:scale-105 transition-transform shadow-lg">
                  <Icon name="MessageCircle" size={20} />
                  Связаться с нами
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}