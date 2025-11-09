import { useEffect, useRef } from 'react';

interface RealtimeOptions {
  onUpdate: () => void;
  enabled: boolean;
  interval?: number;
}

export function useRealtime({ onUpdate, enabled, interval = 3000 }: RealtimeOptions) {
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      onUpdate();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, interval, onUpdate]);

  return null;
}
