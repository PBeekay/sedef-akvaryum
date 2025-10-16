import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  UserCredential 
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Admin ve Moderator email listesi
const ADMIN_EMAILS = [
  'admin@sedefakvaryum.com',
  // Environment variable'dan da alabilir
  process.env.REACT_APP_ADMIN_EMAIL
].filter(Boolean);

const MODERATOR_EMAILS = [
  'moderator@sedefakvaryum.com',
  // Environment variable'dan da alabilir
  process.env.REACT_APP_MODERATOR_EMAIL
].filter(Boolean);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async (): Promise<void> => {
    return await signOut(auth);
  };

  const isAdmin = currentUser ? ADMIN_EMAILS.includes(currentUser.email || '') : false;
  const isModerator = currentUser ? MODERATOR_EMAILS.includes(currentUser.email || '') : false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    loading,
    isAdmin,
    isModerator
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
