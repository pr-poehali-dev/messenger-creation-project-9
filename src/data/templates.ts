import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'landing-1',
    name: 'Startup Landing',
    category: 'landing',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    pages: [
      {
        id: 'page-1',
        name: 'Главная',
        path: '/',
        components: [
          {
            id: 'nav-1',
            type: 'navbar',
            props: {
              logo: '🚀 StartUp',
              links: ['О нас', 'Функции', 'Цены', 'Контакты']
            },
            styles: { backgroundColor: '#ffffff', textColor: '#000000' }
          },
          {
            id: 'hero-1',
            type: 'hero',
            props: {
              title: 'Революция в вашем бизнесе',
              subtitle: 'Современное решение для роста и развития вашей компании',
              buttonText: 'Начать бесплатно',
              buttonLink: '#'
            },
            styles: { backgroundColor: '#4f46e5', textColor: '#ffffff', padding: '100px 20px' }
          },
          {
            id: 'features-1',
            type: 'features',
            props: {
              title: 'Почему выбирают нас',
              features: [
                { icon: '⚡', title: 'Быстро', description: 'Молниеносная скорость работы' },
                { icon: '🔒', title: 'Безопасно', description: 'Максимальная защита данных' },
                { icon: '📱', title: 'Удобно', description: 'Интуитивный интерфейс' }
              ]
            },
            styles: { backgroundColor: '#f9fafb', textColor: '#111827', padding: '80px 20px' }
          },
          {
            id: 'cta-1',
            type: 'cta',
            props: {
              title: 'Готовы начать?',
              subtitle: 'Присоединяйтесь к тысячам довольных клиентов',
              buttonText: 'Попробовать сейчас'
            },
            styles: { backgroundColor: '#10b981', textColor: '#ffffff', padding: '60px 20px' }
          }
        ]
      }
    ]
  },
  {
    id: 'business-1',
    name: 'Business Professional',
    category: 'business',
    preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    pages: [
      {
        id: 'page-2',
        name: 'Главная',
        path: '/',
        components: [
          {
            id: 'nav-2',
            type: 'navbar',
            props: {
              logo: '💼 Business Pro',
              links: ['Услуги', 'О компании', 'Портфолио', 'Контакты']
            },
            styles: { backgroundColor: '#1f2937', textColor: '#ffffff' }
          },
          {
            id: 'hero-2',
            type: 'hero',
            props: {
              title: 'Профессиональные бизнес-решения',
              subtitle: 'Мы помогаем компаниям достигать новых высот',
              buttonText: 'Узнать больше'
            },
            styles: { backgroundColor: '#1e293b', textColor: '#ffffff', padding: '120px 20px' }
          },
          {
            id: 'text-1',
            type: 'text',
            props: {
              title: 'О компании',
              content: 'Более 10 лет опыта в предоставлении качественных услуг для бизнеса. Мы гордимся нашими достижениями и доверием клиентов.'
            },
            styles: { backgroundColor: '#ffffff', textColor: '#374151', padding: '60px 20px' }
          }
        ]
      }
    ]
  },
  {
    id: 'portfolio-1',
    name: 'Creative Portfolio',
    category: 'portfolio',
    preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    pages: [
      {
        id: 'page-3',
        name: 'Портфолио',
        path: '/',
        components: [
          {
            id: 'hero-3',
            type: 'hero',
            props: {
              title: 'Креативное портфолио',
              subtitle: 'Дизайнер • Фотограф • Художник',
              buttonText: 'Посмотреть работы'
            },
            styles: { backgroundColor: '#fbbf24', textColor: '#1f2937', padding: '100px 20px' }
          },
          {
            id: 'gallery-1',
            type: 'gallery',
            props: {
              title: 'Мои работы',
              images: [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
                'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600',
                'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600'
              ]
            },
            styles: { backgroundColor: '#f3f4f6', padding: '80px 20px' }
          }
        ]
      }
    ]
  }
];
