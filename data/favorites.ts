import 'server-only';
import { cookies } from 'next/headers';
import { auth, firestore } from '@/firebase/server';

export async function getUserFavorites() {
  const cookieStore = await cookies();

  const token = cookieStore.get('firebaseAuthToken')?.value;
  if (!token) return;

  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) return {};
  
  const favoritesSnapshot = await firestore
    .collection('favorites')
    .doc(verifiedToken.uid)
    .get();

  const favoritesData = favoritesSnapshot.data();

  return favoritesData || {};
};