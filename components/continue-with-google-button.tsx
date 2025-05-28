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
        auth?.loginWithGoogle();
        router.refresh();
      }}
      variant='default'
      className='w-full'
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;