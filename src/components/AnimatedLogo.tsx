import { useEffect } from 'react';

export default function AnimatedLogo() {
  useEffect(() => {
    const playTypingSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const timings = [0, 200, 400, 600, 800, 1000];
        
        timings.forEach((delay) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
          }, delay);
        });
      } catch (err) {
        console.log('Audio playback not available');
      }
    };

    const timer = setTimeout(playTypingSound, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-24 h-24 mx-auto">
      <img 
        src="https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/c2098d59-62fb-4807-9781-76e9eff78292.jpg" 
        alt="Peeky Logo" 
        className="w-full h-full object-contain animate-[pulse_2s_ease-in-out_infinite]"
      />
    </div>
  );
}