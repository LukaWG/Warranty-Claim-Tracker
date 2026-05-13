import React, { createContext, useState, useContext, useEffect } from 'react';
import { userData } from '../../data/data.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState({ id: 'warranty-claim-tracker', public_settings: {} });

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      // Simulate loading app settings
      setAppPublicSettings({ id: 'warranty-claim-tracker', public_settings: {} });
      setIsLoadingPublicSettings(false);

      // For development, auto-login as the first user
      // In production, you might want to implement proper authentication
      const defaultUser = userData[0][0]; // First user in the array
      setUser(defaultUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);

    } catch (error) {
      console.error('App state check failed:', error);
      setAuthError({
        type: 'unknown',
        message: error.message || 'Failed to load app'
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };

  const loginAsUser = (userId) => {
    const selectedUser = userData[0].find(u => u.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError({
        type: 'user_not_found',
        message: 'User not found'
      });
    }
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);

    if (shouldRedirect) {
      // In a real app, you might redirect to a login page
      window.location.href = '/';
    }
  };

  const navigateToLogin = () => {
    // In a real app, you might redirect to a login page
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      navigateToLogin,
      checkAppState,
      loginAsUser,
      availableUsers: userData[0] // Make all users available for selection
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
