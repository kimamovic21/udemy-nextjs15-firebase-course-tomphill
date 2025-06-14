'use server';

import { cookies } from 'next/headers';
import { auth, firestore } from '@/firebase/server';

export async function deleteUserFavorites() {
  const cookieStore = await cookies();

  const token = cookieStore.get('firebaseAuthToken')?.value;

  if (!token) return;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    await firestore
      .collection('favorites')
      .doc(decodedToken.uid)
      .delete();
  } catch (e) {
    console.error(e);
  };
};