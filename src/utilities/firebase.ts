import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from 'firebase/database';

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