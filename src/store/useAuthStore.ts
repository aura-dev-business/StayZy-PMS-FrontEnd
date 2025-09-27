// store/useAuthStore.ts
import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  fullName: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  fetchUser: async () => {
    const { user, loading } = get();

    // ✅ Skip fetching if user already exists or still loading from previous call
    if (user || loading) return;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    try {
      set({ loading: true, error: null });

      const res = await fetch('http://localhost:8081/api/auth/me', {
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401) {
          set({ user: null, error: 'Unauthorized' });
        } else {
          throw new Error('Failed to fetch user');
        }
        return;
      }

      const data: User = await res.json();
      set({ user: data });
    } catch (err) {
      console.error('Auth fetch error:', err);
      set({ user: null, error: 'Something went wrong' });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('http://localhost:8081/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      set({ user: null });
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  },

  setUser: (user) => set({ user }),
}));
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
