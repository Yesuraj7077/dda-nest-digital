'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as cookie from 'cookie';
import api from 'src/utils/api';

type User = {
  email: string;
  name?: string;
  user_id: string;
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getToken(): string | null {

  if (typeof document === 'undefined') return null;
  const rawCookies = document.cookie;
  const cookies = cookie.parse(rawCookies);
  localStorage.setItem('access_token', cookies.access_token);
  return cookies.access_token ?? null;
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );

    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = parseJwt(token);
      const userId = decoded?.sub || decoded?.userId;
      console.log(token)
      if (!userId) throw new Error('Invalid token payload');

      const res = await api.get(
        `http://localhost:5000/api/getAuth0UserDetails/${userId}`,
      
      );

      const userData = res.data;
       
      setUser({
        email: userData?.email,
        name: userData?.name,
        user_id: userData?.user_id,
        roles: userData?.app_metadata?.roles?.flatMap((role: string) =>
    role.split(',').map(r => r.trim())
  ) || [],
      });

    } catch (err) {
      console.error('Error loading user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = `${process.env.APPLICATION_URL}/api/auth/login`;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    window.location.href = `${process.env.APPLICATION_URL}/api/auth/logout`;
  };

  useEffect(() => {
    loadUser();
  }, []);
 

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.roles.includes('admin') ?? false,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
