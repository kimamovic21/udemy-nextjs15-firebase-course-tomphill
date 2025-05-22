'use server';

import { cookies } from 'next/headers';
import { auth } from '@/firebase/server';

export const setToken = async ({
  token,
  refreshToken
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    const verifiedToken = auth.verifyIdToken(token);
    if (!verifiedToken) return;

    const userRecord = await auth.getUser((await verifiedToken).uid);
    if (
      process.env.ADMIN_EMAIL === userRecord?.email && 
      !userRecord?.customClaims?.admin) 
    {
      auth.setCustomUserClaims((await verifiedToken).uid, {
        admin: true,
      });
    };

    const cookieStore = await cookies();
    cookieStore.set('firebaseAuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
     cookieStore.set('firebaseAuthRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  } catch (e) {
    console.error(e);
  };
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('firebaseAuthToken');
  cookieStore.delete('firebaseAuthRefreshToken');
};