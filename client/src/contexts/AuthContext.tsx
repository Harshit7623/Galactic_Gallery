import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    console.log('Login triggered:', email);
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0],
      email,
      photoUrl: undefined,
    };
    setUser(mockUser);
    localStorage.setItem('authToken', 'mock-jwt-token');
  };

  const register = async (email: string, username: string, password: string) => {
    console.log('Register triggered:', { email, username });
    const mockUser: User = {
      id: '1',
      username,
      email,
      photoUrl: undefined,
    };
    setUser(mockUser);
    localStorage.setItem('authToken', 'mock-jwt-token');
  };

  const googleLogin = async () => {
    console.log('Google login triggered');
    const mockUser: User = {
      id: '1',
      username: 'googleuser',
      email: 'user@gmail.com',
      photoUrl: undefined,
    };
    setUser(mockUser);
    localStorage.setItem('authToken', 'mock-jwt-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    console.log('Logout triggered');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      googleLogin,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
