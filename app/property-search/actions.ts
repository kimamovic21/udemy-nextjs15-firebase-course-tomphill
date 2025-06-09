'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { auth, firestore } from '@/firebase/server';

export async function addFavorite(
  propertyId: string,
  authToken: string
) {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  };

  await firestore
    .collection('favorites')
    .doc(verifiedToken.uid)
    .set(
      {
        [propertyId]: true,
      },
      {
        merge: true,
      }
    );
};

export async function removeFavorite(
  propertyId: string,
  authToken: string
) {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  };

  await firestore
    .collection('favorites')
    .doc(verifiedToken.uid)
    .update({
      [propertyId]: FieldValue.delete(),
    })
};