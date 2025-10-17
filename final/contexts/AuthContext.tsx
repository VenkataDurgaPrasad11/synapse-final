import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, firestore } from '../lib/firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>; // Expose setter
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: any) => {
      if (firebaseUser) {
        // In a real app, you'd fetch the user profile from Firestore
        const userDoc = await firestore.collection('users').doc(firebaseUser.id).get();
        if(userDoc.exists){
            const userData = userDoc.data() as User;
             // Ensure progress property exists
            if (!userData.progress) {
                userData.progress = {};
            }
            setCurrentUser(userData);
        } else {
            // This case might happen if user exists in auth but not firestore, handle as needed
            const newUser = firebaseUser as User;
            if(!newUser.progress) newUser.progress = {};
            setCurrentUser(newUser);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const logout = () => {
    return auth.signOut();
  };

  const value = {
    currentUser,
    setCurrentUser, // Provide setter in context value
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};