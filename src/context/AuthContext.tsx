
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData } from '@/types';
import Swal from 'sweetalert2';

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, [user, isAuthenticated]);

  // Mock login function (in a real app, this would call an API)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock verification - in a real app, you'd validate against an API
      if (email && password.length >= 6) {
        const mockUser: UserData = {
          id: 1,
          name: email.split('@')[0],
          email,
          isAuthenticated: true
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        
        return true;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid email or password',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock registration - in a real app, you'd register via an API
      if (name && email && password.length >= 6) {
        const mockUser: UserData = {
          id: Date.now(),
          name,
          email,
          isAuthenticated: true
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        
        Swal.fire({
          title: 'Success!',
          text: 'Your account has been created',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        
        return true;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Please provide all required information',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Swal.fire({
      title: 'Logged Out!',
      text: 'You have been successfully logged out',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
