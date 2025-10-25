import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          zipCode: foundUser.zipCode,
          preferences: foundUser.preferences || {},
          provider: foundUser.provider || 'email'
        };
        setUser(userData);
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const loginWithProvider = async (provider, userData) => {
    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      let existingUser = users.find(u => u.email === userData.email);

      if (!existingUser) {
        // Create new user from OAuth data
        const newUser = {
          id: Date.now().toString(),
          email: userData.email,
          password: '', // No password for OAuth users
          name: userData.name,
          zipCode: userData.zipCode || '10001',
          preferences: {},
          provider: provider,
          createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        existingUser = newUser;
      }

      // Auto-login
      const loginUserData = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        zipCode: existingUser.zipCode,
        preferences: existingUser.preferences || {},
        provider: existingUser.provider
      };

      setUser(loginUserData);
      return { success: true, user: loginUserData };
    } catch (error) {
      console.error('OAuth login error:', error);
      return { success: false, error: `${provider} login failed. Please try again.` };
    }
  };

  const register = async (userData) => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password,
        name: userData.name,
        zipCode: userData.zipCode,
        preferences: {},
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto-login after registration
      const loginResult = await login(userData.email, userData.password);
      return loginResult;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserPreferences = (preferences) => {
    if (user) {
      const updatedUser = { ...user, preferences: { ...user.preferences, ...preferences } };
      setUser(updatedUser);
      
      // Update in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].preferences = updatedUser.preferences;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithProvider,
    register,
    logout,
    updateUserPreferences
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
