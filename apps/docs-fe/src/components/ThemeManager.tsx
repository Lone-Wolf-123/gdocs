import {useEffect} from 'react';
import {useAppDataStore} from '../store/useAppData';

export default function ThemeManager() {
  const theme = useAppDataStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      root.classList.toggle('dark', isDark);
      root.setAttribute('data-theme', theme);
    };

    apply();

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.onchange = apply;
      return () => {mq.onchange = null};
    }
    return;
  }, [theme]);

  return null;
}
