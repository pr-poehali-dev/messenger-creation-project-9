import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

export default function Return() {
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
            <Icon name="RotateCcw" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Возврат и обмен</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Возврат товара
          </h1>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      Гарантия возврата 14 дней
                    </h2>
                    <p className="text-muted-foreground">
                      Вы можете вернуть товар в течение 14 дней с момента получения без объяснения причин
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="ClipboardList" size={28} className="text-primary" />
                Условия возврата
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Package" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Сохранность товара</h3>
                    <p className="text-sm text-muted-foreground">
                      Товар должен быть в оригинальной упаковке, с бирками и этикетками. Товарный вид, потребительские свойства и упаковка сохранены.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Документы</h3>
                    <p className="text-sm text-muted-foreground">
                      Необходимо предоставить чек или другой документ, подтверждающий покупку. Документы можно найти в личном кабинете.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="XCircle" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Отсутствие следов использования</h3>
                    <p className="text-sm text-muted-foreground">
                      Товар не должен иметь следов эксплуатации, быть загрязнённым или повреждённым по вине покупателя.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="ListOrdered" size={28} className="text-primary" />
                Как оформить возврат
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Подайте заявку</h3>
                  <p className="text-sm text-muted-foreground">
                    Перейдите в "Мои заказы" и нажмите "Оформить возврат"
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Передайте товар</h3>
                  <p className="text-sm text-muted-foreground">
                    Курьер заберёт товар или отнесите в пункт выдачи
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Получите деньги</h3>
                  <p className="text-sm text-muted-foreground">
                    Деньги вернутся в течение 3-5 рабочих дней
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Repeat" size={28} className="text-primary" />
                Обмен товара
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Icon name="RefreshCw" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Обмен на другой товар</h3>
                    <p className="text-muted-foreground mb-4">
                      Если товар не подошёл по размеру, цвету или модели, вы можете обменять его на аналогичный товар. Обмен производится бесплатно в течение 14 дней.
                    </p>
                    <div className="flex items-center gap-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      <span className="text-sm text-primary font-medium">Доставка обмена за наш счёт</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="DollarSign" size={28} className="text-primary" />
                Возврат денежных средств
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Сроки возврата</h3>
                    <p className="text-sm text-muted-foreground">
                      После получения товара на складе деньги вернутся на ваш счёт в течение 3-5 рабочих дней.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Способ возврата</h3>
                    <p className="text-sm text-muted-foreground">
                      Деньги вернутся тем же способом, которым была произведена оплата: на карту, в электронный кошелёк или наличными.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Truck" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Стоимость доставки</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы организуем бесплатный возврат. Курьер заберёт товар или вы можете сдать его в пункт выдачи без дополнительной оплаты.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="AlertCircle" size={28} className="text-primary" />
                Товары, не подлежащие возврату
              </h2>
              <p className="text-muted-foreground mb-4">
                В соответствии с законодательством РФ, некоторые категории товаров не подлежат возврату и обмену:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <Icon name="X" size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Нижнее бельё и купальники</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <Icon name="X" size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Косметика и парфюмерия</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <Icon name="X" size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Ювелирные изделия</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <Icon name="X" size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Книги, диски, флешки</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Нужна помощь с возвратом?</h2>
                  <p className="text-white/90">Свяжитесь с нами — мы поможем оформить возврат быстро и удобно!</p>
                </div>
                <Link to="/help" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-medium hover:scale-105 transition-transform shadow-lg">
                  <Icon name="HelpCircle" size={20} />
                  Связаться с поддержкой
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
