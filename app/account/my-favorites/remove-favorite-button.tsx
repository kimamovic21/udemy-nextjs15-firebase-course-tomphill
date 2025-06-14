'use client';

import { useRouter } from 'next/navigation';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { removeFavorite } from './actions';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

const RemoveFavoriteButton = ({ propertyId }: { propertyId: string }) => {
  const auth = useAuth();

  const router = useRouter();

  const handleDelete = async () => {
    const tokenResult = await auth?.currentUser?.getIdTokenResult();
    if (!tokenResult) return;

    await removeFavorite(propertyId, tokenResult.token);

    toast.success('Success', {
      description: 'Property removed from favorites'
    });

    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          className='cursor-pointer'
        >
          <Trash2Icon className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the property from your favorites.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className='cursor-pointer'
          >
            Delete property
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFavoriteButton;