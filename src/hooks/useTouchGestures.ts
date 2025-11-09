import { useEffect, RefObject } from 'react';

type UseTouchGesturesProps = {
  touchStartX: RefObject<number>;
  touchCurrentX: RefObject<number>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

export function useTouchGestures({
  touchStartX,
  touchCurrentX,
  isSidebarOpen,
  setIsSidebarOpen,
}: UseTouchGesturesProps) {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchCurrentX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchCurrentX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchCurrentX.current - touchStartX.current;
      
      if (touchStartX.current < 50 && diff > 80) {
        setIsSidebarOpen(true);
      }
      
      if (isSidebarOpen && diff < -80) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSidebarOpen, setIsSidebarOpen, touchStartX, touchCurrentX]);
}
