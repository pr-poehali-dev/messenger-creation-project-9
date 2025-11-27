import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function SwipeIndicator() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeenSwipeHint = localStorage.getItem('hasSeenSwipeHint');
    if (hasSeenSwipeHint) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      localStorage.setItem('hasSeenSwipeHint', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-fade-in md:hidden">
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
        <div className="relative flex items-center gap-3 px-6 py-4 bg-white dark:bg-[#252538] rounded-2xl shadow-2xl border border-purple-100 dark:border-purple-800/30">
          <div className="flex items-center gap-2">
            <div className="animate-bounce">
              <Icon name="ChevronLeft" size={20} className="text-primary" />
            </div>
            <Icon name="HandMetal" size={24} className="text-accent" />
            <div className="animate-bounce">
              <Icon name="ChevronRight" size={20} className="text-primary" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Свайпайте!</p>
            <p className="text-xs text-muted-foreground">Листайте товары жестами</p>
          </div>
          <button
            onClick={() => {
              setShow(false);
              localStorage.setItem('hasSeenSwipeHint', 'true');
            }}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a40]"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}