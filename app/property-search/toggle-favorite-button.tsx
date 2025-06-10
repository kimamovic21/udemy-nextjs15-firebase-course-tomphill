'use client';

import { useRouter } from 'next/navigation';
import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { addFavorite, removeFavorite } from './actions';
import { useAuth } from '@/context/auth';

const ToggleFavoriteButton = ({
  propertyId,
  isFavorite
}: {
  propertyId: string;
  isFavorite: boolean;
}) => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <button
      className='absolute top-0 right-0 z-10 p-2 bg-white rounded-bl-lg cursor-pointer'
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          router.push('/login');
          return;
        };

        try {
          if (isFavorite) {
            await removeFavorite(propertyId, tokenResult.token);
            toast.success('Success!', {
              description: 'Property removed from favorites',
            });
          } else {
            await addFavorite(propertyId, tokenResult.token);
            toast.success('Success!', {
              description: 'Property added to favorites',
            });
          };

          router.refresh();
        } catch (error) {
          toast.error('Error!', {
            description: 'There was an error',
          });
          console.error(error);
        };
      }}
    >
      <HeartIcon
        fill={isFavorite ? 'red' : 'white'}
        className='text-black'
      />
    </button>
  );
};

export default ToggleFavoriteButton;