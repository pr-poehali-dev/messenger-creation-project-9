import { useEffect, useRef } from 'react';

export function useNotifications() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,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');
    audioRef.current.volume = 0.5;
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const showNotification = (title: string, body: string, icon?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || '/favicon.svg',
        badge: '/favicon.svg',
      });
    }
    playNotificationSound();
  };

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  return {
    showNotification,
    requestPermission,
    hasPermission: typeof Notification !== 'undefined' && Notification.permission === 'granted',
  };
}
