'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { Button } from './ui/button';

const ContinueWithGoogleButton = () => {
  const router = useRouter();

  const auth = useAuth();

  return (
    <Button
      onClick={async () => {
        try {
          auth?.loginWithGoogle();
          router.push('/');
        } catch (e) {
          console.error(e);
        };
      }}
      variant='outline'
      className='w-full cursor-pointer'
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;