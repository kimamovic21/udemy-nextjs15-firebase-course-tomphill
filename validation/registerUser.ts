import { z } from 'zod';
import { passwordValidation } from './passwordValidation';

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(20, 'Name must be at most 20 characters'),
    email: z.string().email('Invalid email'),
    password: passwordValidation,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
        code: 'custom',
      });
    };
  });