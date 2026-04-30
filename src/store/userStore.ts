import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  phone: string;
  hasOnboarded: boolean;
  isHydrated: boolean;
  setUserData: (name: string, phone: string) => void;
  setOnboarded: (status: boolean) => void;
  setHydrated: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      phone: '',
      hasOnboarded: false,
      isHydrated: false,
      setUserData: (name, phone) => set({ name, phone }),
      setOnboarded: (status) => set({ hasOnboarded: status }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'lanchonete-user-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
