'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
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
    try {
      await auth?.loginWithEmail(data.email, data.password);

      toast.success('Success', {
        description: 'Successfully logged in',
      });

      router.refresh();
    } catch (e: any) {
      console.error(e);
      toast.error('Error', {
        description: e.code === 'auth/invalid-credentials'
          ? 'Invalid email or password'
          : 'An error occurred',
      });
    };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}
      >
        <fieldset
          className='flex flex-col gap-4'
          disabled={form.formState.isSubmitting}
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
        </fieldset>
      </form>

      <ContinueWithGoogleButton />
    </Form>
  );
};

export default LoginForm;