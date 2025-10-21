'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('theme', theme);
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.className = systemTheme;
    } else {
      document.documentElement.className = theme;
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0 bg-black/20 hover:bg-black/30 border border-white/20"
      >
        <Sun className="w-4 h-4 text-white" />
      </Button>
    );
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Светлая' },
    { value: 'dark', icon: Moon, label: 'Тёмная' },
    { value: 'system', icon: Monitor, label: 'Система' },
  ] as const;

  const currentTheme = themes.find(t => t.value === theme);
  const nextTheme = themes[(themes.findIndex(t => t.value === theme) + 1) % themes.length];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(nextTheme.value as Theme)}
      className="w-9 h-9 p-0 bg-black/20 hover:bg-black/30 border border-white/20 transition-all duration-200 hover:scale-105"
      title={`Текущая тема: ${currentTheme?.label}. Нажмите для переключения на ${nextTheme.label}`}
    >
      <currentTheme?.icon className="w-4 h-4 text-white" />
    </Button>
  );
}

// Theme Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || 'dark';
    
    if (initialTheme === 'system') {
      document.documentElement.className = systemTheme;
    } else {
      document.documentElement.className = initialTheme;
    }
  }, []);

  if (!mounted) {
    return <div className="dark">{children}</div>;
  }

  return <>{children}</>;
}

// Theme Selector Dropdown
interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('theme', theme);
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.className = systemTheme;
    } else {
      document.documentElement.className = theme;
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Светлая', description: 'Светлая тема' },
    { value: 'dark', icon: Moon, label: 'Тёмная', description: 'Тёмная тема' },
    { value: 'system', icon: Monitor, label: 'Система', description: 'Следовать системным настройкам' },
  ] as const;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-sm font-medium text-white/80 mb-3">Тема</div>
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        return (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value as Theme)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
              'hover:bg-white/10 border border-transparent',
              theme === themeOption.value
                ? 'bg-white/10 border-white/20'
                : 'hover:border-white/10'
            )}
          >
            <Icon className="w-4 h-4 text-white/80" />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-white">{themeOption.label}</div>
              <div className="text-xs text-white/60">{themeOption.description}</div>
            </div>
            {theme === themeOption.value && (
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
