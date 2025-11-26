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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.classList.add('animate-theme-switch');
    
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      
      setTimeout(() => {
        document.documentElement.classList.remove('animate-theme-switch');
      }, 400);
    }, 50);
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