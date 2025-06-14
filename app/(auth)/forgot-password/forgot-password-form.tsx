'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '@/firebase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);

      toast.success('Success', {
        description: 'Password reset email sent',
      });
    } catch (e) {
      console.error(e);

      toast.error('Error', {
        description: 'Failed to send password reset email',
      });
    };
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleForgotPassword}
    >
      <Input
        name='email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        className='w-full cursor-pointer'
        type='submit'
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;