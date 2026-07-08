import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authenticateUser, User, getUserInvestments, Investment } from '../data/users';

interface AuthContextType {
  user: (User & { investments: Investment[] }) | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<(User & { investments: Investment[] }) | null>(null);

  useEffect(() => {
    // LocalStorage'dan kullanıcıyı yükle
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const investments = getUserInvestments(userData.id);
      setUser({ ...userData, investments });
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      const investments = getUserInvestments(authenticatedUser.id);
      const userWithInvestments = { ...authenticatedUser, investments };
      setUser(userWithInvestments);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
