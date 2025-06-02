'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 20 characters'),
  email: z
    .string()
    .email('Invalid email'),
  password: z.string().refine((value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value);
  }, {
    message: 'Password must contain at least 6 characters, at least one uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  }),
  passwordConfirm: z.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.passwordConfirm) {
    ctx.addIssue({
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
      code: 'custom',
    });
  };
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  return (
    <div>RegisterForm</div>
  );
};

export default RegisterForm;