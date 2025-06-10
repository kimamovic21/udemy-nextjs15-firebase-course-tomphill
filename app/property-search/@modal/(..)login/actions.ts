'use server';

import { revalidatePath } from 'next/cache';

export async function loginSuccess() {
  revalidatePath('/property-search');
};