import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ThemeOptions = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

export type Theme = (typeof ThemeOptions)[keyof typeof ThemeOptions];

interface AppDataState {
  theme: Theme;
  userPreference: string;

  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  setUserPreference: (pref: string) => void;
}

export const useAppDataStore = create<AppDataState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      userPreference: 'compact',

      setTheme: (t) => set({ theme: t }),
      toggleTheme: () => {
        const current = get().theme;
        const next: Theme = current === 'light' ? 'dark' : 'light';
        set({ theme: next });
      },

      setUserPreference: (pref) => set({ userPreference: pref }),
    }),
    { name: 'app-data-storage' },
  ),
);
