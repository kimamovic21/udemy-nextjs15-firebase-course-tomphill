'use server';

import { auth } from '@/firebase/server';
import { registerUserSchema } from '@/validation/registerUser';

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  const validation = registerUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation?.error?.issues[0]?.message ?? 'An error occurred',
    };
  };

  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
  } catch (e: any) {
    console.error(e);
    return {
      error: true,
      message: e.message ?? 'Could not register user',
    };
  };
};