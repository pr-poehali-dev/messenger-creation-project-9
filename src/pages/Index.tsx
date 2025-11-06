import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { auth, User } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { chatsApi, Chat as ApiChat, Message as ApiMessage, ChatUser } from '@/lib/chats';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Section = 'chats' | 'contacts' | 'groups' | 'channels' | 'settings';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const [activeSection, setActiveSection] = useState<Section>('chats');
  const [chats, setChats] = useState<ApiChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<ApiChat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [showStickers, setShowStickers] = useState(false);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await auth.verifyToken();
      setUser(currentUser);
      setIsLoading(false);
      if (currentUser) {
        loadChats();
      }
    };
    checkAuth();
  }, []);
  
  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
    }
  }, [selectedChat]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userSearch.trim()) {
        searchUsers();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [userSearch]);
  
  const loadChats = async () => {
    try {
      const data = await chatsApi.getChats();
      setChats(data);
    } catch (err) {
      console.error('Failed to load chats:', err);
    }
  };
  
  const loadMessages = async (chatId: number) => {
    try {
      const data = await chatsApi.getMessages(chatId);
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };
  
  const searchUsers = async () => {
    setIsSearching(true);
    try {
      const data = await chatsApi.searchUsers(userSearch);
      setSearchResults(data);
    } catch (err) {
      console.error('Failed to search users:', err);
    }
    setIsSearching(false);
  };
  
  const handleCreateChat = async (otherUser: ChatUser) => {
    try {
      const chatId = await chatsApi.createChat(otherUser.id);
      await loadChats();
      const newChat = chats.find(c => c.id === chatId);
      if (newChat) {
        setSelectedChat(newChat);
      }
      setShowNewChatDialog(false);
      setUserSearch('');
      setSearchResults([]);
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };
  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (authMode === 'register') {
        const { user: newUser } = await auth.register(email, password, username);
        setUser(newUser);
      } else {
        const { user: loggedUser } = await auth.login(email, password);
        setUser(loggedUser);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleLogout = () => {
    auth.logout();
    setUser(null);
  };

  const stickers = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '😍', '💯', '✨', '🚀', '💪', '🤖'];
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedChat) {
      try {
        await chatsApi.sendMessage(selectedChat.id, messageText);
        setMessageText('');
        await loadMessages(selectedChat.id);
        await loadChats();
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    }
  };

  const handleStickerClick = async (sticker: string) => {
    if (selectedChat) {
      try {
        await chatsApi.sendMessage(selectedChat.id, sticker);
        setShowStickers(false);
        await loadMessages(selectedChat.id);
        await loadChats();
      } catch (err) {
        console.error('Failed to send sticker:', err);
      }
    }
  };

  const addReaction = async (messageId: number, reaction: string) => {
    try {
      await chatsApi.addReaction(messageId, reaction);
      await loadMessages(selectedChat!.id);
    } catch (err) {
      console.error('Failed to add reaction:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto gradient-primary rounded-full animate-pulse" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md glass border-border">
          <CardHeader className="space-y-1">
            <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center text-3xl font-bold">
              T
            </div>
            <CardTitle className="text-2xl text-center gradient-text">
              {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
            </CardTitle>
            <CardDescription className="text-center">
              {authMode === 'login' 
                ? 'Войдите, чтобы продолжить общение' 
                : 'Создайте аккаунт для начала'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    placeholder="Ваше имя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-muted border-0"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-muted border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-muted border-0"
                />
              </div>
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full gradient-primary border-0 hover:opacity-90">
                {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </Button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login');
                    setError('');
                  }}
                  className="text-primary hover:underline"
                >
                  {authMode === 'login' 
                    ? 'Нет аккаунта? Зарегистрируйтесь' 
                    : 'Уже есть аккаунт? Войдите'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <Avatar className="cursor-pointer hover:scale-110 transition-transform" onClick={handleLogout} title="Выйти">
            <AvatarImage src="" />
            <AvatarFallback className="gradient-primary text-white font-semibold text-xl">
              {user.avatar}
            </AvatarFallback>
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
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setShowNewChatDialog(true)}>
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
          <ScrollArea className="flex-1 px-3">
            {chats.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Пока нет чатов</p>
                <p className="text-sm mt-2">Нажмите + чтобы начать общение!</p>
              </div>
            ) : (
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
                        <span className="text-xs text-muted-foreground">
                          {chat.last_message_time ? new Date(chat.last_message_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.last_message || 'Начните общение'}</p>
                    </div>
                    {chat.unread_count > 0 && (
                      <Badge className="gradient-primary border-0 h-6 min-w-6 flex items-center justify-center">
                        {chat.unread_count}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
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
                {messages.map(message => {
                  const isSent = message.sender_id === user?.id;
                  return (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 group ${isSent ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {!isSent && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                        {message.avatar}
                      </div>
                    )}
                    <div className="relative max-w-md">
                      <div
                        className={`px-4 py-3 rounded-2xl animate-scale-in ${
                          isSent
                            ? 'gradient-primary text-white rounded-br-md'
                            : 'glass rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            isSent ? 'text-white/70' : 'text-muted-foreground'
                          }`}
                        >
                          {new Date(message.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
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
                  );
                })}
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
              <h2 className="text-3xl font-bold gradient-text">Добро пожаловать, {user.username}!</h2>
              <p className="text-muted-foreground">
                Выберите чат слева или создайте новый
              </p>
            </div>
          </div>
        )}
      </div>
      
      <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
        <DialogContent className="sm:max-w-md glass">
          <DialogHeader>
            <DialogTitle className="gradient-text">Новый чат</DialogTitle>
            <DialogDescription>
              Найдите пользователя и начните общение
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени или email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-10 bg-muted border-0"
              />
            </div>
            <ScrollArea className="h-[300px] pr-4">
              {isSearching ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Поиск...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{userSearch ? 'Пользователи не найдены' : 'Введите имя для поиска'}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map(foundUser => (
                    <div
                      key={foundUser.id}
                      onClick={() => handleCreateChat(foundUser)}
                      className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted cursor-pointer transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                        {foundUser.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{foundUser.username}</h4>
                        <p className="text-sm text-muted-foreground truncate">{foundUser.email}</p>
                      </div>
                      <Icon name="MessageSquarePlus" size={20} className="text-primary" />
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}