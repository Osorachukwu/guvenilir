import { useAuthStore } from '../store/authStore';
import authService from '../services/authService';

/**
 * useAuth Hook
 * Provides auth methods and state management
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setLogin,
    setLogout,
    setLoading,
    setError,
    clearError,
    updateProfile,
  } = useAuthStore();

  // Register
  const register = async (fullname, username, email, password, repeatPassword) => {
    try {
      setLoading(true);
      clearError();
      const response = await authService.register({
        fullname,
        username,
        email,
        password,
        repeatPassword,
      });
      setLogin(response.user, response.token);
      return response;
    } catch (err) {
      const errorMsg = err.message || 'Registration failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      clearError();
      const response = await authService.login({ email, password });
      setLogin(response.user, response.token);
      return response;
    } catch (err) {
      const errorMsg = err.message || 'Login failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setLogout();
    } catch (err) {
      console.error('Logout error:', err);
      setLogout(); // Still logout locally even if request fails
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      clearError();
      const response = await authService.updateProfile(userData);
      updateProfile(response.user);
      return response;
    } catch (err) {
      const errorMsg = err.message || 'Profile update failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      clearError();
      const response = await authService.forgotPassword(email);
      return response;
    } catch (err) {
      const errorMsg = err.message || 'Password reset request failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      clearError();
      const response = await authService.resetPassword(token, password);
      return response;
    } catch (err) {
      const errorMsg = err.message || 'Password reset failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Methods
    register,
    login,
    logout,
    updateProfile: updateUserProfile,
    forgotPassword,
    resetPassword,
    clearError,
  };
};
