import { AuthUserDataDTO } from '@gdocs/shared/auth/register.js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (t: string | null) => void;
  userData: AuthUserDataDTO | null;
  setUserData: (d: AuthUserDataDTO | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (t) => set({ token: t }),
      userData: null,
      setUserData: (d) => set({ userData: d }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage), // specify sessionStorage
    },
  ),
);
