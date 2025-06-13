'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from 'firebase/auth';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { passwordValidation } from '@/validation/passwordValidation';
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

const formSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    newPasswordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        message: 'Passwords do not match',
        path: ['newPasswordConfirm'],
        code: 'custom',
      });
    };
  });

const UpdatePasswordForm = () => {
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const user = auth?.currentUser;

    if (!user?.email) return;

    try {
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, data.currentPassword)
      );

      await updatePassword(user, data.newPassword);

      toast.success('Success', {
        description: 'Password updated successfully',
      });

      form.reset();
    } catch (e: any) {
      console.error(e);
      toast.error('Error', {
        description:
          e.code === 'auth/invalid-credentials'
            ? 'Your current password is incorrect'
            : 'An error occurred',
      });
    };
  };

  return (
    <div className='pt-5 mt-5 border-t'>
      <h3 className='text-2xl font-bold pb-2'>
        Update Password
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            className='flex flex-col gap-4'
            disabled={form.formState.isSubmitting}
          >
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Current Password'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='New Password'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPasswordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New Password Confirm
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='New Password Confirm'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='cursor-pointer'
            >
              Update Password
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasswordForm;