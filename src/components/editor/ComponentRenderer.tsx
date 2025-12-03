import { Component } from '../../types';
import { Button } from '../ui/button';
import Icon from '../ui/icon';

interface ComponentRendererProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function ComponentRenderer({
  component,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}: ComponentRendererProps) {
  const { type, props, styles } = component;

  const renderComponent = () => {
    const style = {
      backgroundColor: styles.backgroundColor,
      color: styles.textColor,
      padding: styles.padding || '60px 20px',
      margin: styles.margin || '0'
    };

    switch (type) {
      case 'navbar':
        return (
          <nav style={style} className="flex items-center justify-between px-8 py-4 shadow-md">
            <div className="text-2xl font-bold">{props.logo || 'Logo'}</div>
            <div className="flex gap-6">
              {(props.links || []).map((link: string, i: number) => (
                <a key={i} href="#" className="hover:opacity-80">{link}</a>
              ))}
            </div>
          </nav>
        );

      case 'hero':
        return (
          <div style={style} className="text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {props.title || 'Заголовок Hero'}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {props.subtitle || 'Подзаголовок для вашей страницы'}
              </p>
              {props.buttonText && (
                <Button size="lg" className="text-lg px-8 py-6">
                  {props.buttonText}
                </Button>
              )}
            </div>
          </div>
        );

      case 'features':
        return (
          <div style={style}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                {props.title || 'Наши преимущества'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(props.features || []).map((feature: any, i: number) => (
                  <div key={i} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="opacity-80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div style={style}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                {props.title || 'Тарифы'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(props.plans || []).map((plan: any, i: number) => (
                  <div key={i} className="border rounded-xl p-8 hover:shadow-xl transition-shadow bg-white">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-4">{plan.price}</div>
                    <ul className="space-y-2 mb-6">
                      {(plan.features || []).map((f: string, j: number) => (
                        <li key={j} className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-green-500 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Выбрать</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div style={style}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                {props.title || 'Отзывы клиентов'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(props.testimonials || []).map((testimonial: any, i: number) => (
                  <div key={i} className="bg-white p-8 rounded-xl shadow-lg">
                    <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300" />
                      <div>
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm opacity-60">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div style={style}>
            <div className="max-w-6xl mx-auto">
              {props.title && (
                <h2 className="text-4xl font-bold text-center mb-12">{props.title}</h2>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(props.images || []).map((img: string, i: number) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg">
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div style={style}>
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {props.title || 'Свяжитесь с нами'}
              </h2>
              <div className="space-y-4">
                <input type="text" placeholder="Имя" className="w-full px-4 py-3 border rounded-lg" />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
                <textarea placeholder="Сообщение" rows={5} className="w-full px-4 py-3 border rounded-lg" />
                <Button className="w-full py-3">{props.buttonText || 'Отправить'}</Button>
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div style={style} className="text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {props.title || 'Готовы начать?'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {props.subtitle || 'Присоединяйтесь к нам уже сегодня'}
              </p>
              <Button size="lg" className="text-lg px-8 py-6">
                {props.buttonText || 'Начать'}
              </Button>
            </div>
          </div>
        );

      case 'footer':
        return (
          <footer style={style} className="border-t">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">{props.companyName || 'Компания'}</h3>
                <p className="opacity-80">{props.description || 'Информация о компании'}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Контакты</h3>
                <p className="opacity-80">{props.email || 'info@example.com'}</p>
                <p className="opacity-80">{props.phone || '+7 (XXX) XXX-XX-XX'}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Социальные сети</h3>
                <div className="flex gap-4">
                  <Icon name="Facebook" size={24} className="hover:opacity-70 cursor-pointer" />
                  <Icon name="Twitter" size={24} className="hover:opacity-70 cursor-pointer" />
                  <Icon name="Instagram" size={24} className="hover:opacity-70 cursor-pointer" />
                  <Icon name="Linkedin" size={24} className="hover:opacity-70 cursor-pointer" />
                </div>
              </div>
            </div>
          </footer>
        );

      case 'text':
        return (
          <div style={style}>
            <div className="max-w-3xl mx-auto">
              {props.title && <h2 className="text-3xl font-bold mb-6">{props.title}</h2>}
              <div className="text-lg leading-relaxed opacity-90">
                {props.content || 'Добавьте текстовое содержимое'}
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div style={style}>
            <div className="max-w-4xl mx-auto">
              {props.imageUrl ? (
                <img src={props.imageUrl} alt={props.alt || 'Image'} className="w-full rounded-lg shadow-lg" />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Icon name="Image" size={64} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div style={style}>Неизвестный компонент</div>;
    }
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all ${
        isSelected ? 'ring-4 ring-blue-500 ring-inset' : 'hover:ring-2 hover:ring-blue-300 hover:ring-inset'
      }`}
      onClick={onSelect}
    >
      {renderComponent()}
      
      {isSelected && (
        <div className="absolute top-4 right-4 flex gap-2 bg-white rounded-lg shadow-lg p-2">
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onMoveUp(); }}>
            <Icon name="ChevronUp" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onMoveDown(); }}>
            <Icon name="ChevronDown" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <Icon name="Edit" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
