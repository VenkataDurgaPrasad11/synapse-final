// This is a MOCK Firebase implementation.
// In a real application, you would use the official Firebase SDK.
// This file allows the frontend to be developed without a real Firebase project.

import { User } from '../types';
import { MOCK_USERS_DB } from '../constants';

const FAKE_LATENCY = 800; // ms

// --- Mock Authentication ---

let currentUser: User | null = null;
let authStateListener: ((user: User | null) => void) | null = null;

const auth = {
  // Signs in a user and sets the current user in our mock session
  signInWithEmailAndPassword: (email: string, password?: string): Promise<{ user: User }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = Object.values(MOCK_USERS_DB).find(u => u.email === email);
        if (user && (password === 'password123' || password === undefined)) { // Simple mock password check
          currentUser = user;
          if (authStateListener) authStateListener(currentUser);
          resolve({ user });
        } else {
          reject(new Error("Invalid credentials or user not found."));
        }
      }, FAKE_LATENCY);
    });
  },

  // Signs out the user
  signOut: (): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        currentUser = null;
        if (authStateListener) authStateListener(null);
        resolve();
      }, FAKE_LATENCY / 2);
    });
  },
  
  // Creates a new user (mock)
  createUserWithEmailAndPassword: (email: string, password?: string): Promise<{ user: User }> => {
       return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(MOCK_USERS_DB[email]) {
                    reject(new Error("Email already in use."));
                    return;
                }
                const newId = `newUser${Date.now()}`;
                const newUser: User = {
                    id: newId,
                    name: "New User",
                    email: email,
                    role: 'Student',
                    avatarUrl: `https://i.pravatar.cc/100?u=${newId}`,
                    enrolledCourseIds: [],
                    interests: []
                };
                MOCK_USERS_DB[newId] = newUser;
                currentUser = newUser;
                if(authStateListener) authStateListener(currentUser);
                resolve({ user: newUser });
            }, FAKE_LATENCY);
       });
  },


  // Listens for auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
    authStateListener = callback;
    // Immediately call with current state to mimic Firebase behavior
    setTimeout(() => callback(currentUser), 100); 
    // Return an unsubscribe function
    return () => {
      authStateListener = null;
    };
  }
};


// --- Mock Firestore ---

const firestore = {
    // In a real app, this would get a document from a collection
    collection: (collectionName: string) => ({
        doc: (docId: string) => ({
            get: (): Promise<{ exists: boolean; data: () => User | undefined }> => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (collectionName === 'users') {
                            const user = MOCK_USERS_DB[docId];
                            if(user){
                                resolve({ exists: true, data: () => user });
                            } else {
                                resolve({ exists: false, data: () => undefined });
                            }
                        }
                    }, FAKE_LATENCY / 2);
                });
            }
        })
    })
}

// Export the mock services
export { auth, firestore };