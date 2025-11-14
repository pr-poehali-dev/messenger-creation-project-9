import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import ProfilePanel from '@/components/chat/ProfilePanel';
import type { Chat } from '@/types/chat';

const CONTACTS_URL = 'https://functions.poehali.dev/dc4f8ac2-d067-46b8-80c9-abff712dc2a7';

export default function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Chat[]>([]);
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch(CONTACTS_URL, {
        method: 'GET',
        headers: {
          'X-Auth-Token': authData.token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectContact = (contact: Chat) => {
    navigate('/chat', { state: { selectedUserId: contact.id } });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.username?.toLowerCase().includes(search.toLowerCase()) ||
    contact.phone?.includes(search)
  );

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/chat')}
            className="shrink-0"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Контакты</h1>
            <p className="text-sm text-muted-foreground">
              {filteredContacts.length} {filteredContacts.length === 1 ? 'контакт' : 'контактов'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowProfile(true)}
          className="shrink-0"
        >
          <Icon name="User" size={20} />
        </Button>
      </header>

      <div className="p-4 border-b">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени или телефону..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="UserPlus" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Нет контактов</p>
            <p className="text-xs text-muted-foreground mt-1">
              Добавьте номера телефонов друзей в свою телефонную книгу
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted/70"
                onClick={() => handleSelectContact(contact)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={contact.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {contact.username?.[0]?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{contact.username}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.phone}
                    </p>
                    {contact.bio && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {contact.bio}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.status === 'online' && (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                    <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {showProfile && (
        <div className="fixed inset-0 z-50 bg-background">
          <ProfilePanel onClose={() => setShowProfile(false)} />
        </div>
      )}
    </div>
  );
}
