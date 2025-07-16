import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQt3eHsOghjQiCARL_RyKqVsoOq-ibzfI",
  authDomain: "takeandeat-6281a.firebaseapp.com",
  projectId: "takeandeat-6281a",
  storageBucket: "takeandeat-6281a.appspot.com",
  messagingSenderId: "431611847190",
  appId: "1:431611847190:web:81103301a07f1054b14b37",
  measurementId: "G-8MDN1T9E1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
import { enableIndexedDbPersistence } from 'firebase/firestore';

try {
  enableIndexedDbPersistence(db);
} catch (err) {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.warn('Firebase persistence failed: Multiple tabs open');
  } else if (err.code == 'unimplemented') {
    // The current browser doesn't support persistence
    console.warn('Firebase persistence not supported in this browser');
  }
}

export { auth, db };