'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth';
import { loginUserSchema } from '@/validation/loginUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Link from 'next/link';
import ContinueWithGoogleButton from '@/components/continue-with-google-button';

const LoginForm = () => {
  const router = useRouter();

  const auth = useAuth();

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginUserSchema>) => {
    auth?.loginWithEmail(data.email, data.password);

    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Email'
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

        <Button
          type='submit'
          className='cursor-pointer'
        >
          Login
        </Button>

        <div>
          <span>Forgotten your password?</span>
          <Link
            href='/forgot-password'
            className='pl-2 underline'
          >
            Reset it here
          </Link>
        </div>

        <p className='text-center pb-5'>
          or
        </p>
      </form>

      <ContinueWithGoogleButton />
    </Form>
  );
};

export default LoginForm;