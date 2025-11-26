import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

export default function Payment() {
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
            <Icon name="CreditCard" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Способы оплаты</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Оплата
          </h1>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Wallet" size={28} className="text-primary" />
                Доступные способы оплаты
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                      <Icon name="CreditCard" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Банковской картой</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Visa, MasterCard, МИР — мгновенное зачисление
                  </p>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} className="text-green-600" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">Безопасный платёж</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                      <Icon name="Smartphone" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">СБП</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Система быстрых платежей — переводы без комиссии
                  </p>
                  <div className="flex items-center gap-2">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <span className="text-sm text-primary font-medium">Мгновенно</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                      <Icon name="Wallet" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Электронные кошельки</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    ЮMoney, Qiwi, WebMoney — удобная оплата онлайн
                  </p>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">Быстро и просто</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                      <Icon name="HandCoins" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">При получении</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Наличными или картой курьеру / в пункте выдачи
                  </p>
                  <div className="flex items-center gap-2">
                    <Icon name="Info" size={16} className="text-primary" />
                    <span className="text-sm text-primary font-medium">Проверьте перед оплатой</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Shield" size={28} className="text-primary" />
                Безопасность платежей
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Icon name="Lock" size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Шифрование SSL</h3>
                      <p className="text-sm text-muted-foreground">
                        Все данные передаются по защищённому протоколу
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Icon name="ShieldCheck" size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-gray-900 dark:text-white">3D Secure</h3>
                      <p className="text-sm text-muted-foreground">
                        Дополнительная защита карточных платежей
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Icon name="Eye" size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Не храним данные</h3>
                      <p className="text-sm text-muted-foreground">
                        Мы не сохраняем данные ваших банковских карт
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Сертификация PCI DSS</h3>
                      <p className="text-sm text-muted-foreground">
                        Соответствуем международным стандартам безопасности
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Info" size={28} className="text-primary" />
                Важная информация
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Когда списываются деньги?</h3>
                    <p className="text-sm text-muted-foreground">
                      При оплате картой или электронным кошельком деньги списываются сразу. При оплате при получении — в момент получения заказа.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Получение чека</h3>
                    <p className="text-sm text-muted-foreground">
                      После оплаты вы автоматически получите электронный чек на email. Также чек доступен в личном кабинете.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="RotateCcw" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Возврат средств</h3>
                    <p className="text-sm text-muted-foreground">
                      При возврате товара деньги вернутся тем же способом, которым была произведена оплата. Срок возврата — 3-5 рабочих дней.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Percent" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Комиссия</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы не взимаем комиссию за оплату любым из доступных способов. Все цены указаны окончательные.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Проблемы с оплатой?</h2>
                  <p className="text-white/90">Обратитесь в службу поддержки — мы поможем разобраться!</p>
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
