import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const INVITATIONS_URL = 'https://functions.poehali.dev/39372316-affa-49c6-8682-2d9a8d564b70';

interface Invitation {
  id: number;
  sender_id: number;
  receiver_phone: string;
  status: string;
  created_at: string;
  sender_name: string;
  sender_avatar: string | null;
  sender_phone: string;
}

export default function Invitations() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch(INVITATIONS_URL, {
        method: 'GET',
        headers: {
          'X-Auth-Token': authData.token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInvitations(data.invitations || []);
      }
    } catch (error) {
      console.error('Failed to load invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvitation = async (invitationId: number, action: 'accept' | 'reject') => {
    setProcessing(invitationId);
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch(INVITATIONS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authData.token
        },
        body: JSON.stringify({
          invitation_id: invitationId,
          action
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(action === 'accept' ? 'Приглашение принято!' : 'Приглашение отклонено');
        
        if (action === 'accept' && data.sender_id) {
          navigate('/chat', { state: { selectedUserId: data.sender_id } });
        } else {
          loadInvitations();
        }
      } else {
        toast.error(data.error || 'Ошибка обработки');
      }
    } catch (error) {
      toast.error('Ошибка сети');
    } finally {
      setProcessing(null);
    }
  };

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
            <h1 className="text-2xl font-bold">Приглашения</h1>
            <p className="text-sm text-muted-foreground">
              {invitations.length} {invitations.length === 1 ? 'приглашение' : 'приглашений'}
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
          </div>
        ) : invitations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="Mail" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Нет приглашений</p>
            <p className="text-xs text-muted-foreground mt-1">
              Когда вас пригласят, они появятся здесь
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={invitation.sender_avatar || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {invitation.sender_name?.[0]?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{invitation.sender_name}</p>
                    <p className="text-xs text-muted-foreground">{invitation.sender_phone}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Приглашает вас в контакты
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleInvitation(invitation.id, 'reject')}
                    disabled={processing === invitation.id}
                  >
                    {processing === invitation.id ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      'Отклонить'
                    )}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleInvitation(invitation.id, 'accept')}
                    disabled={processing === invitation.id}
                  >
                    {processing === invitation.id ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      'Принять'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
