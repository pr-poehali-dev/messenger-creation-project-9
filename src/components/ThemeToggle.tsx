import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '99999';
    overlay.style.overflow = 'hidden';
    
    const circle = document.createElement('div');
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    
    circle.style.position = 'absolute';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = '0';
    circle.style.height = '0';
    circle.style.borderRadius = '50%';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1), height 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    if (newTheme === 'dark') {
      circle.style.background = 'radial-gradient(circle, #1a1a2e 0%, #252538 50%, #2a2a40 100%)';
    } else {
      circle.style.background = 'radial-gradient(circle, #faf5ff 0%, #fce7f3 50%, #eff6ff 100%)';
    }
    
    overlay.appendChild(circle);
    document.body.appendChild(overlay);
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.background = newTheme === 'dark' ? '#9333ea' : '#f59e0b';
      particle.style.opacity = '1';
      particle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      overlay.appendChild(particle);
      
      requestAnimationFrame(() => {
        const angle = (i / 20) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.transform = `translate(${tx}px, ${ty}px)`;
        particle.style.opacity = '0';
      });
    }
    
    requestAnimationFrame(() => {
      circle.style.width = `${maxRadius * 2}px`;
      circle.style.height = `${maxRadius * 2}px`;
    });
    
    setTimeout(() => {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }, 100);
    
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 800);
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-purple-900/20 overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative w-6 h-6">
        <Icon
          name="Sun"
          size={24}
          className={`absolute inset-0 text-amber-500 transition-all duration-500 ease-out ${
            theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
          }`}
        />
        <Icon
          name="Moon"
          size={24}
          className={`absolute inset-0 text-purple-400 transition-all duration-500 ease-out ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'
          }`}
        />
      </div>
    </button>
  );
}