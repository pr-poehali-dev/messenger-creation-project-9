import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type Story = {
  id: number;
  name: string;
  avatar: string;
  viewed: boolean;
};

type Message = {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  reaction?: string;
};

type Section = 'chats' | 'contacts' | 'groups' | 'channels' | 'settings';

const stories: Story[] = [
  { id: 1, name: 'Иван', avatar: '👨‍💼', viewed: false },
  { id: 2, name: 'Мария', avatar: '👩‍🎨', viewed: false },
  { id: 3, name: 'Алекс', avatar: '👨‍💻', viewed: true },
  { id: 4, name: 'Катя', avatar: '👩‍🔬', viewed: false },
  { id: 5, name: 'Дима', avatar: '👨‍🎓', viewed: true },
];

const chats: Chat[] = [
  { id: 1, name: 'Иван Петров', avatar: '👨‍💼', lastMessage: 'Привет! Как дела?', time: '14:30', unread: 3, online: true },
  { id: 2, name: 'Мария Смирнова', avatar: '👩‍🎨', lastMessage: 'Отправила файлы', time: '13:15', unread: 0, online: true },
  { id: 3, name: 'Алекс Козлов', avatar: '👨‍💻', lastMessage: 'Созвон в 15:00?', time: '12:45', unread: 1, online: false },
  { id: 4, name: 'Дизайн-команда', avatar: '🎨', lastMessage: 'Новый макет готов', time: '11:20', unread: 12, online: true },
  { id: 5, name: 'Разработчики', avatar: '💻', lastMessage: 'Деплой завершен', time: '10:05', unread: 0, online: false },
  { id: 6, name: 'Катя Волкова', avatar: '👩‍🔬', lastMessage: 'Спасибо за помощь!', time: 'Вчера', unread: 0, online: false },
  { id: 7, name: 'Бот поддержки', avatar: '🤖', lastMessage: 'Чем могу помочь?', time: 'Вчера', unread: 0, online: true },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как твои дела?', time: '14:25', sent: false },
    { id: 2, text: 'Отлично! Работаю над новым проектом 🚀', time: '14:26', sent: true },
    { id: 3, text: 'Звучит круто! Расскажешь подробнее?', time: '14:28', sent: false, reaction: '👍' },
    { id: 4, text: 'Конечно! Создаю мессенджер с крутым дизайном', time: '14:30', sent: true },
  ]);
  const [showStickers, setShowStickers] = useState(false);

  const stickers = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '😍', '💯', '✨', '🚀', '💪', '🤖'];
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        sent: true,
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleStickerClick = (sticker: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: sticker,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    };
    setMessages([...messages, newMessage]);
    setShowStickers(false);
  };

  const addReaction = (messageId: number, reaction: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, reaction } : msg
    ));
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-20 glass flex flex-col items-center py-6 space-y-6 border-r border-border">
        <div className="gradient-primary w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 transition-transform">
          T
        </div>
        
        <nav className="flex-1 flex flex-col space-y-4">
          {[
            { icon: 'MessageSquare', section: 'chats' as Section, label: 'Чаты' },
            { icon: 'Users', section: 'contacts' as Section, label: 'Контакты' },
            { icon: 'Users2', section: 'groups' as Section, label: 'Группы' },
            { icon: 'Radio', section: 'channels' as Section, label: 'Каналы' },
          ].map(({ icon, section, label }) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                activeSection === section
                  ? 'gradient-primary text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              title={label}
            >
              <Icon name={icon} size={24} />
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          <button
            onClick={() => setActiveSection('settings')}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all"
            title="Настройки"
          >
            <Icon name="Settings" size={24} />
          </button>
          <Avatar className="cursor-pointer hover:scale-110 transition-transform">
            <AvatarImage src="" />
            <AvatarFallback className="gradient-primary text-white font-semibold">Я</AvatarFallback>
          </Avatar>
        </div>
      </aside>

      <div className="w-96 flex flex-col border-r border-border">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold gradient-text">
              {activeSection === 'chats' && 'Чаты'}
              {activeSection === 'contacts' && 'Контакты'}
              {activeSection === 'groups' && 'Группы'}
              {activeSection === 'channels' && 'Каналы'}
              {activeSection === 'settings' && 'Настройки'}
            </h1>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Icon name="Search" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Icon name="Plus" size={20} />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              className="pl-10 rounded-full bg-muted border-0"
            />
          </div>
        </div>

        {activeSection === 'chats' && (
          <>
            <div className="px-6 pb-4">
              <ScrollArea className="w-full">
                <div className="flex gap-3 pb-2">
                  {stories.map(story => (
                    <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer group">
                      <div className={`p-1 rounded-full ${story.viewed ? 'bg-muted' : 'gradient-primary'}`}>
                        <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {story.avatar}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground truncate w-16 text-center">
                        {story.name}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <ScrollArea className="flex-1 px-3">
              <div className="space-y-1">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:bg-muted ${
                      selectedChat?.id === chat.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="gradient-primary border-0 h-6 min-w-6 flex items-center justify-center">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        {activeSection === 'settings' && (
          <div className="flex-1 px-6 py-4 space-y-4">
            <div className="space-y-3">
              {[
                { icon: 'Palette', label: 'Темы оформления', desc: 'Измените внешний вид' },
                { icon: 'Bell', label: 'Уведомления', desc: 'Настройте оповещения' },
                { icon: 'Lock', label: 'Приватность', desc: 'Управление безопасностью' },
                { icon: 'Database', label: 'Данные', desc: 'Хранилище и кэш' },
                { icon: 'Languages', label: 'Язык', desc: 'Русский' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Icon name={item.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="h-20 glass border-b border-border px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{selectedChat.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedChat.online ? 'в сети' : 'был(а) недавно'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Icon name="Video" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 group ${message.sent ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {!message.sent && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                        {selectedChat.avatar}
                      </div>
                    )}
                    <div className="relative max-w-md">
                      <div
                        className={`px-4 py-3 rounded-2xl animate-scale-in ${
                          message.sent
                            ? 'gradient-primary text-white rounded-br-md'
                            : 'glass rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.sent ? 'text-white/70' : 'text-muted-foreground'
                          }`}
                        >
                          {message.time}
                        </span>
                      </div>
                      {message.reaction && (
                        <div className="absolute -bottom-2 -right-2 bg-muted rounded-full px-2 py-1 text-sm border border-border">
                          {message.reaction}
                        </div>
                      )}
                      <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1 bg-card border border-border rounded-full px-2 py-1">
                          {reactions.slice(0, 3).map(reaction => (
                            <button
                              key={reaction}
                              onClick={() => addReaction(message.id, reaction)}
                              className="hover:scale-125 transition-transform text-sm"
                            >
                              {reaction}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 glass border-t border-border">
              {showStickers && (
                <div className="mb-4 p-4 bg-card rounded-2xl border border-border animate-scale-in">
                  <div className="grid grid-cols-6 gap-2">
                    {stickers.map(sticker => (
                      <button
                        key={sticker}
                        onClick={() => handleStickerClick(sticker)}
                        className="text-3xl p-2 hover:scale-125 transition-transform hover:bg-muted rounded-xl"
                      >
                        {sticker}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setShowStickers(!showStickers)}
                >
                  <Icon name="Smile" size={22} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Icon name="Paperclip" size={22} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Написать сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="rounded-full bg-muted border-0 pr-12"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    <Icon name="Mic" size={20} />
                  </Button>
                </div>
                <Button
                  size="icon"
                  className="rounded-full gradient-primary border-0 hover:scale-110 transition-transform"
                  onClick={handleSendMessage}
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-32 h-32 mx-auto gradient-primary rounded-full flex items-center justify-center text-6xl">
                💬
              </div>
              <h2 className="text-3xl font-bold gradient-text">Выберите чат</h2>
              <p className="text-muted-foreground">
                Начните общение с друзьями, коллегами или ботами
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}