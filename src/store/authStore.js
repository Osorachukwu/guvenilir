import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      autoLogoutTimer: null,

      // Set login state
      setLogin: (userData, token) => {
        set({
          user: userData,
          token,
          isAuthenticated: true,
          error: null,
        });
        get().startAutoLogout();
      },

      // Set logout state
      setLogout: () => {
        const { autoLogoutTimer } = get();
        if (autoLogoutTimer) clearTimeout(autoLogoutTimer);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          autoLogoutTimer: null,
        });
      },

      // Update user profile
      updateProfile: (userData) => {
        set({ user: userData });
      },

      // Set loading state
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // Set error
      setError: (error) => {
        set({ error });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Start auto logout after 1 hour (3600000ms)
      startAutoLogout: () => {
        const { autoLogoutTimer } = get();
        if (autoLogoutTimer) clearTimeout(autoLogoutTimer);

        const timer = setTimeout(() => {
          console.log('Session expired. Logging out...');
          get().setLogout();
        }, 3600000); // 1 hour

        set({ autoLogoutTimer: timer });
      },

      // Reset auto logout timer (refresh session)
      refreshSession: () => {
        if (get().isAuthenticated) {
          get().startAutoLogout();
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
