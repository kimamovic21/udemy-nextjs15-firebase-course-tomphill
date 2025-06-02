'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ContinueWithGoogleButton from '@/components/continue-with-google-button';

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

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Your username
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder='Your username'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Your username
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder='Your email'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder='Password'
                    type='password'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Confirm password
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder='Confirm password'
                    type='password'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type='submit'>
          Register
        </Button>

        <p className='text-center'>or</p>
      </form>

      <ContinueWithGoogleButton />
    </Form>
  );
};

export default RegisterForm;