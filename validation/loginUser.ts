import { z } from 'zod';
import { passwordValidation } from './passwordValidation';

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: passwordValidation,
});