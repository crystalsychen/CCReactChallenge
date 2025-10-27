import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, get, set} from 'firebase/database';
import { flushSync } from 'react-dom'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYPqr5uSOsvepRgI4OO17KoiVTxDE4EuU",
  authDomain: "ccreactchallenge.firebaseapp.com",
  databaseURL: "https://ccreactchallenge-default-rtdb.firebaseio.com",
  projectId: "ccreactchallenge",
  storageBucket: "ccreactchallenge.firebasestorage.app",
  messagingSenderId: "228591162243",
  appId: "1:228591162243:web:6a2976635e50b517c29cb6",
  measurementId: "G-Z5C6EHJ6HK"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase); 

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(auth);

export { firebaseSignOut as signOut };

export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}

export const addAuthStateListener = (fn: NextOrObserver<User>): (()=> void) => (
  onAuthStateChanged(auth, fn)
);

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const isAuthenticated = !!user;

  useEffect(() => addAuthStateListener((user) => {
      flushSync(() => {
        setUser(user);
        setIsInitialLoading(false);
      })
    }), [])

  return {user, isAuthenticated, isInitialLoading };
};

export const initializeAdminUsers = async () => {
  const db = getDatabase();
  const adminRef = ref(db, 'admins');
  
  const snapshot = await get(adminRef);
  if (!snapshot.exists()) {
    const initialAdmins = {
      "h0J9tvP97VOVwsabuVPggNkiwvC3": true,
    };
    
    await set(adminRef, initialAdmins);
    console.log('Admin users initialized');
  }
};

// Hook to check if current user is admin
export const useIsAdmin = () => {
  const { user } = useAuthState();
  const [adminData] = useDataQuery(user ? `admins/${user.uid}` : 'guest');
  
  if (!user) return false;
  
  return adminData === true;
};