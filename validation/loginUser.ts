import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().refine((value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value);
  }, {
    message: 'Password must contain at least 6 characters, at least one uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  }),
});