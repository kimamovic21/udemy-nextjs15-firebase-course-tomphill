'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registerUserSchema } from '@/validation/registerUser';
import { registerUser } from './actions';
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

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    const response = await registerUser(data);

    if (!!response?.error) {
      toast.error('Error!', {
        description: response?.message,
      });
      return;
    };

    toast.success('Success!', {
      description: 'Your account was created successfully',
    });

    router.push('/login');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className='flex flex-col gap-4'
          disabled={form.formState.isSubmitting}
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
                    Your email
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

          <Button 
            type='submit'
            className='cursor-pointer'  
          >
            Register
          </Button>

          <p className='text-center'>or</p>
        </fieldset>
      </form>

      <ContinueWithGoogleButton />
    </Form>
  );
};

export default RegisterForm;