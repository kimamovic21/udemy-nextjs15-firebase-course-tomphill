'use client';

import { HeartIcon } from 'lucide-react';
import { addFavorite } from './actions';
import { useAuth } from '@/context/auth';

const ToggleFavoriteButton = ({
  propertyId,
  isFavorite
}: {
  propertyId: string;
  isFavorite: boolean;
}) => {
  const auth = useAuth();

  return (
    <button
      className='absolute top-0 right-0 z-10 p-2'
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) return;

        await addFavorite(propertyId, tokenResult?.token);
      }}
    >
      <HeartIcon fill={isFavorite ? 'red' : 'white'} />
    </button>
  );
};

export default ToggleFavoriteButton;