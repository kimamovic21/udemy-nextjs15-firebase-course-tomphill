import { initializeApp, getApps } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import { type FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'udemy-fire-homes-project.firebaseapp.com',
  projectId: 'udemy-fire-homes-project',
  storageBucket: 'udemy-fire-homes-project.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const currentApps = getApps();

let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
};

export { auth, storage };