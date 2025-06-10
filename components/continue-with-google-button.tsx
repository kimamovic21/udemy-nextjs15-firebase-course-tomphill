'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { Button } from './ui/button';

const ContinueWithGoogleButton = () => {
  const router = useRouter();

  const auth = useAuth();

  return (
    <Button
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();

          toast.success('Success', {
            description: 'Successfully logged in',
          });

          router.refresh();
        } catch (e) {
          console.error(e);

          toast.error('Error', {
            description: 'Something went wrong'
          });
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