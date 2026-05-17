'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeCtxValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Read saved preference or fall back to system preference
    const saved = localStorage.getItem('bbg-theme') as Theme | null;
    const sys   = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const init  = saved ?? sys;
    apply(init);
    setTheme(init);
  }, []);

  function apply(t: Theme) {
    document.documentElement.classList.toggle('dark', t === 'dark');
  }

  function toggle() {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      apply(next);
      localStorage.setItem('bbg-theme', next);
      return next;
    });
  }

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);